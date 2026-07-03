@AGENTS.md

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->

# Portfolio — Cristiano Carvalho

Site de portfólio pessoal em Next.js com internacionalização PT/EN.

## Stack
- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- Vercel (deploy automático via GitHub)

## Regras importantes

### Internacionalização
O site tem versão em português e inglês. Toda alteração de conteúdo deve ser aplicada nas duas versões. Nunca alterar só uma língua.

### Imagens
Imagens estáticas ficam em `public/` e são referenciadas como `/nome-do-arquivo.png`.

### Tasks
- Executar uma task por vez, na ordem abaixo
- Ao concluir cada task, parar, fazer commit e reportar o que foi feito
- Aguardar confirmação ("pode continuar") antes de iniciar a próxima
- Nunca iniciar uma nova task sem essa confirmação
- Nunca marcar uma task como Done no Linear — isso é responsabilidade do dono do projeto

---

## Ordem de execução das tasks

### 1. CRIS-19 — Expandir case Keoto (saas-platform)
Ler a task completa no Linear antes de começar.
URL do case: `/case/saas-platform`

Resumo do que fazer:
- Adicionar seção "O sistema em ação" entre Desafios e Processo, com as 6 imagens listadas na task
- Expandir o step 2 do Processo (Design System) com o novo texto
- Adicionar step 5 ao Processo (Governança do sistema)
- Adicionar CTA ao final, após Aprendizados
- Aplicar tudo em PT e EN

### 2. CRIS-20 — Demo interativo em pelo menos um case
Ler a task completa no Linear antes de começar.
A ser definido — aguardar instruções do dono do projeto antes de executar.

---

## Commits
Usar o ID da task no commit. Exemplo:
`feat(cases): expand saas-platform case with system screenshots (CRIS-19)`