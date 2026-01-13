# 🚀 EASYSCALE - INÍCIO RÁPIDO

## O que você tem aqui:

Um site completo e profissional para EasyScale, focado em clínicas de estética, com design inspirado em Linear + Stripe.

## ✨ Características:

### Design
- ✅ Paleta moderna: Blurple (#635BFF) + Ciano (#00AFE1) + Verde ROI (#10B981)
- ✅ Tipografia: Space Grotesk (headlines) + Inter (body)
- ✅ Layout assimétrico e sofisticado
- ✅ Animações CSS suaves e profissionais
- ✅ Mockup WhatsApp interativo no Hero
- ✅ Totalmente responsivo (mobile-first)

### Seções Incluídas
1. **Hero** - Headline impactante com mockup WhatsApp mostrando Sofia
2. **How It Works** - 3 passos simples
3. **Features** - 6 benefícios principais com stats
4. **Pricing** - 3 planos (R$297, R$697, R$1.297)
5. **FAQ** - 8 perguntas frequentes
6. **Footer** - Links + CTA final

### Tech Stack
- Next.js 14 (React)
- Tailwind CSS
- TypeScript
- Framer Motion

## 🏃 Como rodar:

### Opção 1: Rodar localmente

```bash
cd easyscale-website
npm install
npm run dev
```

Acesse: http://localhost:3000

### Opção 2: Deploy no EasyPanel

1. Faça push para GitHub/GitLab
2. No EasyPanel:
   - New App → Import Git Repository
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Port: 3000
3. Configure domínio: easyscale.co

## 🎨 Customizar:

### Mudar cores:
Edite `tailwind.config.ts`

### Mudar conteúdo:
Cada seção está em um componente separado em `/components/`

### Adicionar subdomínios (clinicas, beleza, odonto):
O código já está preparado. Veja README.md para instruções completas.

## 📂 Estrutura:

```
easyscale-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── package.json
└── README.md (instruções completas)
```

## 🎯 Próximos Passos Sugeridos:

1. ✅ Testar localmente
2. ⚙️ Ajustar textos/CTAs específicos
3. 🖼️ Adicionar logos de clientes (quando tiver)
4. 🚀 Deploy no EasyPanel
5. 🌐 Configurar DNS (easyscale.co)
6. 📊 Adicionar Google Analytics
7. 🔗 Criar subdomínios para outros nichos

## 💡 Dicas:

- O design evita clichês AI (purple gradients genéricos)
- Usa Space Grotesk ao invés de Inter para headlines (mais personalidade)
- Layout assimétrico com overlaps (não tudo centralizado)
- Animações sutis mas impactantes
- Foco em conversão: CTAs claros, social proof, números reais

## 🤔 Dúvidas?

Leia o README.md completo para documentação detalhada sobre:
- Deploy no EasyPanel
- Sistema de multi-tenant (subdomínios)
- Customização avançada
- Otimizações de performance

---

**Pronto para impressionar!** 🎨✨
