export type LeadStage = 'FRIOS' | 'TOFU' | 'MOFU' | 'BOFU';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  stage: LeadStage;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  avatar?: string;
  tags?: string[];
  notes?: string;
  source?: 'whatsapp' | 'upload' | 'manual';
  psychologicalProfile?: string; // Ex: "Pragmática/Organizada"
  summary?: string; // Resumo do lead gerado por IA
  createdAt: Date;
  updatedAt: Date;
}

export interface KanbanColumn {
  id: LeadStage;
  title: string;
  color: string;
  description: string;
  leads: Lead[];
}
