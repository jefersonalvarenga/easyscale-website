'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState(1);

  const conversations = [
    { id: 1, name: 'Maria Silva', lastMessage: 'Gostaria de agendar uma avaliação', time: '14:32', unread: 2, status: 'active' },
    { id: 2, name: 'João Santos', lastMessage: 'Obrigado pelo atendimento!', time: '14:15', unread: 0, status: 'resolved' },
    { id: 3, name: 'Ana Costa', lastMessage: 'Qual o valor do procedimento?', time: '13:45', unread: 1, status: 'active' },
    { id: 4, name: 'Carlos Ferreira', lastMessage: 'Preciso remarcar minha consulta', time: '12:30', unread: 0, status: 'pending' },
  ];

  const messages = [
    { id: 1, sender: 'client', text: 'Olá! Gostaria de saber mais sobre harmonização facial', time: '14:28' },
    { id: 2, sender: 'bot', text: 'Olá! Que bom ter você aqui! 😊\n\nA harmonização facial é um dos nossos procedimentos mais procurados. Ela visa equilibrar as proporções do rosto de forma natural.\n\nVocê gostaria de agendar uma avaliação gratuita com nossa especialista?', time: '14:29' },
    { id: 3, sender: 'client', text: 'Sim, gostaria! Quanto custa?', time: '14:30' },
    { id: 4, sender: 'bot', text: 'Maravilha! A avaliação é totalmente gratuita 🎁\n\nO investimento no procedimento varia de acordo com as suas necessidades, mas geralmente fica entre R$ 800 e R$ 2.500.\n\nTenho horários disponíveis para avaliação:\n• Amanhã às 10h\n• Amanhã às 15h\n• Sexta às 14h\n\nQual prefere?', time: '14:30' },
    { id: 5, sender: 'client', text: 'Gostaria de agendar uma avaliação', time: '14:32' },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Chats</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar conversas..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-3 border-b border-gray-200 flex gap-2">
            <button className="px-3 py-1.5 bg-[#635BFF] text-white text-xs font-medium rounded-lg">
              Todas (4)
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200">
              Ativas (2)
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200">
              Aguardando (1)
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
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
                      {conv.status === 'active' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">🤖 Agente</span>
                      )}
                      {conv.status === 'pending' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">⏳ Aguardando</span>
                      )}
                      {conv.unread > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[#635BFF] text-white rounded-full">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Maria Silva</h2>
                  <p className="text-sm text-gray-500">Última mensagem há 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                  👤 Assumir Chat
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  ✓ Resolver
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-lg ${msg.sender === 'client' ? '' : 'order-2'}`}>
                  <div className={`flex items-end gap-2 ${msg.sender === 'client' ? '' : 'flex-row-reverse'}`}>
                    {msg.sender === 'client' ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        MS
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                        🤖
                      </div>
                    )}
                    <div>
                      <div className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                        msg.sender === 'client'
                          ? 'bg-white text-gray-900 rounded-bl-none'
                          : 'bg-[#635BFF] text-white rounded-br-none'
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
          </div>

          {/* Input Area */}
          <div className="px-8 py-4 bg-white border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
              <span className="text-yellow-600">⚠️</span>
              <p className="text-sm text-yellow-800">
                <strong>Agente IA está respondendo.</strong> Você pode intervir a qualquer momento clicando em "Assumir Chat".
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20"
                disabled
              />
              <button
                className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Enviar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Assuma o chat para enviar mensagens manualmente</p>
          </div>
        </div>

        {/* Right Sidebar - Customer Info */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Informações do Cliente</h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Nome</p>
              <p className="font-medium text-gray-900">Maria Silva</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Telefone</p>
              <p className="font-medium text-gray-900">(11) 98765-4321</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">Lead Quente</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Origem</p>
              <p className="font-medium text-gray-900">Instagram Ads</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Interesse</p>
              <p className="font-medium text-gray-900">Harmonização Facial</p>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Histórico</h4>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-500">Primeira interação</p>
                <p className="font-medium text-gray-900">Hoje, 14:28</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500">Mensagens trocadas</p>
                <p className="font-medium text-gray-900">5 mensagens</p>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <button className="w-full px-4 py-2 bg-[#635BFF] text-white rounded-lg font-medium hover:bg-[#5046E5] transition-colors">
            Ver Perfil Completo
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
