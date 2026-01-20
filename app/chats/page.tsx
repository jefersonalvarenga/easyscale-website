'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useState, useEffect, useRef } from 'react';

// Tipos
interface Message {
  id: number;
  conversation_id: number;
  sender: 'client' | 'bot' | 'agent';
  text: string;
  time: string;
  created_at: string;
}

interface Conversation {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'bot' | 'agent' | 'resolved';
  lead_status: string;
  origin: string;
  interest: string;
  message_count: number;
  first_interaction: string;
}

type FilterType = 'all' | 'bot' | 'agent' | 'resolved';

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Maria Silva',
      phone: '(11) 98765-4321',
      lastMessage: 'Gostaria de agendar uma avaliação',
      time: '14:32',
      unread: 2,
      status: 'bot',
      lead_status: 'Lead Quente',
      origin: 'Instagram Ads',
      interest: 'Harmonização Facial',
      message_count: 5,
      first_interaction: 'Hoje, 14:28'
    },
    {
      id: 2,
      name: 'João Santos',
      phone: '(11) 98765-1234',
      lastMessage: 'Obrigado pelo atendimento!',
      time: '14:15',
      unread: 0,
      status: 'resolved',
      lead_status: 'Cliente',
      origin: 'Google Ads',
      interest: 'Botox',
      message_count: 12,
      first_interaction: 'Ontem, 10:15'
    },
    {
      id: 3,
      name: 'Ana Costa',
      phone: '(11) 98765-5678',
      lastMessage: 'Qual o valor do procedimento?',
      time: '13:45',
      unread: 1,
      status: 'bot',
      lead_status: 'Lead Quente',
      origin: 'Facebook Ads',
      interest: 'Preenchimento Labial',
      message_count: 3,
      first_interaction: 'Hoje, 13:40'
    },
    {
      id: 4,
      name: 'Carlos Ferreira',
      phone: '(11) 98765-9012',
      lastMessage: 'Preciso remarcar minha consulta',
      time: '12:30',
      unread: 0,
      status: 'agent',
      lead_status: 'Cliente',
      origin: 'Indicação',
      interest: 'Limpeza de Pele',
      message_count: 8,
      first_interaction: 'Segunda, 09:00'
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, conversation_id: 1, sender: 'client', text: 'Olá! Gostaria de saber mais sobre harmonização facial', time: '14:28', created_at: '2026-01-20T14:28:00' },
    { id: 2, conversation_id: 1, sender: 'bot', text: 'Olá! Que bom ter você aqui! 😊\n\nA harmonização facial é um dos nossos procedimentos mais procurados. Ela visa equilibrar as proporções do rosto de forma natural.\n\nVocê gostaria de agendar uma avaliação gratuita com nossa especialista?', time: '14:29', created_at: '2026-01-20T14:29:00' },
    { id: 3, conversation_id: 1, sender: 'client', text: 'Sim, gostaria! Quanto custa?', time: '14:30', created_at: '2026-01-20T14:30:00' },
    { id: 4, conversation_id: 1, sender: 'bot', text: 'Maravilha! A avaliação é totalmente gratuita 🎁\n\nO investimento no procedimento varia de acordo com as suas necessidades, mas geralmente fica entre R$ 800 e R$ 2.500.\n\nTenho horários disponíveis para avaliação:\n• Amanhã às 10h\n• Amanhã às 15h\n• Sexta às 14h\n\nQual prefere?', time: '14:30', created_at: '2026-01-20T14:30:00' },
    { id: 5, conversation_id: 1, sender: 'client', text: 'Gostaria de agendar uma avaliação', time: '14:32', created_at: '2026-01-20T14:32:00' },
  ]);

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  // Conversação selecionada
  const currentConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = messages.filter(m => m.conversation_id === selectedChat);

  // Filtrar conversas
  const filteredConversations = conversations.filter(conv => {
    const matchesFilter = filter === 'all' || conv.status === filter;
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Contadores para badges
  const counts = {
    all: conversations.length,
    bot: conversations.filter(c => c.status === 'bot').length,
    agent: conversations.filter(c => c.status === 'agent').length,
    resolved: conversations.filter(c => c.status === 'resolved').length,
  };

  // Assumir chat
  const handleTakeOver = () => {
    if (!selectedChat) return;

    setConversations(prev => prev.map(conv =>
      conv.id === selectedChat ? { ...conv, status: 'agent' } : conv
    ));

    // Adiciona mensagem do sistema
    const systemMessage: Message = {
      id: messages.length + 1,
      conversation_id: selectedChat,
      sender: 'agent',
      text: '👤 Agente assumiu o atendimento',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, systemMessage]);
  };

  // Resolver conversa
  const handleResolve = () => {
    if (!selectedChat) return;

    setConversations(prev => prev.map(conv =>
      conv.id === selectedChat ? { ...conv, status: 'resolved', unread: 0 } : conv
    ));
  };

  // Enviar mensagem
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !selectedChat) return;
    if (currentConversation?.status !== 'agent') return; // Só envia se assumiu o chat

    const newMessage: Message = {
      id: messages.length + 1,
      conversation_id: selectedChat,
      sender: 'agent',
      text: messageInput,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Atualiza última mensagem da conversa
    setConversations(prev => prev.map(conv =>
      conv.id === selectedChat
        ? { ...conv, lastMessage: messageInput, time: newMessage.time, message_count: conv.message_count + 1 }
        : conv
    ));

    setMessageInput('');
  };

  const isAgentActive = currentConversation?.status === 'agent';

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Conversations List */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Chats</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-3 border-b border-gray-200 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-[#635BFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todas ({counts.all})
            </button>
            <button
              onClick={() => setFilter('bot')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === 'bot'
                  ? 'bg-[#635BFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🤖 Agente IA ({counts.bot})
            </button>
            <button
              onClick={() => setFilter('agent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === 'agent'
                  ? 'bg-[#635BFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👤 Humano ({counts.agent})
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === 'resolved'
                  ? 'bg-[#635BFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✓ Resolvidas ({counts.resolved})
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <p className="text-2xl mb-2">🔍</p>
                <p className="text-sm">Nenhuma conversa encontrada</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedChat(conv.id);
                    // Marca como lido
                    setConversations(prev => prev.map(c =>
                      c.id === conv.id ? { ...c, unread: 0 } : c
                    ));
                  }}
                  className={`px-6 py-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedChat === conv.id ? 'bg-blue-50 border-l-4 border-l-[#635BFF]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {conv.status === 'bot' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">🤖 Agente IA</span>
                        )}
                        {conv.status === 'agent' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">👤 Humano</span>
                        )}
                        {conv.status === 'resolved' && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">✓ Resolvido</span>
                        )}
                        {conv.unread > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-[#635BFF] text-white rounded-full">{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat && currentConversation ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="px-8 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold">
                    {currentConversation.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{currentConversation.name}</h2>
                    <p className="text-sm text-gray-500">{currentConversation.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentConversation.status === 'bot' && (
                    <button
                      onClick={handleTakeOver}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                    >
                      👤 Assumir Chat
                    </button>
                  )}
                  {currentConversation.status === 'agent' && (
                    <button
                      onClick={handleResolve}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      ✓ Resolver
                    </button>
                  )}
                  {currentConversation.status === 'resolved' && (
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                      ✓ Resolvido
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-lg ${msg.sender === 'client' ? '' : 'order-2'}`}>
                    <div className={`flex items-end gap-2 ${msg.sender === 'client' ? '' : 'flex-row-reverse'}`}>
                      {msg.sender === 'client' ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {currentConversation.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ) : msg.sender === 'bot' ? (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                          🤖
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                          👤
                        </div>
                      )}
                      <div>
                        <div className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                          msg.sender === 'client'
                            ? 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                            : msg.sender === 'bot'
                            ? 'bg-green-500 text-white rounded-br-none'
                            : 'bg-blue-500 text-white rounded-br-none'
                        }`}>
                          {msg.text}
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'client' ? 'text-left' : 'text-right'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-8 py-4 bg-white border-t border-gray-200">
              {!isAgentActive && currentConversation.status !== 'resolved' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                  <span className="text-yellow-600">⚠️</span>
                  <p className="text-sm text-yellow-800">
                    <strong>Agente IA está respondendo.</strong> Clique em "Assumir Chat" para intervir.
                  </p>
                </div>
              )}

              {currentConversation.status === 'resolved' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
                  <span className="text-gray-600">✓</span>
                  <p className="text-sm text-gray-700">
                    <strong>Conversa resolvida.</strong> Esta conversa foi finalizada.
                  </p>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  placeholder={isAgentActive ? "Digite sua mensagem..." : "Assuma o chat para enviar mensagens"}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!isAgentActive || currentConversation.status === 'resolved'}
                />
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isAgentActive && currentConversation.status !== 'resolved'
                      ? 'bg-[#635BFF] text-white hover:bg-[#5046E5]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isAgentActive || currentConversation.status === 'resolved'}
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <p className="text-4xl mb-4">💬</p>
              <p className="text-lg font-medium">Selecione uma conversa</p>
              <p className="text-sm">Escolha uma conversa à esquerda para começar</p>
            </div>
          </div>
        )}

        {/* Right Sidebar - Customer Info */}
        {selectedChat && currentConversation && (
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">Informações do Cliente</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nome</p>
                <p className="font-medium text-gray-900">{currentConversation.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Telefone</p>
                <p className="font-medium text-gray-900">{currentConversation.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                  {currentConversation.lead_status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Origem</p>
                <p className="font-medium text-gray-900">{currentConversation.origin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Interesse</p>
                <p className="font-medium text-gray-900">{currentConversation.interest}</p>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Histórico</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-500">Primeira interação</p>
                  <p className="font-medium text-gray-900">{currentConversation.first_interaction}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Mensagens trocadas</p>
                  <p className="font-medium text-gray-900">{currentConversation.message_count} mensagens</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Status da conversa</p>
                  <p className="font-medium text-gray-900">
                    {currentConversation.status === 'bot' && '🤖 Agente IA respondendo'}
                    {currentConversation.status === 'agent' && '👤 Atendimento humano'}
                    {currentConversation.status === 'resolved' && '✓ Conversa resolvida'}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            <button className="w-full px-4 py-2 bg-[#635BFF] text-white rounded-lg font-medium hover:bg-[#5046E5] transition-colors">
              Ver Perfil Completo
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
