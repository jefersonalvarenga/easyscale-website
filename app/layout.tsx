import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyScale - Automação Inteligente para Clínicas de Estética",
  description: "Cresça sua clínica de estética sem complicação. Automação com IA que converte leads em agendamentos 24/7.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#635BFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
