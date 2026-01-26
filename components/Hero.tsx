"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-bg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-backgroundSecondary via-white to-purple-50 opacity-60"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/20 to-success/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-18 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-4 rounded-full text-sm font-semibold stagger-1 animate-slide-up">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>IA-Powered Automation</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight stagger-2 animate-slide-up">
            A única IA especialista em estéticas {" "}
            <span className="gradient-text"> que converte até 4x mais.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-textSecondary leading-relaxed stagger-3 animate-slide-up">
            IA que vende e agenda por você, 24 horas por dia
            e libera até 40% do trabalho repetitivo da sua recepção.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 pt-4 stagger-4 animate-slide-up">
            <div>
              <div className="text-4xl font-bold text-success">+40%</div>
              <div className="text-textSecondary">Agendamentos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success">24/7</div>
              <div className="text-textSecondary">Atendimento</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success">4x</div>
              <div className="text-textSecondary">Mais Conversões</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 stagger-5 animate-slide-up">
            <button className="btn-primary bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-primary/30">
              Começar Grátis por 14 Dias
            </button>
            <button className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/5 transition-all">
              Ver Demo ao Vivo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-3 text-sm text-textSecondary stagger-6 animate-fade-in">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Sem cartão de crédito</span>
            <span>•</span>
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Cancele quando quiser</span>
          </div>
        </div>

        {/* Right Column - Visual/Mockup */}
        <div className="relative stagger-3 animate-scale-in">
          {/* WhatsApp Chat Mockup */}
          <div className="relative">
            {/* Decorative Background Element */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl"></div>
            
            {/* Main Chat Interface */}
            <div className="relative glass rounded-3xl shadow-2xl overflow-hidden border border-border">
              {/* WhatsApp Header */}
              <div className="bg-gradient-to-r from-primary to-primaryHover text-white p-4 flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <div className="font-semibold">Sofia - Atendimento IA</div>
                  <div className="text-xs text-white/80">online</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 bg-gradient-to-b from-white to-backgroundSecondary min-h-[400px]">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-primary/10 text-textPrimary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">Olá, gostaria de mais informações sobre o Fotona</p>
                    <p className="text-xs text-textSecondary mt-1">14:32</p>
                  </div>
                </div>

                {/* Bot Response */}
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                    <p className="text-sm">Olá Mariana! 👋 Será um prazer te atender! Gostaria de ver fotos dos resultados?</p>
                    <p className="text-xs text-textSecondary mt-1">14:32</p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-primary/10 text-textPrimary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">Quinta-feira de tarde?</p>
                    <p className="text-xs text-textSecondary mt-1">14:33</p>
                  </div>
                </div>

                {/* Bot Response with buttons */}
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                    <p className="text-sm mb-3">Perfeito! ✨ Tenho 3 horários quinta:</p>
                    <div className="space-y-2">
                      <button className="w-full bg-primary/5 hover:bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left">
                        14:00 - Dra. Ana Silva
                      </button>
                      <button className="w-full bg-primary/5 hover:bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left">
                        15:30 - Dr. Carlos Souza
                      </button>
                      <button className="w-full bg-primary/5 hover:bg-primary/10 text-primary rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left">
                        17:00 - Dra. Marina Costa
                      </button>
                    </div>
                    <p className="text-xs text-textSecondary mt-2">14:33</p>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-textSecondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">+40%</div>
                  <div className="text-xs text-textSecondary">Conversões</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
