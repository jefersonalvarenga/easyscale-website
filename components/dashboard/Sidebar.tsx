'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
  admin?: boolean;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    section: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: '📊' },
      { name: 'Looker', href: '/looker', icon: '👁️' },
      { name: 'Chats', href: '/chats', icon: '💬', badge: '3' },
      { name: 'CRM / Leads', href: '/crm', icon: '👥' },
      { name: 'Calendário', href: '/calendar', icon: '📅' },
    ]
  },
  {
    section: 'Gestão',
    items: [
      { name: 'Ofertas', href: '/offers', icon: '🎁' },
      { name: 'Procedimentos', href: '/procedures', icon: '💉' },
      { name: 'Relatórios', href: '/reports', icon: '📈' },
      { name: 'Financeiro', href: '/finance', icon: '💰' },
    ]
  },
  {
    section: 'Configurações',
    items: [
      { name: 'Agente IA', href: '/settings/agent', icon: '🤖' },
      { name: 'Base de Conhecimento', href: '/settings/knowledge', icon: '📚' },
      { name: 'Integrações', href: '/integrations', icon: '🔗' },
      { name: 'Equipe', href: '/team', icon: '👨‍💼' },
    ]
  },
  {
    section: 'Sistema',
    items: [
      { name: 'Logs', href: '/logs', icon: '📋', admin: true },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#635BFF] to-[#00AFE1] bg-clip-text text-transparent">
            EasyScale
          </span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Clínica Beleza Total</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive
                          ? 'bg-gradient-to-r from-[#635BFF]/10 to-[#00AFE1]/10 text-[#635BFF] border-l-2 border-[#635BFF]'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                        ${item.admin ? 'opacity-50' : ''}
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#635BFF] to-[#00AFE1] flex items-center justify-center text-white font-bold">
            JF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Jeferson</p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <span className="text-lg">🚪</span>
          <span>{loggingOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}
