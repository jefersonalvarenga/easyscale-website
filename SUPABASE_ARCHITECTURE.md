# Arquitetura Supabase - Sistema de Chat EasyScale

## 📋 Índice
1. [Schema do Banco de Dados](#schema-do-banco-de-dados)
2. [Views e Functions](#views-e-functions)
3. [Configuração Real-time](#configuração-real-time)
4. [Integração com Next.js](#integração-com-nextjs)
5. [Políticas de Segurança (RLS)](#políticas-de-segurança-rls)

---

## 1. Schema do Banco de Dados

### Tabela: `clinics`
Armazena informações das clínicas (multi-tenancy)

```sql
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  phone TEXT,
  email TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para busca por slug
CREATE INDEX idx_clinics_slug ON clinics(slug);
```

### Tabela: `contacts`
Armazena informações dos pacientes/leads

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,

  -- Dados pessoais
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- Informações de lead
  lead_status TEXT DEFAULT 'new', -- new, hot, warm, cold, converted
  origin TEXT, -- instagram, facebook, google, referral, etc
  interest TEXT, -- procedimento de interesse

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint para garantir telefone único por clínica
  UNIQUE(clinic_id, phone)
);

-- Indexes
CREATE INDEX idx_contacts_clinic ON contacts(clinic_id);
CREATE INDEX idx_contacts_phone ON contacts(clinic_id, phone);
CREATE INDEX idx_contacts_lead_status ON contacts(clinic_id, lead_status);
```

### Tabela: `conversations`
Armazena as conversas (threads) com os contatos

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  -- Status da conversa
  status TEXT DEFAULT 'bot', -- bot, agent, resolved
  assigned_to UUID, -- ID do usuário que assumiu

  -- Contadores
  unread_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,

  -- Timestamps
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  first_message_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(clinic_id, contact_id)
);

-- Indexes
CREATE INDEX idx_conversations_clinic ON conversations(clinic_id);
CREATE INDEX idx_conversations_status ON conversations(clinic_id, status);
CREATE INDEX idx_conversations_last_message ON conversations(clinic_id, last_message_at DESC);
CREATE INDEX idx_conversations_contact ON conversations(contact_id);
```

### Tabela: `messages`
Armazena todas as mensagens trocadas

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,

  -- Quem enviou
  sender TEXT NOT NULL, -- client, bot, agent
  sender_id UUID, -- NULL para cliente, user_id para agent

  -- Conteúdo
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text', -- text, image, audio, document
  media_url TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb, -- intent, confidence, etc

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Se foi lida
  read_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

---

## 2. Views e Functions

### View: `conversations_with_details`
View otimizada que retorna conversas com todos os detalhes necessários

```sql
CREATE OR REPLACE VIEW conversations_with_details AS
SELECT
  c.id,
  c.clinic_id,
  c.status,
  c.unread_count,
  c.message_count,
  c.last_message_at,
  c.first_message_at,
  c.updated_at,

  -- Dados do contato
  con.id as contact_id,
  con.name as contact_name,
  con.phone as contact_phone,
  con.email as contact_email,
  con.lead_status,
  con.origin,
  con.interest,

  -- Última mensagem
  lm.content as last_message,
  lm.sender as last_message_sender,
  lm.created_at as last_message_time

FROM conversations c
INNER JOIN contacts con ON c.contact_id = con.id
LEFT JOIN LATERAL (
  SELECT content, sender, created_at
  FROM messages
  WHERE conversation_id = c.id
  ORDER BY created_at DESC
  LIMIT 1
) lm ON true;

-- Index na view materializada (opcional para performance)
-- CREATE MATERIALIZED VIEW conversations_with_details_mat AS ...
-- CREATE INDEX ON conversations_with_details_mat(clinic_id, last_message_at DESC);
```

### Function: `increment_unread_count`
Incrementa contador de mensagens não lidas

```sql
CREATE OR REPLACE FUNCTION increment_unread_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Incrementa apenas se for mensagem do cliente
  IF NEW.sender = 'client' THEN
    UPDATE conversations
    SET
      unread_count = unread_count + 1,
      message_count = message_count + 1,
      last_message_at = NEW.created_at,
      updated_at = NOW()
    WHERE id = NEW.conversation_id;
  ELSE
    UPDATE conversations
    SET
      message_count = message_count + 1,
      last_message_at = NEW.created_at,
      updated_at = NOW()
    WHERE id = NEW.conversation_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER on_message_insert
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION increment_unread_count();
```

### Function: `mark_conversation_as_read`
Marca conversa como lida

```sql
CREATE OR REPLACE FUNCTION mark_conversation_as_read(
  conversation_uuid UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE conversations
  SET unread_count = 0
  WHERE id = conversation_uuid;

  UPDATE messages
  SET read_at = NOW()
  WHERE conversation_id = conversation_uuid
    AND read_at IS NULL;
END;
$$ LANGUAGE plpgsql;
```

### Function: `takeover_conversation`
Assume uma conversa (de bot para agent)

```sql
CREATE OR REPLACE FUNCTION takeover_conversation(
  conversation_uuid UUID,
  user_uuid UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE conversations
  SET
    status = 'agent',
    assigned_to = user_uuid,
    updated_at = NOW()
  WHERE id = conversation_uuid;

  -- Insere mensagem de sistema
  INSERT INTO messages (conversation_id, sender, content, metadata)
  VALUES (
    conversation_uuid,
    'agent',
    '👤 Agente assumiu o atendimento',
    jsonb_build_object('system', true, 'user_id', user_uuid)
  );
END;
$$ LANGUAGE plpgsql;
```

### Function: `resolve_conversation`
Resolve/finaliza uma conversa

```sql
CREATE OR REPLACE FUNCTION resolve_conversation(
  conversation_uuid UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE conversations
  SET
    status = 'resolved',
    resolved_at = NOW(),
    unread_count = 0,
    updated_at = NOW()
  WHERE id = conversation_uuid;
END;
$$ LANGUAGE plpgsql;
```

---

## 3. Configuração Real-time

### Habilitar Real-time nas Tabelas

```sql
-- Habilitar real-time para mensagens
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Habilitar real-time para conversas
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- Habilitar real-time para contatos (opcional)
ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
```

### Configuração de Broadcasts (Opcional)
Para eventos customizados sem persistência no banco:

```sql
-- Criar canal de broadcast para eventos em tempo real
-- Isso é feito via Supabase Dashboard > Database > Realtime
-- Habilite "Presence" e "Broadcast" para os canais desejados
```

---

## 4. Integração com Next.js

### 4.1. Instalação

```bash
npm install @supabase/supabase-js
```

### 4.2. Cliente Supabase

Criar arquivo: `/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10, // Rate limiting
    },
  },
});

// Tipos
export interface Message {
  id: string;
  conversation_id: string;
  sender: 'client' | 'bot' | 'agent';
  sender_id?: string;
  content: string;
  content_type: string;
  media_url?: string;
  metadata: any;
  created_at: string;
  read_at?: string;
}

export interface Conversation {
  id: string;
  clinic_id: string;
  contact_id: string;
  status: 'bot' | 'agent' | 'resolved';
  assigned_to?: string;
  unread_count: number;
  message_count: number;
  last_message_at: string;
  first_message_at: string;
  created_at: string;
}

export interface ConversationWithDetails extends Conversation {
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
  lead_status: string;
  origin: string;
  interest: string;
  last_message: string;
  last_message_sender: string;
  last_message_time: string;
}
```

### 4.3. Hook para Real-time

Criar arquivo: `/hooks/useConversations.ts`

```typescript
import { useEffect, useState } from 'react';
import { supabase, ConversationWithDetails } from '@/lib/supabase';

export function useConversations(clinicId: string) {
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inicial
    async function fetchConversations() {
      const { data, error } = await supabase
        .from('conversations_with_details')
        .select('*')
        .eq('clinic_id', clinicId)
        .order('last_message_at', { ascending: false });

      if (!error && data) {
        setConversations(data);
      }
      setLoading(false);
    }

    fetchConversations();

    // Subscribe para atualizações em tempo real
    const channel = supabase
      .channel(`conversations:${clinicId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `clinic_id=eq.${clinicId}`,
        },
        async (payload) => {
          console.log('Conversation changed:', payload);

          // Refetch para pegar dados completos da view
          await fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          console.log('New message:', payload);

          // Refetch para atualizar última mensagem
          await fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clinicId]);

  return { conversations, loading };
}
```

### 4.4. Hook para Mensagens de uma Conversa

Criar arquivo: `/hooks/useMessages.ts`

```typescript
import { useEffect, useState } from 'react';
import { supabase, Message } from '@/lib/supabase';

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    // Fetch inicial
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    }

    fetchMessages();

    // Subscribe para novas mensagens em tempo real
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log('New message received:', payload);
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return { messages, loading };
}
```

### 4.5. Funções de Ação

Criar arquivo: `/lib/chatActions.ts`

```typescript
import { supabase } from './supabase';

