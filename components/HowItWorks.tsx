"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Conecte em minutos",
      description: "Integramos com seu WhatsApp Business e sistema de agendamento. Zero configuração técnica necessária.",
      icon: "🔌",
      color: "from-primary to-accent"
    },
    {
      number: "02",
      title: "Sofia aprende seu negócio",
      description: "Nossa IA entende seus serviços, horários e estilo de atendimento. Personalização automática.",
      icon: "🧠",
      color: "from-accent to-success"
    },
    {
      number: "03",
      title: "Crescimento no piloto automático",
      description: "Leads qualificados, agendamentos confirmados e follow-ups automáticos. Você foca no atendimento.",
      icon: "🚀",
      color: "from-success to-primary"
    }
  ];

  return (
    <section id="como-funciona" className="relative py-32 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Simples e Poderoso
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Como Funciona
          </h2>
          <p className="text-xl text-textSecondary">
            Da integração ao crescimento em 3 passos simples. Sem complicação, sem código.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connecting Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[calc(100%-2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-gradient-to-br from-backgroundSecondary to-white rounded-3xl p-8 card-hover border border-border h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold mb-4 text-textPrimary">
                  {step.title}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="btn-primary bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-primary/30">
            Começar Agora
          </button>
        </div>
      </div>
    </section>
  );
}
