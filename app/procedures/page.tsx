'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Procedimentos() {
  const procedimentos = [
    { id: 1, nome: 'Harmonização Facial', duracao: '60 min', preco: '1500-2500' },
    { id: 2, nome: 'Botox', duracao: '30 min', preco: '800-1200' },
    { id: 3, nome: 'Preenchimento Labial', duracao: '45 min', preco: '1000-1800' },
    { id: 4, nome: 'Skinbooster', duracao: '40 min', preco: '600-900' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Procedimentos</h1>
          <button className="px-6 py-3 bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white rounded-xl font-medium hover:shadow-lg transition-all">
            + Novo Procedimento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedimentos.map((proc) => (
            <div key={proc.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-3">{proc.nome}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duração:</span>
                  <span className="font-medium">{proc.duracao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Preço:</span>
                  <span className="font-medium">R$ {proc.preco}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
