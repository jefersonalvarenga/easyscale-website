import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas públicas que não requerem autenticação
const publicRoutes = ['/', '/calculadora', '/login'];

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/chats',
  '/crm',
  '/calendar',
  '/offers',
  '/procedures',
  '/reports',
  '/finance',
  '/settings',
  '/integrations',
  '/team',
  '/logs'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se a rota é protegida
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Se não for rota protegida, permite o acesso
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Verifica autenticação (por enquanto, apenas verifica se tem o cookie)
  // TODO: Implementar verificação real de token JWT quando backend estiver pronto
  const token = request.cookies.get('easyscale_token');

  // Se não estiver autenticado, redireciona para login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se estiver autenticado, permite o acesso
  return NextResponse.next();
}

// Configura em quais rotas o middleware deve executar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
