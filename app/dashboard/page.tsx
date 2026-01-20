'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Dashboard() {
  const stats = [
    { label: 'Conversas Ativas', value: '24', change: '+12%', trend: 'up', icon: '💬' },
    { label: 'Taxa de Conversão', value: '68%', change: '+8%', trend: 'up', icon: '📈' },
    { label: 'No-Show', value: '8%', change: '-15%', trend: 'down', icon: '✅' },
    { label: 'Faturamento (Mês)', value: 'R$ 145.000', change: '+22%', trend: 'up', icon: '💰' },
  ];

  const recentChats = [
    { id: 1, name: 'Maria Silva', message: 'Gostaria de agendar uma avaliação', time: '2 min', unread: true },
    { id: 2, name: 'João Santos', message: 'Obrigado pelo atendimento!', time: '15 min', unread: false },
    { id: 3, name: 'Ana Costa', message: 'Qual o valor do procedimento?', time: '1h', unread: true },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'Carla Mendes', procedure: 'Harmonização Facial', time: '14:00', date: 'Hoje' },
    { id: 2, patient: 'Pedro Oliveira', procedure: 'Preenchimento Labial', time: '15:30', date: 'Hoje' },
    { id: 3, patient: 'Julia Rodrigues', procedure: 'Botox', time: '10:00', date: 'Amanhã' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Bem-vindo de volta, Jeferson! 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Período</p>
              <select className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este mês</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs. período anterior</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#635BFF]/10 to-[#00AFE1]/10 flex items-center justify-center text-2xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Chats */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Conversas Recentes</h2>
              <a href="/dashboard/chats" className="text-sm font-medium text-[#635BFF] hover:underline">
                Ver todas →
              </a>
            </div>
            <div className="divide-y divide-gray-100">
              {recentChats.map((chat) => (
                <div key={chat.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold text-sm">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900">{chat.name}</p>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className={`text-sm truncate ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                        {chat.message}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="w-2 h-2 bg-[#635BFF] rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Próximos Agendamentos</h2>
              <a href="/dashboard/calendario" className="text-sm font-medium text-[#635BFF] hover:underline">
                Ver calendário →
              </a>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs flex-shrink-0">
                      {appointment.time.split(':')[0]}:{appointment.time.split(':')[1]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{appointment.patient}</p>
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          {appointment.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.procedure}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-[#635BFF] to-[#00AFE1] rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all hover:-translate-y-1">
              <div className="text-3xl mb-2">📊</div>
              <p className="font-semibold">Ver Relatórios</p>
              <p className="text-sm opacity-90 mt-1">Análises detalhadas</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all hover:-translate-y-1">
              <div className="text-3xl mb-2">🤖</div>
              <p className="font-semibold">Configurar Agente</p>
              <p className="text-sm opacity-90 mt-1">Personalizar IA</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all hover:-translate-y-1">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-semibold">Nova Oferta</p>
              <p className="text-sm opacity-90 mt-1">Criar promoção</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
