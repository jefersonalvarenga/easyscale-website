import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyScale - Automação Inteligente para Clínicas de Estética",
  description: "Cresça sua clínica de estética sem complicação. Automação com IA que converte leads em agendamentos 24/7.",
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
