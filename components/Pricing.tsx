"use client";

export default function Pricing() {
  const plans = [
    {
      name: "Growth",
      price: "1297",
      description: "Perfeito para começar",
      popular: false,
      features: [
        "Até 500 conversas/mês",
        "Agendamento automático",
        "WhatsApp Business",
        "Dashboard básico",
        "Suporte por email",
      ]
    },
    {
      name: "Scale",
      price: "2497",
      description: "Para clínicas em crescimento",
      popular: true,
      features: [
        "Até 2.000 conversas/mês",
        "Tudo do Starter, mais:",
        "Qualificação de leads",
        "Follow-up automático",
        "Analytics avançado",
        "Integração com CRM",
        "Suporte prioritário",
      ]
    },
    {
      name: "Performance",
      price: "4.997",
      description: "Para operações grandes",
      popular: false,
      features: [
        "Conversas ilimitadas",
        "Tudo do Growth, mais:",
        "Multi-unidades",
        "API personalizada",
        "Treinamento dedicado",
        "Account manager",
        "SLA garantido",
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
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-textSecondary">
            Comece grátis por 14 dias. Sem cartão de crédito. Cancele quando quiser.
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
              <button
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "btn-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-backgroundSecondary text-textPrimary hover:bg-primary hover:text-white border-2 border-border hover:border-primary"
                }`}
              >
                {plan.popular ? "Começar Agora" : "Escolher Plano"}
              </button>
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
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Sem contrato</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Suporte em português</span>
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
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primaryHover transition-all shadow-lg">
            Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  );
}
