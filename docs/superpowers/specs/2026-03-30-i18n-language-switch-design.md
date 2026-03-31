# Design: Switch de idioma PT/EN no portfolio

**Issue:** [CRIS-5](https://linear.app/keensei/issue/CRIS-5/adicionar-switch-de-idioma-no-portfolio-pt-en)
**Data:** 2026-03-30
**Status:** Aprovado

## Resumo

Adicionar um toggle inline (PT | EN) no header do portfolio que alterna todo o conteudo textual entre portugues e ingles, com transicao fade suave e persistencia via localStorage.

## Decisoes de design

| Decisao | Escolha | Alternativas descartadas |
|---------|---------|--------------------------|
| Formato do switch | Toggle inline `PT \| EN` | Dropdown com bandeiras, botao com bandeira |
| Posicao no header | Canto direito, isolado da nav | Apos a nav, junto ao logo |
| Transicao | Fade suave ~150ms via Framer Motion | Instantanea, sem animacao |
| Abordagem tecnica | Context API + JSON files | next-intl, react-i18next |
| Escopo da traducao | Tudo (interface + case studies) | Apenas interface |

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

- **Provider:** `LanguageProvider` envolve o app no `layout.tsx`
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
    "about": "Sobre",
    "contact": "Contato",
    "role": "Product Designer + Engineer"
  },
  "hero": {
    "title": "Do Figma ao codigo em producao",
    "subtitle": "..."
  },
  "about": {
    "title": "Sobre",
    "skills": { ... },
    "tools": { ... }
  },
  "contact": {
    "title": "Contato",
    "email": "E-mail",
    "linkedin": "LinkedIn",
    "phone": "Telefone"
  },
  "footer": {
    "available": "Disponivel para projetos",
    "copyright": "..."
  }
}
```

A estrutura exata das chaves sera definida durante a implementacao conforme a extracao das strings dos componentes.

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

- Framer Motion `AnimatePresence` + `motion.div` com `key={locale}`
- Aplicada no `<main>` inteiro para transicao uniforme
- Fade-out: opacity 1 → 0, ~150ms
- Fade-in: opacity 0 → 1, ~150ms

## Cases data

- `cases.ts` passa a exportar `{ pt: Case[], en: Case[] }`
- Componentes consomem `cases[locale]`
- Cada case mantém mesma estrutura, textos traduzidos
- IDs e slugs permanecem iguais entre idiomas

## Persistencia

- **Salvar:** `localStorage.setItem("locale", locale)` ao trocar
- **Restaurar:** `localStorage.getItem("locale")` no mount do Provider
- **Fallback:** `"pt"` se nao houver valor salvo
- **HTML lang:** atualiza `document.documentElement.lang` dinamicamente (`"pt-BR"` ou `"en"`)

## Componentes afetados

Todos os componentes com texto hardcoded precisam ser refatorados para usar `t()`:

- `Header.tsx` — labels de navegacao + toggle
- `Hero.tsx` — titulo, subtitulo, botoes CTA
- `About.tsx` — titulo, skills, tools, experiencia
- `Contact.tsx` — titulo, labels dos cards
- `Footer.tsx` — texto de disponibilidade, copyright
- `CaseCard.tsx` — titulo, descricao dos cases
- `CasesCarousel.tsx` — titulo da secao
- `MobileCasesCarousel.tsx` — titulo da secao
- `CaseContent.tsx` (case/[id]) — conteudo detalhado dos cases
- `layout.tsx` — metadata (title, description) e lang attribute

## Criterios de aceite (da issue CRIS-5)

- [ ] Toggle PT | EN visivel e acessivel em todas as paginas
- [ ] Todo o conteudo textual muda ao alternar o idioma
- [ ] Preferencia de idioma salva e mantida ao recarregar a pagina
- [ ] Sem quebras de layout em nenhum dos idiomas
- [ ] Transicao fade suave ao trocar idioma
