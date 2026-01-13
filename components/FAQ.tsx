"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Como funciona o período de teste gratuito?",
      answer: "Você tem 14 dias completos para testar todas as funcionalidades do EasyScale sem precisar cadastrar cartão de crédito. Durante esse período, você terá acesso total ao plano Growth para avaliar o impacto na sua clínica. Após o trial, você escolhe o plano que faz sentido para você."
    },
    {
      question: "Preciso ter conhecimento técnico para usar?",
      answer: "Absolutamente não! O EasyScale foi desenhado para ser plug-and-play. Nossa equipe faz toda a integração com seu WhatsApp Business e sistema de agendamento. Você só precisa responder algumas perguntas sobre seus serviços e horários, e em menos de 1 hora Sofia já está atendendo seus leads."
    },
    {
      question: "Como funciona a integração com minha agenda?",
      answer: "Integramos nativamente com os principais sistemas: Google Calendar, Calendly, Agendor, RD Station e outros. Sofia sincroniza automaticamente seus horários disponíveis, evita conflitos e atualiza sua agenda em tempo real quando um paciente agenda. Se você usa um sistema diferente, nossa API permite integração customizada."
    },
    {
      question: "Sofia substitui completamente minha recepcionista?",
      answer: "Não, e nem é esse o objetivo. Sofia cuida de tarefas repetitivas: qualificação inicial de leads, agendamentos simples, lembretes e follow-ups automáticos. Isso libera sua equipe para focar no que realmente importa: atendimento humano de qualidade nos momentos que fazem diferença. Você sempre pode intervir em qualquer conversa."
    },
    {
      question: "E se Sofia não souber responder algo?",
      answer: "Sofia é treinada especificamente para clínicas de estética e sabe quando escalar para um humano. Se um lead fizer uma pergunta complexa ou médica que exija atenção humana, Sofia transfere elegantemente para sua equipe. Você também pode configurar palavras-chave que sempre disparam transferência manual."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim! Não temos contratos de fidelidade ou multas por cancelamento. Você pode cancelar a qualquer momento diretamente no dashboard, e seu serviço continua até o fim do período já pago. Sem surpresas, sem burocracia."
    },
    {
      question: "Como vocês garantem a segurança dos dados dos pacientes?",
      answer: "Levamos segurança muito a sério. Somos totalmente LGPD compliant, usamos criptografia end-to-end em todas as conversas, fazemos backups automáticos diários e nossos servidores estão em data centers certificados no Brasil. Você mantém controle total sobre seus dados e pode exportar ou deletar tudo a qualquer momento."
    },
    {
      question: "Qual o ROI típico para clínicas de estética?",
      answer: "Nossos clientes reportam em média +40% de aumento em agendamentos nos primeiros 30 dias, com redução de 60% em faltas por conta dos lembretes automáticos. Considerando que cada agendamento convertido representa em média R$800-2.000 em receita para clínicas de estética, o ROI costuma ser de 5-10x o investimento mensal."
    }
  ];

  return (
    <section id="faq" className="relative py-32 bg-gradient-to-b from-backgroundSecondary to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Perguntas Frequentes
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Dúvidas?<br />
            <span className="gradient-text">Temos Respostas</span>
          </h2>
          <p className="text-xl text-textSecondary">
            Tudo que você precisa saber sobre o EasyScale
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-border overflow-hidden transition-all"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-backgroundSecondary/50 transition-colors"
              >
                <span className="font-display text-lg font-semibold text-textPrimary pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-8 pb-6 text-textSecondary leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-textSecondary mb-6">Ainda tem dúvidas?</p>
          <button className="btn-primary bg-primary text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/30">
            Falar com Nossa Equipe
          </button>
        </div>
      </div>
    </section>
  );
}
