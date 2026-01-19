'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Calculadora() {
  const [formData, setFormData] = useState({
    adsInvestment: '',
    cpl: '',
    conversionRate: '',
    noShowRate: '',
    averageTicket: ''
  });

  const [results, setResults] = useState<any>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const adsInvestment = parseFloat(formData.adsInvestment);
    const cpl = parseFloat(formData.cpl);
    const conversionRate = parseFloat(formData.conversionRate) / 100;
    const noShowRate = parseFloat(formData.noShowRate) / 100;
    const averageTicket = parseFloat(formData.averageTicket);

    // Calculate current situation
    const currentLeads = adsInvestment / cpl;
    const currentAppointments = currentLeads * conversionRate;
    const currentPatients = currentAppointments * (1 - noShowRate);
    const currentRevenue = currentPatients * averageTicket;
    const currentROI = ((currentRevenue - adsInvestment) / adsInvestment) * 100;

    // Calculate projected situation with EasyScale
    const projectedConversionRate = Math.min(conversionRate * 3.3, 0.95);
    const projectedNoShowRate = Math.max(noShowRate * 0.20, 0.05);

    const projectedLeads = currentLeads;
    const projectedAppointments = projectedLeads * projectedConversionRate;
    const projectedPatients = projectedAppointments * (1 - projectedNoShowRate);
    const projectedAverageTicket = averageTicket * 1.10;
    const projectedRevenue = projectedPatients * projectedAverageTicket;
    const projectedROI = ((projectedRevenue - adsInvestment) / adsInvestment) * 100;

    const additionalRevenue = projectedRevenue - currentRevenue;

    // Calculate feature breakdown
    const featureImpacts = [0.45, 0.20, 0.15, 0.10, 0.10];
    const features = featureImpacts.map(impact => ({
      gain: additionalRevenue * impact
    }));

    setResults({
      current: {
        leads: currentLeads,
        appointments: currentAppointments,
        patients: currentPatients,
        revenue: currentRevenue,
        roi: currentROI
      },
      projected: {
        leads: projectedLeads,
        appointments: projectedAppointments,
        patients: projectedPatients,
        revenue: projectedRevenue,
        roi: projectedROI
      },
      additionalRevenue,
      features
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#635BFF]">
            EasyScale
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 bg-[#F6F9FC] text-[#0A2540] rounded-lg font-medium hover:bg-[#635BFF] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#635BFF]/5 to-[#00AFE1]/5 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Calculadora de <span className="bg-gradient-to-r from-[#635BFF] to-[#00AFE1] bg-clip-text text-transparent">ROI</span>
          </h1>
          <p className="text-xl text-[#64748B]">
            Descubra o potencial real da sua clínica com a metodologia EasyScale 3x
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {/* Input Card */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8 pb-5 border-b-2 border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#635BFF]/10 to-[#635BFF]/20 flex items-center justify-center text-2xl">
                  📊
                </div>
                <h2 className="text-2xl font-bold text-[#0A2540]">Dados Atuais da Clínica</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="adsInvestment" className="block text-sm font-semibold text-[#0A2540] mb-2">
                    Investimento Mensal em Anúncios
                    <span className="ml-1 text-[#64748B] cursor-help" title="Quanto você gasta mensalmente em Google Ads, Facebook Ads, etc.">ℹ️</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                    <input
                      type="number"
                      id="adsInvestment"
                      value={formData.adsInvestment}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#F6F9FC] border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-4 focus:ring-[#635BFF]/10 transition-all"
                      placeholder="10000"
                      required
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cpl" className="block text-sm font-semibold text-[#0A2540] mb-2">
                    CPL - Custo por Lead
                    <span className="ml-1 text-[#64748B] cursor-help" title="Quanto você paga em média por cada lead gerado">ℹ️</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                    <input
                      type="number"
                      id="cpl"
                      value={formData.cpl}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#F6F9FC] border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-4 focus:ring-[#635BFF]/10 transition-all"
                      placeholder="50"
                      required
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="conversionRate" className="block text-sm font-semibold text-[#0A2540] mb-2">
                    Taxa de Conversão Atual
                    <span className="ml-1 text-[#64748B] cursor-help" title="% de leads que se convertem em agendamentos">ℹ️</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="conversionRate"
                      value={formData.conversionRate}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3.5 bg-[#F6F9FC] border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-4 focus:ring-[#635BFF]/10 transition-all"
                      placeholder="20"
                      required
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="noShowRate" className="block text-sm font-semibold text-[#0A2540] mb-2">
                    Taxa de No-Show Atual
                    <span className="ml-1 text-[#64748B] cursor-help" title="% de pacientes que não comparecem às consultas agendadas">ℹ️</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="noShowRate"
                      value={formData.noShowRate}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3.5 bg-[#F6F9FC] border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-4 focus:ring-[#635BFF]/10 transition-all"
                      placeholder="30"
                      required
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="averageTicket" className="block text-sm font-semibold text-[#0A2540] mb-2">
                    Ticket Médio por Paciente
                    <span className="ml-1 text-[#64748B] cursor-help" title="Valor médio que cada paciente gasta na primeira consulta">ℹ️</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                    <input
                      type="number"
                      id="averageTicket"
                      value={formData.averageTicket}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#F6F9FC] border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-4 focus:ring-[#635BFF]/10 transition-all"
                      placeholder="500"
                      required
                      min="0"
                      step="10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#635BFF] to-[#5046E5] text-white rounded-xl text-base font-semibold hover:-translate-y-1 hover:shadow-xl hover:shadow-[#635BFF]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Calcular Resultado 🚀</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </form>
            </div>

            {/* Results Card */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8 pb-5 border-b-2 border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/20 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h2 className="text-2xl font-bold text-[#0A2540]">Projeção com EasyScale</h2>
              </div>

              {!results ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-lg font-semibold mb-2">Preencha os dados</h3>
                  <p className="text-sm text-[#64748B]">Insira as informações da sua clínica para ver a projeção de resultados</p>
                </div>
              ) : (
                <div className="space-y-6 animate-slideUp">
                  {/* Results Table */}
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-[#635BFF]/8 to-[#00AFE1]/8">
                        <tr>
                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">Indicador</th>
                          <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">Manual</th>
                          <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">EasyScale</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="hover:bg-[#F6F9FC] transition-colors">
                          <td className="px-5 py-5 border-b border-gray-200 font-semibold text-[#0A2540]">Leads Mensais</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#EF4444]">{formatNumber(results.current.leads)}</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#10B981]">{formatNumber(results.projected.leads)}</td>
                        </tr>
                        <tr className="hover:bg-[#F6F9FC] transition-colors">
                          <td className="px-5 py-5 border-b border-gray-200 font-semibold text-[#0A2540]">Agendamentos</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#EF4444]">{formatNumber(results.current.appointments)}</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#10B981]">{formatNumber(results.projected.appointments)}</td>
                        </tr>
                        <tr className="hover:bg-[#F6F9FC] transition-colors">
                          <td className="px-5 py-5 border-b border-gray-200 font-semibold text-[#0A2540]">Pacientes Atendidos</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#EF4444]">{formatNumber(results.current.patients)}</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#10B981]">{formatNumber(results.projected.patients)}</td>
                        </tr>
                        <tr className="hover:bg-[#F6F9FC] transition-colors">
                          <td className="px-5 py-5 border-b border-gray-200 font-semibold text-[#0A2540]">ROI Mensal</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#EF4444]">{results.current.roi.toFixed(0)}%</td>
                          <td className="px-5 py-5 border-b border-gray-200 text-center font-bold text-lg text-[#10B981]">{results.projected.roi.toFixed(0)}%</td>
                        </tr>
                        <tr className="bg-gradient-to-r from-[#635BFF]/3 to-[#00AFE1]/3 hover:from-[#635BFF]/5 hover:to-[#00AFE1]/5 transition-colors">
                          <td className="px-5 py-6 font-semibold text-base text-[#0A2540]">Faturamento Mensal</td>
                          <td className="px-5 py-6 text-center font-bold text-2xl text-[#EF4444]">{formatCurrency(results.current.revenue)}</td>
                          <td className="px-5 py-6 text-center font-bold text-2xl text-[#10B981]">{formatCurrency(results.projected.revenue)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Impact Banner */}
                  <div className="bg-gradient-to-r from-[#635BFF] to-[#00AFE1] text-white rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">Ganho Adicional Mensal</h3>
                    <div className="text-5xl font-bold my-4">{formatCurrency(results.additionalRevenue)}</div>
                    <div className="text-base opacity-90">Com a metodologia EasyScale 3x</div>
                  </div>

                  {/* Features Table */}
                  <div className="bg-[#F6F9FC] rounded-2xl p-10 border border-gray-200">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-[#0A2540]">Impacto de cada funcionalidade EasyScale®</h3>
                      <p className="text-sm text-[#64748B]">Otimização no Faturamento</p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                      <table className="w-full bg-white">
                        <thead className="bg-gradient-to-r from-[#635BFF]/8 to-[#00AFE1]/8">
                          <tr>
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">Funcionalidade</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">Impacto</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">R$ do Ganho</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#0A2540] border-b-2 border-gray-200">Benefício Principal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Atendimento imediato 24/7', impact: '45%', benefit: 'Maior driver de conversão' },
                            { name: 'Confirmação e lembrete', impact: '20%', benefit: 'Reduz no-show 30% → 12%' },
                            { name: 'Reaquecimento 24h/48h/72h', impact: '15%', benefit: 'Recupera 15-20% dos frios' },
                            { name: 'Pagamento antecipado', impact: '10%', benefit: 'Reduz no-show 12% → 6%' },
                            { name: 'Upsell complementares', impact: '10%', benefit: 'Aumenta ticket ~10%' }
                          ].map((feature, index) => (
                            <tr key={index} className="hover:bg-[#F6F9FC] transition-colors">
                              <td className="px-5 py-5 border-b border-gray-200 font-semibold text-[#0A2540]">{feature.name}</td>
                              <td className="px-5 py-5 border-b border-gray-200 font-bold text-lg text-[#635BFF]">{feature.impact}</td>
                              <td className="px-5 py-5 border-b border-gray-200 font-bold text-base text-[#10B981]">{formatCurrency(results.features[index].gain)}</td>
                              <td className="px-5 py-5 border-b border-gray-200 text-sm text-[#64748B]">{feature.benefit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-5 bg-gradient-to-r from-[#635BFF]/5 to-[#00AFE1]/5 rounded-lg text-xs text-[#64748B] leading-relaxed space-y-2">
                      <p><strong>*</strong> Estimativa com base em resultados de mercado para o setor de clínicas de estética no Brasil em 2025, com uso de inteligência artificial no atendimento via Whatsapp.</p>
                      <p>O valor de conversão varia conforme a qualidade das campanhas de marketing digital (tráfego pago) nas redes sociais de de pesquisa.</p>
                      <p>A clínica pode ativar essas funcionalidades gradualmente, conforme maturidade da operação.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease;
        }
      `}</style>
    </main>
  );
}
