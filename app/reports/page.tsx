'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Relatorios() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Relatórios</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-bold text-lg mb-2">Tempo Real</h3>
            <p className="text-sm text-gray-500">Métricas atualizadas em tempo real</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-bold text-lg mb-2">Consolidado Mensal</h3>
            <p className="text-sm text-gray-500">Relatório completo do mês</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-bold text-lg mb-2">Performance de Criativos</h3>
            <p className="text-sm text-gray-500">Score por criativo</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">Vendas</h3>
            <p className="text-sm text-gray-500">Análise de vendas e conversões</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="font-bold text-lg mb-2">Funil de Conversão</h3>
            <p className="text-sm text-gray-500">Etapas do lead ao cliente</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-bold text-lg mb-2">Performance do Agente</h3>
            <p className="text-sm text-gray-500">Métricas da IA</p>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#635BFF]/10 to-[#00AFE1]/10 rounded-xl p-8 border border-[#635BFF]/20">
          <p className="text-center text-gray-600">
            🚧 <strong>Em Desenvolvimento</strong> - Relatórios detalhados serão adicionados em breve
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
