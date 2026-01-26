'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KanbanBoard from '@/components/looker/KanbanBoard';
import LeadDetailsModal from '@/components/looker/LeadDetailsModal';
import { KanbanColumn, Lead, LeadStage } from '@/types/lead';

export default function Looker() {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Mock data - substituir por dados reais do Supabase
  useEffect(() => {
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Maria Silva',
        phone: '+55 11 98765-4321',
        stage: 'TOFU',
        lastMessage: 'Oi, gostaria de saber mais sobre os procedimentos',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
        unreadCount: 2,
        source: 'whatsapp',
        psychologicalProfile: 'Curiosa/Pesquisadora',
        summary: 'Primeira interação. Demonstra interesse em conhecer os procedimentos oferecidos pela clínica.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'João Santos',
        phone: '+55 11 97654-3210',
        stage: 'MOFU',
        lastMessage: 'Qual o valor do preenchimento labial?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 1,
        source: 'whatsapp',
        psychologicalProfile: 'Pragmático/Direto',
        summary: 'Interessado em preenchimento labial. Já perguntou sobre valores e disponibilidade.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Ana Costa',
        phone: '+55 11 96543-2109',
        stage: 'BOFU',
        lastMessage: 'Posso agendar para amanhã às 14h?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 10),
        unreadCount: 3,
        source: 'whatsapp',
        psychologicalProfile: 'Decidida/Objetiva',
        summary: 'Pronta para agendar botox. Demonstra urgência e decisão de compra.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        name: 'Carlos Oliveira',
        phone: '+55 11 95432-1098',
        stage: 'FRIOS',
        lastMessage: 'Obrigado pelas informações',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
        unreadCount: 0,
        source: 'upload',
        psychologicalProfile: 'Analítico/Cauteloso',
        summary: 'Lead antigo. Última interação há 2 dias. Pode precisar de reengajamento.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        name: 'Paula Mendes',
        phone: '+55 11 94321-0987',
        stage: 'TOFU',
        lastMessage: 'Vocês atendem aos sábados?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
        unreadCount: 1,
        source: 'whatsapp',
        psychologicalProfile: 'Organizada/Planejadora',
        summary: 'Perguntou sobre horários de atendimento. Parece estar avaliando disponibilidade.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6',
        name: 'Roberto Lima',
        phone: '+55 11 93210-9876',
        stage: 'MOFU',
        lastMessage: 'Aceita cartão de crédito?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 45),
        unreadCount: 2,
        source: 'whatsapp',
        psychologicalProfile: 'Prático/Financeiro',
        summary: 'Interessado em formas de pagamento. Pode estar próximo de decisão de compra.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Função para ordenar leads por tempo de espera (maior tempo primeiro)
    const sortLeadsByWaitTime = (leads: Lead[]) => {
      return [...leads].sort((a, b) => {
        return new Date(a.lastMessageTime).getTime() - new Date(b.lastMessageTime).getTime();
      });
    };

    const initialColumns: KanbanColumn[] = [
      {
        id: 'FRIOS',
        title: 'Frios',
        color: 'gray',
        description: 'Leads antigos',
        leads: sortLeadsByWaitTime(mockLeads.filter(l => l.stage === 'FRIOS')),
      },
      {
        id: 'TOFU',
        title: 'Topo de Funil',
        color: 'blue',
        description: 'Primeiras interações',
        leads: sortLeadsByWaitTime(mockLeads.filter(l => l.stage === 'TOFU')),
      },
      {
        id: 'MOFU',
        title: 'Meio de Funil',
        color: 'yellow',
        description: 'Demonstram interesse',
        leads: sortLeadsByWaitTime(mockLeads.filter(l => l.stage === 'MOFU')),
      },
      {
        id: 'BOFU',
        title: 'Fundo de Funil',
        color: 'green',
        description: 'Prontos para agendar',
        leads: sortLeadsByWaitTime(mockLeads.filter(l => l.stage === 'BOFU')),
      },
    ];

    setColumns(initialColumns);
    setLoading(false);
    console.log('Looker - Columns loaded:', initialColumns);
  }, []);

  const handleLeadMove = async (leadId: string, fromStage: LeadStage, toStage: LeadStage) => {
    console.log(`Lead ${leadId} movido de ${fromStage} para ${toStage}`);

    // Atualizar estado local
    setColumns(prevColumns => {
      return prevColumns.map(col => {
        // Remover lead da coluna de origem
        if (col.id === fromStage) {
          return {
            ...col,
            leads: col.leads.filter(l => l.id !== leadId)
          };
        }

        // Adicionar lead na coluna de destino
        if (col.id === toStage) {
          const leadToMove = prevColumns
            .find(c => c.id === fromStage)
            ?.leads.find(l => l.id === leadId);

          if (leadToMove) {
            return {
              ...col,
              leads: [...col.leads, { ...leadToMove, stage: toStage }]
            };
          }
        }

        return col;
      });
    });

    // TODO: Implementar atualização no Supabase
    // await updateLeadStage(leadId, toStage);
  };

  const handleUploadWhatsApp = () => {
    // TODO: Implementar upload de arquivo .zip do WhatsApp
    console.log('Upload de conversas do WhatsApp');
  };

  const totalLeads = columns.reduce((sum, col) => sum + col.leads.length, 0);
  const unreadMessages = columns.reduce(
    (sum, col) => sum + col.leads.reduce((s, l) => s + l.unreadCount, 0),
    0
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Looker</h1>
            <p className="text-gray-500 mt-1">
              Visualização em tempo real da classificação de leads
            </p>
          </div>
          <button
            onClick={handleUploadWhatsApp}
            className="px-4 py-2 bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>📁</span>
            Upload WhatsApp
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total de Leads</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Topo de Funil</p>
                <p className="text-2xl font-bold text-blue-700">
                  {columns.find(c => c.id === 'TOFU')?.leads.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-xl">
                🔵
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Meio de Funil</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {columns.find(c => c.id === 'MOFU')?.leads.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center text-xl">
                🟡
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Fundo de Funil</p>
                <p className="text-2xl font-bold text-green-700">
                  {columns.find(c => c.id === 'BOFU')?.leads.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-xl">
                🟢
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Search Bar */}
      <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
        <input
          type="text"
          placeholder="Buscar por nome, telefone ou informações do lead..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 text-sm"
        />
      </div>

      {/* Kanban Board */}
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Carregando leads...</p>
            </div>
          </div>
        ) : (
          <KanbanBoard columns={columns} onLeadClick={setSelectedLead} />
        )}
      </div>

      {/* Real-time indicator */}
      <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-200 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-700">
          {unreadMessages > 0 ? `${unreadMessages} mensagens não lidas` : 'Atualizado em tempo real'}
        </span>
      </div>

      {/* Lead Details Modal */}
      <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </DashboardLayout>
  );
}
