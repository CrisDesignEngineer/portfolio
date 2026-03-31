# Design: Switch de idioma PT/EN no portfolio

**Issue:** [CRIS-5](https://linear.app/keensei/issue/CRIS-5/adicionar-switch-de-idioma-no-portfolio-pt-en)
**Data:** 2026-03-30
**Status:** Aprovado

## Resumo

Adicionar um toggle inline (PT | EN) no header do portfolio que alterna todo o conteudo textual visivel entre portugues e ingles, com transicao fade suave e persistencia via localStorage. Abordagem client-only (downscope): metadata, OG images e anchor IDs permanecem em portugues.

## Decisoes de design

| Decisao | Escolha | Alternativas descartadas |
|---------|---------|--------------------------|
| Formato do switch | Toggle inline `PT \| EN` | Dropdown com bandeiras, botao com bandeira |
| Posicao no header | Canto direito, isolado da nav | Apos a nav, junto ao logo |
| Transicao | Fade suave ~150ms via CSS opacity | AnimatePresence (descartado: remonta filhos, reseta scroll) |
| Abordagem tecnica | Context API + JSON files | next-intl, react-i18next |
| Escopo da traducao | UI visivel + case studies | Apenas interface |
| Escopo server-side | Downscope: metadata/OG/anchors ficam em PT | Rotas por locale (`/en/`, `/pt/`) |

## Decisoes de downscope

Estas decisoes simplificam a arquitetura mantendo viabilidade com o modelo server/client do Next.js App Router:

1. **Metadata (SEO)** — `export const metadata` em `layout.tsx` e `generateMetadata` em `case/[id]/page.tsx` permanecem em portugues. Sao funcoes server-side sem acesso a Context cliente. SEO primario focado no Brasil.
2. **OpenGraph image** — `opengraph-image.tsx` roda no Edge runtime, texto permanece em PT.
3. **Anchor IDs** — `#cases`, `#sobre`, `#contato` permanecem fixos em portugues. Evita quebra de links externos/bookmarks.
4. **Sem `hreflang`** — Nao ha rotas alternativas por idioma, entao nao se aplica.

## Arquitetura

### Estrutura de arquivos

```
src/
  i18n/
    locales/
      pt.json              # strings da interface em portugues
      en.json              # strings da interface em ingles
    LanguageContext.tsx     # Context + Provider + hook useTranslation()
  data/
    cases.ts               # refatorado para { pt: Case[], en: Case[] }
```

### LanguageContext

- **Provider:** `LanguageProvider` envolve o app no `layout.tsx` (client component importado em server component — padrao valido no App Router)
- **Estado:** `locale` (`"pt"` | `"en"`), default `"pt"`
- **Mount:** le `localStorage.getItem("locale")` para restaurar preferencia
- **Troca:** salva no `localStorage` e atualiza `document.documentElement.lang`
- **Hook `useTranslation()`** expoe:
  - `t(key)` — retorna string traduzida (dot notation: `t("hero.title")`)
  - `locale` — idioma atual (`"pt"` | `"en"`)
  - `toggleLocale()` — alterna entre PT e EN

### Estrutura dos JSONs

```json
{
  "header": {
    "cases": "Cases",
    "about": "About",
    "contact": "Contact",
    "role": "Product Designer + Engineer"
  },
  "hero": {
    "title": "...",
    "subtitle": "...",
    "cta": "..."
  },
  "about": {
    "title": "...",
    "bio": ["paragraph1", "paragraph2", "paragraph3"],
    "designSkills": [{ "name": "...", "description": "..." }],
    "engineeringSkills": [{ "name": "...", "description": "..." }],
    "tools": "..."
  },
  "contact": {
    "title": "...",
    "email": "...",
    "linkedin": "...",
    "phone": "..."
  },
  "footer": {
    "available": "...",
    "copyright": "..."
  },
  "cases": {
    "sectionTitle": "...",
    "viewCase": "...",
    "preview": "...",
    "confidential": "...",
    "previous": "...",
    "next": "..."
  },
  "caseDetail": {
    "role": "...",
    "duration": "...",
    "scope": "...",
    "overview": "...",
    "challenges": "...",
    "process": "...",
    "results": "...",
    "learnings": "...",
    "nextCase": "...",
    "confidentialContent": "..."
  }
}
```

A estrutura exata das chaves sera refinada durante a implementacao conforme a extracao das strings. O volume real estimado e de 150+ chaves entre interface e conteudo.

## Componente LanguageToggle

### Visual

- Container: `bg-white/8`, `rounded-lg`, `p-1`
- Dois botoes internos: `PT` e `EN`
- Ativo: fundo accent (`#bf5af2`), texto branco, `rounded-md`
- Inativo: sem fundo, cor `text-muted` (`#5a5a6e`)
- Hover no inativo: cor `text-secondary`

### Posicionamento

- **Desktop:** canto direito do header, separado da nav por espaco
- **Mobile:** dentro do menu hamburger

### Comportamento

- Clique no idioma inativo chama `toggleLocale()`
- Clique no idioma ativo nao faz nada

## Transicao fade

- **CSS transition** no wrapper do conteudo (NAO AnimatePresence)
- Ao trocar idioma: opacity 1 → 0 (~150ms), atualizar textos, opacity 0 → 1 (~150ms)
- Implementado com uma classe CSS + transitionend event ou setTimeout
- Vantagem sobre AnimatePresence: nao remonta componentes, preserva scroll e estado

## Mitigacao de flash de idioma (FOUL)

Na hidratacao, o servidor renderiza PT. Se o usuario salvou EN no localStorage, haveria um flash de PT antes da troca. Mitigacao:

- O `LanguageProvider` inicia com `isHydrated = false`
- Wrapper do conteudo aplica `opacity: 0` enquanto `!isHydrated`
- No mount, le localStorage, define locale, e seta `isHydrated = true`
- CSS transition de opacity 0 → 1 faz o conteudo aparecer suavemente no idioma correto
- Tempo total: imperceptivel (~50ms), conteudo aparece ja no idioma certo

## Cases data

- `cases.ts` passa a exportar `{ pt: Case[], en: Case[] }`
- Componentes consomem `cases[locale]`
- Cada case mantém mesma estrutura, textos traduzidos
- IDs e slugs permanecem iguais entre idiomas
- `generateStaticParams` continua gerando params apenas pelos IDs (nao depende de locale)
- `generateMetadata` usa os dados PT (downscope — metadata fica em PT)

## Persistencia

- **Salvar:** `localStorage.setItem("locale", locale)` ao trocar
- **Restaurar:** `localStorage.getItem("locale")` no mount do Provider
- **Fallback:** `"pt"` se nao houver valor salvo
- **HTML lang:** atualiza `document.documentElement.lang` dinamicamente (`"pt-BR"` ou `"en"`)

## Componentes afetados

Todos os componentes com texto hardcoded precisam ser refatorados para usar `t()`:

| Componente | Mudancas necessarias |
|-----------|---------------------|
| `Header.tsx` | Labels de navegacao, adicionar LanguageToggle. Ja e client component. |
| `Hero.tsx` | Titulo, subtitulo, botoes CTA, textos do DesignPreview (Design System, Producao, Componentes, Tokens, Semanticos, Stack & Tools). Ja e client component. |
| `About.tsx` | Titulo, bio (3 paragrafos), designSkills (6 items), engineeringSkills (6 items), nomes de skills, Ferramentas & Stack. Ja e client component. |
| `Contact.tsx` | Titulo, labels dos 3 cards. Ja e client component. |
| `Footer.tsx` | Texto de disponibilidade, copyright. **Precisa adicionar `"use client"`**. |
| `CaseCard.tsx` | "Confidencial", "Preview do projeto", "Ver case completo". Ja e client component. |
| `CasesCarousel.tsx` | "Preview do projeto", "Ver case completo", aria-labels "Anterior"/"Proximo". Ja e client component. |
| `MobileCasesCarousel.tsx` | "Confidencial", "Preview do projeto", "Ver case", aria-labels. Ja e client component. |
| `CaseContent.tsx` | Labels: Role, Duracao, Escopo, Visao geral, Desafios, Processo, Resultados, Aprendizados, Proximo case, Conteudo confidencial. Ja e client component. |
| `page.tsx` (home) | "Projetos selecionados", "Cases" (section label). **Precisa extrair textos para componente client ou passar via props.** |
| `layout.tsx` | Envolver children com `LanguageProvider`. Metadata permanece em PT (downscope). |

### Componentes NAO afetados (downscope)

- `opengraph-image.tsx` — Edge runtime, texto permanece em PT
- `layout.tsx` metadata — server-side, permanece em PT
- `case/[id]/page.tsx` metadata — server-side, permanece em PT

## Riscos e mitigacoes

| Risco | Mitigacao |
|-------|-----------|
| Bundle size: conteudo duplicado em 2 idiomas | Volume pequeno (~150 keys + 4 cases). Impacto estimado: +10-15kb. Aceitavel para portfolio. |
| Manutencao de traducoes | Manter JSONs lado a lado. Volume gerenciavel para 2 idiomas. |
| Hydration mismatch warnings (dev) | Mitigado pelo wrapper opacity — conteudo so aparece apos hidratacao, evitando mismatch visivel. React warnings em dev sao esperados e inofensivos. |
| Textos EN mais curtos/longos que PT | Testar layout em ambos idiomas. Tailwind com classes responsivas ja lida bem com conteudo variavel. |

## Criterios de aceite (da issue CRIS-5)

- [ ] Toggle PT | EN visivel e acessivel em todas as paginas (desktop e mobile)
- [ ] Todo o conteudo textual visivel muda ao alternar o idioma
- [ ] Preferencia de idioma salva e mantida ao recarregar a pagina
- [ ] Sem quebras de layout em nenhum dos idiomas
- [ ] Transicao fade suave ao trocar idioma
- [ ] Sem flash de idioma errado ao carregar a pagina
