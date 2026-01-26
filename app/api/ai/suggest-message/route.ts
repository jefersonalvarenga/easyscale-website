import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { leadId, stage, psychologicalProfile, summary, lastMessage } = await request.json();

    // TODO: Implementar chamada real para IA (GPT-4, Claude, etc.)
    // Por enquanto, retorna mensagens mockadas baseadas no estágio do funil

    const suggestions: Record<string, string> = {
      FRIOS: `Olá! Notei que você demonstrou interesse em nossos procedimentos. Gostaria de saber se ainda tem dúvidas ou se posso te ajudar com alguma informação específica? 😊`,
      TOFU: `Oi! Vi que você está procurando informações sobre nossos tratamentos. Que tal agendar uma avaliação gratuita para conversarmos melhor sobre suas necessidades e expectativas? 💆‍♀️`,
      MOFU: `Olá! Percebi seu interesse e gostaria de te oferecer uma condição especial para você dar o primeiro passo. Podemos agendar sua primeira sessão com 20% de desconto? ✨`,
      BOFU: `Oi! Vejo que você está pronto(a) para começar! Temos horários disponíveis para esta semana. Qual dia e horário funcionam melhor para você? Vamos agendar? 📅`
    };

    const suggestion = suggestions[stage as keyof typeof suggestions] ||
      'Olá! Como posso ajudar você hoje? Estou à disposição para esclarecer qualquer dúvida! 😊';

    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      suggestion
    });
  } catch (error) {
    console.error('Erro ao sugerir mensagem:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao gerar sugestão' },
      { status: 500 }
    );
  }
}