export async function sendMessage(
  conversationId: string,
  content: string,
  sender: 'client' | 'bot' | 'agent',
  senderId?: string
) {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender,
      sender_id: senderId,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function takeoverConversation(
  conversationId: string,
  userId: string
) {
  const { error } = await supabase.rpc('takeover_conversation', {
    conversation_uuid: conversationId,
    user_uuid: userId,
  });

  if (error) throw error;
}

export async function resolveConversation(conversationId: string) {
  const { error } = await supabase.rpc('resolve_conversation', {
    conversation_uuid: conversationId,
  });

  if (error) throw error;
}

export async function markAsRead(conversationId: string) {
  const { error } = await supabase.rpc('mark_conversation_as_read', {
    conversation_uuid: conversationId,
  });

  if (error) throw error;
}
```

---

## 5. Políticas de Segurança (RLS)

### Habilitar RLS

```sql
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### Políticas para Usuários Autenticados

```sql
-- Clinics: usuário só vê suas próprias clínicas
CREATE POLICY "Users can view their clinics"
  ON clinics FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM clinic_users WHERE clinic_id = id
  ));

-- Contacts: usuário só vê contatos de suas clínicas
CREATE POLICY "Users can view contacts from their clinics"
  ON contacts FOR SELECT
  USING (clinic_id IN (
    SELECT clinic_id FROM clinic_users WHERE user_id = auth.uid()
  ));

-- Conversations: usuário só vê conversas de suas clínicas
CREATE POLICY "Users can view conversations from their clinics"
  ON conversations FOR SELECT
  USING (clinic_id IN (
    SELECT clinic_id FROM clinic_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update conversations from their clinics"
  ON conversations FOR UPDATE
  USING (clinic_id IN (
    SELECT clinic_id FROM clinic_users WHERE user_id = auth.uid()
  ));

-- Messages: usuário só vê mensagens de conversas de suas clínicas
CREATE POLICY "Users can view messages from their clinics"
  ON messages FOR SELECT
  USING (conversation_id IN (
    SELECT c.id FROM conversations c
    INNER JOIN clinic_users cu ON c.clinic_id = cu.clinic_id
    WHERE cu.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert messages to their clinics"
  ON messages FOR INSERT
  WITH CHECK (conversation_id IN (
    SELECT c.id FROM conversations c
    INNER JOIN clinic_users cu ON c.clinic_id = cu.clinic_id
    WHERE cu.user_id = auth.uid()
  ));
```

---

## 🚀 Como Usar no Componente

```typescript
'use client';

import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { sendMessage, takeoverConversation, resolveConversation } from '@/lib/chatActions';

export default function Chats() {
  const clinicId = 'YOUR_CLINIC_ID'; // Pegar do contexto/auth
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const { conversations, loading: loadingConvs } = useConversations(clinicId);
  const { messages, loading: loadingMsgs } = useMessages(selectedChat);

  const handleSendMessage = async (content: string) => {
    if (!selectedChat) return;
    await sendMessage(selectedChat, content, 'agent', 'USER_ID');
  };

  const handleTakeover = async () => {
    if (!selectedChat) return;
    await takeoverConversation(selectedChat, 'USER_ID');
  };

  const handleResolve = async () => {
    if (!selectedChat) return;
    await resolveConversation(selectedChat);
  };

  // ... resto do componente
}
```

---

## 📊 Benefícios desta Arquitetura

✅ **Real-time automático** - Updates instantâneos sem polling
✅ **Escalável** - Supabase Realtime usa WebSockets otimizados
✅ **Seguro** - RLS garante isolamento de dados
✅ **Performance** - Views otimizadas e indexes estratégicos
✅ **Type-safe** - TypeScript em todo o stack
✅ **Simples** - Hooks reutilizáveis abstraem complexidade

---

## 🔧 Próximos Passos

1. Criar as tabelas no Supabase Dashboard ou via SQL Editor
2. Configurar variáveis de ambiente no `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Implementar autenticação (Supabase Auth)
4. Adaptar o componente de chat para usar os hooks
5. Testar real-time abrindo em múltiplas abas

---

Qualquer dúvida sobre a implementação, me avise! 🚀
