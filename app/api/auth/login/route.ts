import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Implementar verificação real de credenciais
    // Por enquanto, aceita qualquer email/senha (modo demo)

    // Simula um token JWT (em produção, isso viria do backend)
    const token = 'demo-token-' + Date.now();

    // Cria a resposta
    const response = NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso'
    });

    // Define o cookie com o token
    response.cookies.set('easyscale_token', token, {
      httpOnly: true, // Cookie não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
