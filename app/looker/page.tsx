'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';

// Tipos
export type FunnelStage = 'COLD' | 'TOFU' | 'MOFU' | 'BOFU';

export interface Lead {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  stage: FunnelStage;
  origin: string;
  interest: string;
  messageCount: number;
  unreadCount: number;
  firstInteraction: string;
}

interface KanbanColumnProps {
  title: string;
  description: string;
  leads: Lead[];
  color: string;
  icon: string;
  onLeadClick: (lead: Lead) => void;
}

// Componente da Coluna do Kanban
function KanbanColumn({ title, description, leads, color, icon, onLeadClick }: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-xl p-4">
      {/* Header da Coluna */}
      <div className={`bg-gradient-to-r ${color} rounded-lg p-4 mb-4 text-white`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <p className="text-sm opacity-90">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium opacity-90">Total</span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
            {leads.length}
          </span>
        </div>
      </div>

      {/* Lista de Leads */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {leads.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-sm">Nenhum lead nesta etapa</p>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
          ))
        )}
      </div>
    </div>
  );
}

// Componente do Card de Lead
function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-[#635BFF]/30 transition-all cursor-pointer"
    >
      {/* Avatar e Nome */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {lead.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-gray-900 truncate">{lead.name}</p>
            {lead.unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full flex-shrink-0">
                {lead.unreadCount}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{lead.phone}</p>
        </div>
      </div>

      {/* Última Mensagem */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">{lead.lastMessage}</p>
      </div>

      {/* Informações */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
          {lead.origin}
        </span>
        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded font-medium">
          {lead.interest}
        </span>
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">💬 {lead.messageCount} msgs</span>
        <span className="text-xs text-gray-500">{lead.time}</span>
      </div>
    </div>
  );
}

export default function Looker() {
  // Estado dos leads (mock data - virá do Supabase)
  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Maria Silva',
      phone: '(11) 98765-4321',
      lastMessage: 'Gostaria de agendar uma avaliação para harmonização facial',
      time: '14:32',
      stage: 'BOFU',
      origin: 'Instagram Ads',
      interest: 'Harmonização Facial',
      messageCount: 8,
      unreadCount: 2,
      firstInteraction: 'Hoje, 14:28'
    },
    {
      id: 2,
      name: 'João Santos',
      phone: '(11) 98765-1234',
      lastMessage: 'Qual o valor do procedimento de botox?',
      time: '14:15',
      stage: 'MOFU',
      origin: 'Google Ads',
      interest: 'Botox',
      messageCount: 5,
      unreadCount: 0,
      firstInteraction: 'Ontem, 10:15'
    },
    {
      id: 3,
      name: 'Ana Costa',
      phone: '(11) 98765-5678',
      lastMessage: 'Olá, vi o anúncio no Instagram',
      time: '13:45',
      stage: 'TOFU',
      origin: 'Facebook Ads',
      interest: 'Preenchimento Labial',
      messageCount: 2,
      unreadCount: 1,
      firstInteraction: 'Hoje, 13:40'
    },
    {
      id: 4,
      name: 'Carlos Ferreira',
      phone: '(11) 98765-9012',
      lastMessage: 'Arquivo importado do WhatsApp',
      time: '10:30',
      stage: 'COLD',
      origin: 'Upload ZIP',
      interest: 'Limpeza de Pele',
      messageCount: 15,
      unreadCount: 0,
      firstInteraction: '15/12/2025'
    },
    {
      id: 5,
      name: 'Paula Mendes',
      phone: '(11) 98765-3456',
      lastMessage: 'Vocês fazem preenchimento? Tenho interesse',
      time: '12:20',
      stage: 'MOFU',
      origin: 'Instagram Ads',
      interest: 'Preenchimento Facial',
      messageCount: 4,
      unreadCount: 1,
      firstInteraction: 'Hoje, 12:10'
    },
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Separar leads por estágio
  const leadsByStage = {
    COLD: leads.filter(l => l.stage === 'COLD'),
    TOFU: leads.filter(l => l.stage === 'TOFU'),
    MOFU: leads.filter(l => l.stage === 'MOFU'),
    BOFU: leads.filter(l => l.stage === 'BOFU'),
  };

  // Handler para clique no lead
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Looker®</h1>
              <span className="px-3 py-1 bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white text-xs font-bold rounded-full">
                BETA
              </span>
            </div>
            <p className="text-gray-500 mt-1">Classificação em tempo real dos seus leads</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Atualização</p>
              <p className="text-sm font-medium text-gray-900">Tempo real ⚡</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              📤 Upload ZIP
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Total de Leads</p>
            <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Leads Frios ❄️</p>
            <p className="text-2xl font-bold text-gray-900">{leadsByStage.COLD.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Topo de Funil 🌱</p>
            <p className="text-2xl font-bold text-gray-900">{leadsByStage.TOFU.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Meio de Funil 🔥</p>
            <p className="text-2xl font-bold text-gray-900">{leadsByStage.MOFU.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Fundo de Funil 💎</p>
            <p className="text-2xl font-bold text-gray-900">{leadsByStage.BOFU.length}</p>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-8">
        <div className="flex gap-6 overflow-x-auto pb-4">
          <KanbanColumn
            title="Leads Frios"
            description="Leads antigos (pré-Looker®)"
            leads={leadsByStage.COLD}
            color="from-gray-500 to-gray-600"
            icon="❄️"
            onLeadClick={handleLeadClick}
          />
          <KanbanColumn
            title="Topo de Funil"
            description="Primeiras mensagens"
            leads={leadsByStage.TOFU}
            color="from-green-500 to-green-600"
            icon="🌱"
            onLeadClick={handleLeadClick}
          />
          <KanbanColumn
            title="Meio de Funil"
            description="Demonstra interesse"
            leads={leadsByStage.MOFU}
            color="from-orange-500 to-orange-600"
            icon="🔥"
            onLeadClick={handleLeadClick}
          />
          <KanbanColumn
            title="Fundo de Funil"
            description="Pronto para agendar"
            leads={leadsByStage.BOFU}
            color="from-[#635BFF] to-[#00AFE1]"
            icon="💎"
            onLeadClick={handleLeadClick}
          />
        </div>
      </div>

      {/* Modal de Detalhes do Lead (opcional) */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Detalhes do Lead</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold text-xl">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{selectedLead.name}</p>
                  <p className="text-sm text-gray-500">{selectedLead.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estágio</p>
                  <p className="font-medium text-gray-900">{selectedLead.stage}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Origem</p>
                  <p className="font-medium text-gray-900">{selectedLead.origin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Interesse</p>
                  <p className="font-medium text-gray-900">{selectedLead.interest}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mensagens</p>
                  <p className="font-medium text-gray-900">{selectedLead.messageCount}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Última Mensagem</p>
                <p className="text-sm text-gray-900">{selectedLead.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-2">{selectedLead.time}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  💬 Ir para Chat
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  👤 Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
