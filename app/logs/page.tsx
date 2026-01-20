'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Logs() {
  const logs = [
    { id: 1, evento: 'Mensagem enviada', user: 'Agente IA', timestamp: '2025-01-19 14:32:45', detalhes: 'Chat com Maria Silva' },
    { id: 2, evento: 'Lead criado', user: 'Sistema', timestamp: '2025-01-19 14:28:12', detalhes: 'Origem: Instagram' },
    { id: 3, evento: 'Oferta atualizada', user: 'admin@easyscale.com', timestamp: '2025-01-19 13:15:30', detalhes: 'Harmonização Facial' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-yellow-900">Área Restrita - Colaboradores EasyScale</p>
            <p className="text-sm text-yellow-800">Apenas funcionários autorizados da EasyScale podem acessar os logs do sistema</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Logs do Sistema</h1>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full font-mono text-sm">
            <thead className="bg-gray-900 text-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Evento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Usuário</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{log.timestamp}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{log.evento}</td>
                  <td className="px-6 py-4 text-gray-600">{log.user}</td>
                  <td className="px-6 py-4 text-gray-600">{log.detalhes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
