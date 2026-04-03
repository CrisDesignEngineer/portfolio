# Design System Playground

**Data**: 2026-04-03
**Escopo**: Nova secao "Playground" na pagina `/ds` para testar tokens em tempo real com preview visual.

## Visao Geral

Secao interativa dentro do design system (`/ds`) que permite editar qualquer token (cores, tipografia, spacing, transicoes) e ver o resultado ao vivo num componente de preview. Somente preview visual — nenhuma alteracao e salva. Abordagem via CSS Variables Override: os controles alteram CSS custom properties num wrapper div, e o preview herda as variaveis automaticamente.

## Layout

### Desktop (lg+)
- **Painel de controles** a esquerda (~320px, scroll proprio)
  - Abas por categoria: Colors | Typography | Spacing | Transitions
  - Botao "Reset" no topo para restaurar valores originais
- **Preview card** a direita (flex-1, sticky top-8)
  - Container com CSS variables overridden via `style` inline
  - Card composto que exercita todos os tokens

### Mobile (< lg)
- Controles no topo (abas horizontais, inputs compactos)
- Preview embaixo (full width)

## Painel de Controles

### Aba Colors
Exibe todos os tokens de `colorTokens` agrupados (Backgrounds, Text, Accents, Borders):
- Para cada token: label com nome + CSS var
- `<input type="color">` para cores hexadecimais
- Campo texto editavel para cores rgba (borders, accent-muted)
- Swatch de preview ao lado do input

### Aba Typography
Tokens de `typographyTokens`:
- **Font family**: dropdown `<select>` com opcoes (Geist Sans, Geist Mono, serif, system-ui)
- **Font size preview**: slider que ajusta tamanho do body text no preview (12px–24px)

### Aba Spacing
Tokens de `spacingTokens`:
- Slider para cada spacing value (0px–96px)
- Valor em px exibido ao lado
- Controla gap e padding no preview card via `style` inline

### Aba Transitions
Tokens de `transitionTokens`:
- Slider de duracao (0ms–1000ms) para cada transicao
- Select de easing (ease, linear, ease-in, ease-out, cubic-bezier padrao)
- Valor formatado exibido (ex: "300ms ease")

### Botao Reset
- Posicionado no topo do painel, acima das abas
- Restaura todos os valores ao estado original importado de `tokens.ts`
- Estilo: ghost button com icone de reset

## Preview Card

Container wrapper `<div>` que recebe todas as CSS variables editadas via `style` prop:
```
style={{
  '--bg-primary': editedColors['--bg-primary'],
  '--accent': editedColors['--accent'],
  ...todas as CSS vars editadas
}}
```

### Composicao do card
O preview e um card unico que exercita o maximo de tokens possivel:

1. **Background**: usa `--bg-card` como fundo, `--bg-primary` como fundo do container externo
2. **Heading**: "Preview Card" em `font-display`, `text-text-primary`, `font-extrabold`
3. **Body text**: paragrafo em `font-sans`, `text-text-secondary`, `text-base`
4. **Mono label**: "DESIGN SYSTEM" em `font-mono`, `text-text-muted`, uppercase, tracking wide
5. **Badges**: 5 badges usando cada accent color (`--accent` a `--accent-5`)
6. **NeonButton**: botao default usando `--accent`
7. **Section divider**: `section-divider` class usando `--border`
8. **Card border**: `--border` default, `--border-hover` no hover
9. **Spacing**: gap e padding controlados pela aba Spacing
10. **Transitions**: hover states respeitam `--transition-base`

O card tem hover state para demonstrar transicoes e border-hover.

## Fluxo de Dados

```
tokens.ts (valores default)
    |
    v
useState({...defaultTokens}) — copia editavel no PlaygroundSection
    |
    v onChange dos controles
style={{ '--accent': edited['--accent'], ... }} no wrapper div
    |
    v CSS inheritance
Preview card (classes Tailwind normais: bg-bg-card, text-accent, etc.)
```

- Cores e transicoes: override direto via CSS vars no wrapper
- Spacing: aplicado via `style` inline nos elementos do preview (gap, padding)
- Tipografia: font-family via CSS var override, font-size via style inline

## Integracao com a pagina /ds

1. Adicionar `{ id: "playground", label: "Playground" }` ao array `SECTIONS` em `DesignSystemContent.tsx`
2. Criar `PlaygroundSection.tsx` em `src/app/ds/`
3. Adicionar ao `SECTION_COMPONENTS` e `SECTION_TITLES`
4. Importa `colorTokens`, `typographyTokens`, `spacingTokens`, `transitionTokens` de `@/design-system/tokens`

## Restricoes

- Somente preview visual, sem persistencia
- Nao modifica tokens.ts nem globals.css
- Nao adiciona dependencias externas (color pickers, sliders sao HTML nativo)
- Arquivo unico: PlaygroundSection.tsx (pode ter sub-componentes internos)
- Ingles (consistente com o resto do /ds)

## Testes

- Renderiza a secao Playground quando selecionada
- Preview card exibe todos os elementos (heading, body, badges, button)
- Reset restaura valores originais
- Troca de abas mostra controles corretos
