# Design System Showcase Page

**Data**: 2026-04-02
**Escopo**: Pagina `/design-system` no portfolio, showcase profissional com preview visual de todos os elementos do design system.

## Visao Geral

Pagina unica com scroll vertical e sidebar fixa, acessivel apenas por link direto (`/design-system`). Nao aparece no menu de navegacao. Conteudo em ingles. Foco em preview visual sem code snippets.

## Layout

### Desktop (lg+)
- **Sidebar fixa** a esquerda (~200px): logo/titulo + links de ancora para cada secao
- **Conteudo principal** scrollavel a direita: secoes empilhadas com dividers
- Sidebar acompanha o scroll com highlight na secao ativa (scroll spy)

### Tablet (md)
- Sidebar colapsa para nav horizontal fixa no topo com links de ancora
- Conteudo full-width abaixo

### Mobile
- Mesmo que tablet: nav horizontal fixa no topo
- Conteudo full-width, secoes empilhadas

### Container
- Max-width: 1120px com padding consistente (px-6 sm:px-10)
- Mesmo dark theme do portfolio (bg-primary, text-primary)

## Secoes

### 1. Hero/Header
- Titulo: "Design System"
- Subtitulo: "The visual language, tokens, and components behind this portfolio."
- Sem CTA, sem botoes

### 2. Colors
Grid de color swatches organizados em grupos:

**Backgrounds**:
| Token | Value | Uso |
|-------|-------|-----|
| --bg-primary | #050507 | Page background |
| --bg-secondary | #0a0a0f | Section backgrounds |
| --bg-card | #0d0d12 | Card surfaces |
| --bg-card-hover | #12121a | Card hover state |

**Text**:
| Token | Value | Uso |
|-------|-------|-----|
| --text-primary | #f5f5f7 | Headings, body text |
| --text-secondary | #b8b8c8 | Secondary text |
| --text-muted | #5a5a6e | Captions, muted text |

**Accents**:
| Token | Value | Uso |
|-------|-------|-----|
| --accent | #bf5af2 | Primary accent (purple) |
| --accent-hover | #d27af5 | Accent hover state |
| --accent-2 | #ff2d55 | Pink |
| --accent-3 | #5e5ce6 | Indigo |
| --accent-4 | #30d158 | Green |
| --accent-5 | #f9ab00 | Yellow |

**Borders**:
| Token | Value | Uso |
|-------|-------|-----|
| --border | rgba(255,255,255,0.08) | Default borders |
| --border-hover | rgba(255,255,255,0.15) | Hover borders |

Cada swatch: retangulo com a cor + nome do token + hex value abaixo.

### 3. Typography
Showcase da fonte **Geist Sans** e **Geist Mono**.

Exemplos renderizados:
- **H1**: `font-extrabold text-4xl sm:text-5xl tracking-[-0.02em]` — "From Figma to code"
- **H2**: `font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em]` — "Selected projects"
- **Section label**: `text-[13px] font-mono font-medium tracking-[0.15em] uppercase` — "CASES"
- **Body**: `text-base text-text-primary` — paragrafo de exemplo
- **Secondary**: `text-sm text-text-secondary` — texto secundario
- **Mono**: `font-mono text-xs` — "font-geist-mono"

Cada exemplo mostra: texto renderizado + descricao de tamanho/peso.

**Gradient text**: exemplo de `.gradient-text` aplicado.

### 4. Spacing
Escala visual com barras horizontais proporcionais representando os espacamentos mais usados:
- `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- `py-14` (56px), `py-16` (64px)
- `px-6` (24px), `px-10` (40px)
- `mb-3`, `mb-6`, `mb-10`, `mb-14`

Cada barra com o valor em px e o nome da classe Tailwind.

### 5. Icons
Grid dos icones Lucide em uso no site:
- Award, ArrowRight, ArrowUpRight, Mail, Linkedin, Phone, Menu, X, ChevronLeft, ChevronRight, ExternalLink

Cada icone renderizado em tamanho medio (24px) com nome abaixo.

### 6. Components
Preview visual dos componentes reais do site:

**Buttons**:
- NeonButton (glow effect) — estado normal
- Outlined button (rounded-full, border) — estado normal
- Ghost button — estado normal

**Cards**:
- CaseCard — renderizado com dados reais de um case (ex: Vivara)
- CourseCard — renderizado com dados reais de um curso

**Badges**:
- Year badge (pill com border, usado nos CourseCards)
- Tag badge (usado nos CaseCards, ex: "SaaS Platform")
- Skill badge (usado no About)

**Section Divider**: `.section-divider` gradient line renderizada

**Glass effect**: demo de `.glass` com backdrop-blur

**Gradient Border**: demo de `.gradient-border`

### 7. Animations
Demos visuais das animacoes Framer Motion:

**FadeIn**: 4 demos lado a lado (up, down, left, right), cada uma com botao "Replay" que reseta a animacao
**Hover scale**: card demo com `whileHover={{ scale: 1.02 }}`
**InfiniteSlider**: tech stack slider renderizado
**Breathe glow**: demo do background glow effect
**Card glow**: demo do `.card-glow` hover shadow

### 8. Design Tokens (tabela completa)
Tabela com todas as CSS custom properties agrupadas:

**Colors**: todos os tokens de cor (ja detalhados na secao Colors, aqui como tabela tecnica)
**Typography**: --font-sans, --font-display, --font-mono
**Transitions**: --transition-fast (150ms), --transition-base (300ms), --transition-slow (500ms)
**Borders**: --border, --border-hover

Colunas: Token | Value | Tailwind Class

## Arquitetura

### Rota
- `src/app/design-system/page.tsx` — server component com metadata
- `src/app/design-system/DesignSystemContent.tsx` — client component principal

### Componentes dedicados (em `src/app/design-system/`)
- `Sidebar.tsx` — navegacao lateral fixa com scroll spy
- `ColorSection.tsx` — grid de swatches
- `TypographySection.tsx` — exemplos de tipografia
- `SpacingSection.tsx` — barras de espacamento
- `IconsSection.tsx` — grid de icones
- `ComponentsSection.tsx` — preview de componentes
- `AnimationsSection.tsx` — demos de animacao com replay
- `TokensTableSection.tsx` — tabela completa de tokens

Cada secao como componente separado para manter arquivos focados.

### Dependencias
- Reutiliza componentes existentes: FadeIn, NeonButton, CaseCard, CourseCard, InfiniteSlider
- Reutiliza dados existentes: cases.ts (para CaseCard demo), courses.ts (para CourseCard demo)
- Lucide icons para a secao de icones
- Framer Motion para secao de animacoes (replay via key reset)

## Fora de Escopo
- i18n (apenas ingles)
- Link no menu de navegacao
- Code snippets ou props tables
- Modo claro/light theme
