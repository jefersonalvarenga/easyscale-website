"use client";
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: "Sonar®",
      price: "1.499",
      description: "Painel de controle que empodera sua equipe de atendimento",
      popular: false,
      features: [
        "Equipe mantém atendimento",
        "Painel com conversas organizadas",
        "Qualificação automática de leads",
        "IA sugere mensagens perfeitas",
        "Alerta follow-up pendente",
        "Identifica perfil do paciente",
        "Minera pacientes esquecidos",
        "Analytics avançado",
        "Multi-WhatsApp",
      ]
    },
    {
      name: "Copilot®",
      price: "2.999",
      description: "Sua equipe de atendimento + IA trabalhando lado a lado",
      popular: true,
      features: [
        "Tudo do Sonar®, mais:",
        "Equipe atua em conjunto com IA",
        "IA atende sob demanda",
        "Configurável por horário",
        "Configurável por segmento",
        "Roteiro de atendimento autônomo",
        "Permite assumir atendimento",
        "Auto recuperação de leads frios",
        "Qualificação avançada de leads",
      ]
    },
    {
      name: "Autopilot®",
      price: "4.999",
      description: "Atendimento autônomo 24/7 com supervisão humana",
      popular: false,
      features: [
        "Tudo do Copilot®, mais:",
        "IA autônoma atendendo 24/7",
        "Multi-unidades",
        "Mede performance de anúncios",
        "Atendimento hiperpersonalizado",
        "Lead scoring",
      ]
    }
  ];

  return (
    <section id="precos" className="relative py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-backgroundSecondary via-white to-backgroundSecondary opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Preços Transparentes
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Escolha o Nível de Automação
          </h2>
          <p className="text-xl text-textSecondary">
            Dê superpoderes à sua equipe. Do painel inteligente à automação total.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${
                plan.popular
                  ? "border-primary shadow-2xl scale-105 z-10"
                  : "border-border hover:border-primary/30 card-hover"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Mais Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold mb-2 text-textPrimary">
                  {plan.name}
                </h3>
                <p className="text-textSecondary mb-6">{plan.description}</p>
                
                {/* Price */}
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-textSecondary text-2xl">R$</span>
                  <span className="text-6xl font-bold text-textPrimary">{plan.price}</span>
                  <span className="text-textSecondary text-xl">/mês</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-primary" : "text-success"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-textSecondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="https://wa.me/5511982044215" target="_blank">
                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "btn-primary bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-backgroundSecondary text-textPrimary hover:bg-primary hover:text-white border-2 border-border hover:border-primary"
                  }`}
                >
                  {plan.popular ? "Começar Agora" : "Escolher Plano"}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center">
          <p className="text-textSecondary mb-8">Todas as assinaturas incluem:</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-textSecondary">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Garantia 30 dias satisfação</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Suporte via WhatsApp</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>LGPD compliant</span>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 bg-gradient-to-r from-backgroundSecondary to-purple-50 rounded-3xl p-12 text-center border border-border">
          <h3 className="font-display text-3xl font-bold mb-4 text-textPrimary">
            Precisa de algo customizado?
          </h3>
          <p className="text-xl text-textSecondary mb-8 max-w-2xl mx-auto">
            Para redes com múltiplas unidades ou necessidades específicas, criamos um plano sob medida.
          </p>
          <Link href="https://wa.me/5511982044215">
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primaryHover transition-all shadow-lg">
              Falar com Especialista
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
