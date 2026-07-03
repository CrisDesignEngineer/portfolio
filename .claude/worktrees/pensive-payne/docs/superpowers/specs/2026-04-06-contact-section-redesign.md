# Redesign da Seção de Contato (CRIS-8)

## Resumo

Atualizar a seção de contato do portfólio, substituindo os 3 cards atuais (Email, LinkedIn, Telefone) por 3 novos cards de ação (Email, WhatsApp, LinkedIn) com efeito de hover colorido por card.

## Contexto

- **Issue:** [CRIS-8](https://linear.app/keensei/issue/CRIS-8/atualizar-secao-de-contato-no-portfolio)
- **Branch:** `reformulacao-dos-meus-contatos`
- **Componente:** `src/components/Contact.tsx`
- **Traduções:** `src/i18n/locales/pt.json` e `en.json`

## Design

### Título e descrição

| Idioma | Título | Descrição |
|--------|--------|-----------|
| PT | Vamos construir algo juntos? | Estou sempre aberto a conversar sobre novos projetos, ideias criativas ou oportunidades de colaboração. Entre em contato! |
| EN | Let's build something together? | I'm always open to talk about new projects, creative ideas, or collaboration opportunities. Get in touch! |

### Estrutura de cada card

```
┌─────────────────────────────────┐
│  [ícone]                    →   │
│                                 │
│  Label (bold)                   │
│  Subtítulo (muted)              │
└─────────────────────────────────┘
```

- Fundo escuro (`bg-bg-card`) com borda (`border-border`)
- Bordas arredondadas (`rounded-2xl`)
- Seta `→` no canto superior direito — usar `ArrowRight` do `lucide-react` (já usado no projeto)
- Efeito hover: glow/gradiente sutil na lateral esquerda do card

### Cards

| Card | Ícone | Label (PT/EN) | Subtítulo | Href | Abre em | Cor hover |
|------|-------|---------------|-----------|------|---------|-----------|
| Email | `Mail` (lucide-react) | E-mail | design.cristianocarvalho@gmail.com | mesma aba | Roxo/violeta |
| WhatsApp | SVG inline (logo WhatsApp) | WhatsApp | Chat rápido / Quick chat | nova aba | Verde (#25D366) |
| LinkedIn | `Linkedin` (lucide-react) | LinkedIn | /design-cristiano-carvalho | nova aba | Azul (#0A66C2) |

**Ícones:** Usar `lucide-react` (já instalado) para Mail, Linkedin e ArrowRight. Para WhatsApp, usar SVG inline pois lucide não tem ícone de WhatsApp.

**Links externos:** WhatsApp e LinkedIn abrem em nova aba (`target="_blank" rel="noopener noreferrer"`). Email abre cliente de email na mesma aba.

### Efeito hover

Implementação via pseudo-elemento `::before` (classe Tailwind `before:`) com gradiente radial posicionado na lateral esquerda do card. Transição suave com `opacity-0 → opacity-100` no hover. Cores específicas por card usando valores arbitrários do Tailwind (`bg-[#color]`):

- **Email:** gradiente roxo/violeta (`#8B5CF6`)
- **WhatsApp:** gradiente verde (`#25D366`)
- **LinkedIn:** gradiente azul (`#0A66C2`)

### Responsividade

- **Desktop (sm+):** 3 cards lado a lado (`grid-cols-3`)
- **Mobile:** cards empilhados verticalmente (`grid-cols-1`)

## Mudanças nos arquivos

### `src/components/Contact.tsx`
- Atualizar array `contacts` com novos dados (WhatsApp no lugar de Phone)
- Atualizar estrutura JSX dos cards (ícone, label, subtítulo, seta)
- Adicionar efeito de hover com gradiente colorido por card via pseudo-elemento
- Ícones: `Mail`, `Linkedin`, `ArrowRight` do lucide-react + SVG inline para WhatsApp
- Manter `FadeIn` com delays staggered existentes (`delay={i * 0.08}`)
- Manter `contact.label` ("Contato"/"Contact") como label da seção

### `src/i18n/locales/pt.json`
- Atualizar `contact.title` → "Vamos construir algo juntos?"
- Atualizar `contact.description` → novo texto
- Remover `contact.phone`
- Adicionar `contact.whatsapp` ("WhatsApp"), `contact.whatsappSub` ("Chat rápido")
- Adicionar `contact.linkedinSub` ("/design-cristiano-carvalho")

### `src/i18n/locales/en.json`
- Equivalentes em inglês (whatsappSub → "Quick chat", etc.)

### `src/components/__tests__/Contact.test.tsx` (novo)
- Renderização dos 3 cards
- Valores corretos de href
- Atributos de link externo em WhatsApp e LinkedIn
- Tradução em ambos os idiomas

## Acessibilidade

- Cards são `<a>` (links), não `<button>`
- Links externos com `target="_blank" rel="noopener noreferrer"`
- `aria-label` descritivo em cada link para screen readers

## Critérios de aceite

- [ ] Três cards de contato lado a lado (e-mail, WhatsApp, LinkedIn)
- [ ] Cada card com ícone, label, subtítulo e seta
- [ ] Efeito hover com cor distinta por card (roxo, verde, azul)
- [ ] Botão de e-mail funciona via mailto
- [ ] Botão de WhatsApp abre com número correto
- [ ] LinkedIn abre o perfil correto
- [ ] Layout responsivo (3 colunas desktop, empilhado mobile)
- [ ] Textos traduzíveis PT/EN
- [ ] Links externos abrem em nova aba
- [ ] Links acessíveis com aria-labels
- [ ] Testes unitários passando
