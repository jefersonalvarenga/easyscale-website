# EasyScale Website

Site institucional moderno para EasyScale - Automação Inteligente para Clínicas de Estética.

## 🎨 Design System

Inspirado em Linear + Stripe, com elementos únicos:

### Cores
- **Primary**: #635BFF (Blurple do Stripe)
- **Accent**: #00AFE1 (Ciano tech)
- **Success**: #10B981 (Verde para ROI/métricas)
- **Background**: #FFFFFF com gradientes sutis
- **Text**: #0A2540 (Stripe's Downriver)

### Tipografia
- **Display**: Space Grotesk (headlines)
- **Body**: Inter (texto corrido)

### Características
- Layout assimétrico com overlaps
- Animações CSS staggered
- Gradientes complexos com noise
- Glassmorphism em cards
- Micro-interações sofisticadas

## 🚀 Como Rodar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 📦 Deploy no EasyPanel

1. **Conecte seu repositório Git**
   - Faça push do código para GitHub/GitLab
   - No EasyPanel, crie nova aplicação
   - Conecte ao repositório

2. **Configure o build**
   ```
   Build Command: npm run build
   Start Command: npm start
   Port: 3000
   ```

3. **Variáveis de ambiente** (se necessário)
   ```
   NODE_ENV=production
   ```

4. **Deploy**
   - EasyPanel detecta automaticamente Next.js
   - Build e deploy acontecem automaticamente
   - Acesse via domínio configurado (easyscale.co)

## 🏗️ Estrutura do Projeto

```
easyscale-website/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Home page
│   └── globals.css      # Estilos globais
├── components/
│   ├── Navbar.tsx       # Navegação principal
│   ├── Hero.tsx         # Seção hero com mockup WhatsApp
│   ├── HowItWorks.tsx   # Como funciona (3 steps)
│   ├── Features.tsx     # Benefícios/features
│   ├── Pricing.tsx      # Planos e preços
│   ├── FAQ.tsx          # Perguntas frequentes
│   └── Footer.tsx       # Rodapé
└── ...config files
```

## 🎯 Seções do Site

1. **Hero**: Headline impactante + mockup WhatsApp + stats
2. **How It Works**: 3 passos para começar
3. **Features**: 6 benefícios principais com métricas
4. **Pricing**: 3 planos (Starter, Growth, Scale)
5. **FAQ**: 8 perguntas frequentes
6. **Footer**: Links + CTA final

## 🎨 Customização

### Cores
Edite `tailwind.config.ts`:
```typescript
colors: {
  primary: "#635BFF",
  accent: "#00AFE1",
  // ...
}
```

### Conteúdo
Cada componente em `/components/` pode ser editado independentemente.

### Multi-tenant (subdomínios)
Para adicionar subdomínios por nicho:

1. Detecte hostname no layout
2. Carregue conteúdo específico por nicho
3. Configure DNS no EasyPanel

Exemplo:
```typescript
// app/layout.tsx
const hostname = headers().get('host');
const niche = hostname?.split('.')[0]; // clinicas, beleza, odonto
```

## 🔧 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + CSS
- **Icons**: Heroicons (inline SVG)
- **Fonts**: Google Fonts (Space Grotesk + Inter)

## 📱 Responsivo

Design totalmente responsivo:
- Mobile: 390px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1440px+

## ⚡ Performance

- Otimização automática Next.js
- Lazy loading de imagens
- Code splitting
- CSS-in-JS otimizado

## 📝 Próximos Passos

1. Adicionar analytics (Google Analytics / Posthog)
2. Integrar formulários com backend
3. Adicionar mais casos de uso específicos
4. Criar subdomínios para outros nichos
5. Adicionar blog (MDX)

## 🤝 Suporte

Dúvidas? Sugestões? Entre em contato!
