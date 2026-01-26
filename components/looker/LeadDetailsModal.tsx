'use client';

import { Lead } from '@/types/lead';
import { useState, useEffect, useRef } from 'react';

interface LeadDetailsModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadDetailsModal({ lead, onClose }: LeadDetailsModalProps) {
  const [message, setMessage] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [leadMessages, setLeadMessages] = useState<Record<string, string>>({});
  const previousLeadId = useRef<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resumo' | 'conversas' | 'perfil'>('resumo');
  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);

  // Resetar mensagem quando o lead mudar
  useEffect(() => {
    if (lead && lead.id !== previousLeadId.current) {
      // Salvar mensagem do lead anterior
      if (previousLeadId.current && message) {
        setLeadMessages(prev => ({
          ...prev,
          [previousLeadId.current!]: message
        }));
      }

      // Carregar mensagem do novo lead (ou string vazia se não houver)
      setMessage(leadMessages[lead.id] || '');

      // Resetar conversas para forçar recarregamento
      setConversations([]);

      // Resetar para aba de resumo
      setActiveTab('resumo');

      previousLeadId.current = lead.id;
    }
  }, [lead, leadMessages, message]);

  // Salvar mensagem quando o modal fechar
  useEffect(() => {
    return () => {
      if (lead && message) {
        setLeadMessages(prev => ({
          ...prev,
          [lead.id]: message
        }));
      }
    };
  }, [lead, message]);

  // Carregar conversas quando a aba for aberta
  useEffect(() => {
    if (activeTab === 'conversas' && lead && conversations.length === 0 && !loadingConversations) {
      loadConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, lead]);

  const loadConversations = async () => {
    if (!lead) return;

    setLoadingConversations(true);
    try {
      // TODO: Implementar chamada para API que retorna conversas do lead
      const response = await fetch(`/api/leads/${lead.id}/conversations`);

      if (!response.ok) {
        // API ainda não implementada, usar mock
        setConversations([
          {
            id: '1',
            sender: 'lead',
            message: lead.lastMessage,
            timestamp: lead.lastMessageTime,
          },
        ]);
        setLoadingConversations(false);
        return;
      }

      const data = await response.json();

      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch (error) {
      // Em caso de erro, usar mock de conversas
      setConversations([
        {
          id: '1',
          sender: 'lead',
          message: lead.lastMessage,
          timestamp: lead.lastMessageTime,
        },
      ]);
    } finally {
      setLoadingConversations(false);
    }
  };

  if (!lead) return null;

  const handleSuggestMessage = async () => {
    setLoadingSuggestion(true);
    try {
      // TODO: Implementar chamada para API de IA
      const response = await fetch('/api/ai/suggest-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          stage: lead.stage,
          psychologicalProfile: lead.psychologicalProfile,
          summary: lead.summary,
          lastMessage: lead.lastMessage
        }),
      });

      const data = await response.json();
      if (data.suggestion) {
        setMessage(data.suggestion);
      }
    } catch (error) {
      console.error('Erro ao sugerir mensagem:', error);
      // Mensagem mock para demonstração
      setMessage(`Olá ${lead.name.split(' ')[0]}! Vi que você está interessado. Gostaria de agendar uma avaliação gratuita para conversarmos melhor sobre suas necessidades?`);
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  };

  const getTimeInfo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    let formattedTime = '';
    if (minutes < 60) formattedTime = `${minutes}m`;
    else if (hours < 24) formattedTime = `${hours}h`;
    else formattedTime = `${days}d`;

    // Determinar cor baseado no tempo
    let colorClass = '';
    if (minutes > 10) {
      colorClass = 'bg-red-500 text-white';
    } else if (minutes > 5) {
      colorClass = 'bg-yellow-500 text-white';
    } else {
      colorClass = 'bg-green-500 text-white';
    }

    return { formattedTime, colorClass };
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'FRIOS': return 'Frios';
      case 'TOFU': return 'Topo de Funil';
      case 'MOFU': return 'Meio de Funil';
      case 'BOFU': return 'Fundo de Funil';
      default: return stage;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'FRIOS': return 'bg-gray-100 text-gray-700';
      case 'TOFU': return 'bg-blue-100 text-blue-700';
      case 'MOFU': return 'bg-yellow-100 text-yellow-700';
      case 'BOFU': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleWhatsAppClick = () => {
    // Remove caracteres especiais do telefone
    const phoneNumber = lead.phone.replace(/\D/g, '');
    // Se houver mensagem, envia com a mensagem pré-preenchida
    const url = message
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold text-lg">
                  {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{lead.name}</h2>
                  <p className="text-sm text-gray-500">{lead.phone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTimeInfo(lead.lastMessageTime).colorClass}`}>
                  {getTimeInfo(lead.lastMessageTime).formattedTime}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getStageColor(lead.stage)}`}>
                {getStageLabel(lead.stage)}
              </span>
              {lead.psychologicalProfile && (
                <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-100 text-purple-700">
                  {lead.psychologicalProfile}
                </span>
              )}
              {lead.source && (
                <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
                  {lead.source === 'whatsapp' ? 'WhatsApp' : lead.source === 'upload' ? 'Upload' : 'Manual'}
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('resumo')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === 'resumo'
                    ? 'text-[#635BFF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Resumo
                {activeTab === 'resumo' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('conversas')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === 'conversas'
                    ? 'text-[#635BFF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Conversas
                {activeTab === 'conversas' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('perfil')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === 'perfil'
                    ? 'text-[#635BFF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Perfil
                {activeTab === 'perfil' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">{activeTab === 'resumo' && (
              <>
                {/* Resumo */}
                {lead.summary && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumo do Lead</h3>
                    <p className="text-sm text-gray-600">{lead.summary}</p>
                  </div>
                )}

                {/* Última Mensagem */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Última Mensagem</h3>
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">{lead.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatTime(lead.lastMessageTime)}</p>
                  </div>
                </div>

                {/* Notas */}
                {lead.notes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Notas</h3>
                    <p className="text-sm text-gray-600 bg-yellow-50 rounded-lg p-3">{lead.notes}</p>
                  </div>
                )}

                {/* Tags */}
                {lead.tags && lead.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'conversas' && (
              <div className="space-y-4 h-full flex flex-col">
                <h3 className="text-sm font-semibold text-gray-700">Histórico de Conversas</h3>

                {loadingConversations ? (
                  <div className="flex items-center justify-center flex-1">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-[#635BFF] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">Carregando conversas...</p>
                    </div>
                  </div>
                ) : conversations.length > 0 ? (
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`p-3 rounded-lg ${
                          conv.sender === 'lead'
                            ? 'bg-blue-50 border-l-4 border-blue-500'
                            : 'bg-gray-50 border-l-4 border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-600">
                            {conv.sender === 'lead' ? lead.name : 'Você'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(conv.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{conv.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-500 text-center">
                      Nenhuma conversa encontrada
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'perfil' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Informações do Perfil</h3>

                {/* Informações Adicionais */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">Criado em</h3>
                    <p className="text-sm text-gray-900">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">Última atualização</h3>
                    <p className="text-sm text-gray-900">
                      {new Date(lead.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {lead.psychologicalProfile && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">Perfil Psicológico</h3>
                    <p className="text-sm text-gray-900">{lead.psychologicalProfile}</p>
                  </div>
                )}
              </div>
            )}</div>


          {/* Footer - Mensagem e Ações */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl space-y-3">
            {/* Campo de mensagem */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Mensagem para o lead
              </label>
              <div className="flex gap-2 items-center">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem ou clique em 'Sugerir com IA' para obter uma sugestão..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSuggestMessage}
                  disabled={loadingSuggestion}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Sugerir mensagem com IA"
                >
                  {loadingSuggestion ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>✨</span>
                      <span className="hidden sm:inline">IA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Botão WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span>
              Enviar Mensagem no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
