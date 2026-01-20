'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Ofertas() {
  const ofertas = [
    { id: 1, nome: 'Harmonização Facial Completa', valor: 1500, ativa: true, conversoes: 24 },
    { id: 2, nome: 'Botox + Preenchimento Labial', valor: 1200, ativa: true, conversoes: 18 },
    { id: 3, nome: 'Pacote 3 Sessões Skinbooster', valor: 900, ativa: false, conversoes: 12 },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Ofertas</h1>
          <button className="px-6 py-3 bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white rounded-xl font-medium hover:shadow-lg transition-all">
            + Nova Oferta
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Oferta</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Valor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Conversões</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ofertas.map((oferta) => (
                <tr key={oferta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{oferta.nome}</td>
                  <td className="px-6 py-4 text-gray-600">R$ {oferta.valor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      oferta.ativa ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {oferta.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{oferta.conversoes} vendas</td>
                  <td className="px-6 py-4">
                    <button className="text-[#635BFF] hover:underline text-sm font-medium">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
