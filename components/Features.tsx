"use client";

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Atendimento 24/7",
      description: "Sofia responde leads instantaneamente, mesmo de madrugada. Nenhum paciente fica sem resposta.",
      stat: "< 30s",
      statLabel: "Tempo de resposta"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Agendamento Inteligente",
      description: "Sincroniza com sua agenda, sugere horários ideais e confirma automaticamente. Zero conflitos.",
      stat: "100%",
      statLabel: "Taxa de confirmação"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Qualificação Automática",
      description: "Identifica leads quentes, coleta informações importantes e prioriza pacientes com alta intenção.",
      stat: "3x",
      statLabel: "Mais conversões"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Follow-up Automático",
      description: "Lembretes pré-consulta, confirmações e reengajamento de leads. Cuide de cada paciente sem esforço.",
      stat: "-60%",
      statLabel: "Faltas em consultas"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Analytics em Tempo Real",
      description: "Dashboard com métricas de conversão, horários de pico e performance de campanhas. Decisões baseadas em dados.",
      stat: "15+",
      statLabel: "Métricas rastreadas"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguro e Confiável",
      description: "LGPD compliant, criptografia end-to-end e backups automáticos. Seus dados sempre protegidos.",
      stat: "99.9%",
      statLabel: "Uptime garantido"
    }
  ];

  return (
    <section id="beneficios" className="relative py-32 bg-gradient-to-b from-white via-backgroundSecondary to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-success/10 text-success px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Tudo Que Você Precisa
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Feito Para <span className="gradient-text">Clínicas de Estética</span>
          </h2>
          <p className="text-xl text-textSecondary">
            Cada funcionalidade foi pensada para maximizar suas conversões e otimizar seu tempo.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-border card-hover"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3 text-textPrimary">
                {feature.title}
              </h3>
              <p className="text-textSecondary mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-success">{feature.stat}</span>
                  <span className="text-sm text-textSecondary">{feature.statLabel}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section with Large Stat */}
        <div className="mt-20 bg-gradient-to-br from-primary to-primaryHover rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="text-6xl md:text-7xl font-bold mb-4">+40%</div>
            <div className="text-2xl md:text-3xl font-semibold mb-4">
              Aumento médio em agendamentos
            </div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Clínicas que usam EasyScale veem crescimento significativo em 30 dias
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-backgroundSecondary transition-all shadow-xl">
              Ver Caso de Sucesso
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
