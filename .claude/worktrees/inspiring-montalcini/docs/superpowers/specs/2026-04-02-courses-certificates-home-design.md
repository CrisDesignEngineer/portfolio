# Cursos & Certificados — Seção Home (CRIS-6)

**Data**: 2026-04-02
**Escopo**: Apenas a seção na home page com 3 cards. A página dedicada `/certificados` com busca, filtros e listagem completa será tratada em um segundo plano.

## Visão Geral

Adicionar uma seção "Cursos & Certificados" na home do portfólio, entre About e Contact, exibindo 3 cursos em cards com hover animado via Framer Motion.

## Dados

### Interface (`src/data/courses.ts`)

```typescript
interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
  certificateUrl: string;
}
```

Exportado como `Record<"pt" | "en", Course[]>` seguindo o padrão bilíngue de `cases.ts`.

### Cursos iniciais

| # | Nome | Instituição | Ano | URL |
|---|------|-------------|-----|-----|
| 1 | Design Engineer | UX Unicórnio | 2026 | https://drive.google.com/file/d/1OQpGPPt7ms-tvnWRmmUjc_ih6FD1S4Xg/view |
| 2 | PRO FIGMA WEB \| UI DESIGN | Udemy | 2024 | https://www.udemy.com/certificate/UC-9febb7e0-bf84-4947-9993-78ebef3ef49e/ |
| 3 | UX design do zero | Mentorama | 2022 | https://drive.google.com/file/d/1CsNHtFQhZs5dktGgzvAYyIULNtyFI-DN/view |

Os nomes dos cursos são mantidos iguais em PT e EN (nomes próprios). A estrutura bilíngue fica pronta para cursos traduzidos na fase 2.

## Componentes

### `CourseCard.tsx` (client component)

- **Estilo base**: `bg-card`, `border`, `rounded-xl`, padding consistente com cards existentes
- **Layout**:
  - Topo esquerdo: ícone `Award` do lucide-react
  - Topo direito: badge com o ano (estilo pill/tag)
  - Corpo: nome do curso em bold (`text-primary`), instituição em `text-secondary`
- **Hover** (Framer Motion `whileHover`):
  - Leve scale (1.02)
  - Border transition para `border-hover`
  - Link "Ver certificado →" aparece com animação de opacidade em `text-accent`
- **Link**: abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`)

### `CoursesSection.tsx` (client component)

- **Divider**: `.section-divider` acima da seção
- **Título**: "Cursos & Certificados" com estilo consistente com os outros títulos de seção
- **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Animação**: cada card wrapped em `FadeIn` com delay escalonado (`index * 0.1`)
- **Botão**: "Ver todos os certificados →" centralizado abaixo do grid
  - Estilo: outlined/ghost, consistente com outros CTAs do site
  - Por enquanto sem link funcional (será conectado na fase 2 à página `/certificados`)

## Traduções

Chaves adicionadas em `en.json` e `pt.json`:

| Chave | PT | EN |
|-------|----|----|
| `courses.title` | Cursos & Certificados | Courses & Certificates |
| `courses.viewCertificate` | Ver certificado | View certificate |
| `courses.viewAll` | Ver todos os certificados | View all certificates |

## Posicionamento

Inserido em `src/app/page.tsx` entre `<About />` e `<Contact />`.

## Responsividade

- **Desktop** (lg+): 3 colunas
- **Tablet** (md): 2 colunas
- **Mobile**: 1 coluna

## Abordagem de Animação

- **Scroll**: `FadeIn` com `whileInView` (padrão do projeto)
- **Hover**: Framer Motion `whileHover` com scale + opacidade no link
- Consistente com a linguagem visual existente do portfólio

## Fora de Escopo (Fase 2)

- Página dedicada `/certificados`
- Busca e filtros por categoria
- Ordenação
- Listagem completa dos 29 certificados
