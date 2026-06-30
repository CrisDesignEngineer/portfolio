export interface CaseStudy {
  id: string;
  image?: string;
  tag: string;
  year: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  scope: string;
  overview: string;
  challenges: string[];
  process: {
    title: string;
    headline?: string;
    description: string;
    bullets?: { label?: string; text: string }[];
    image?: { src: string; width: number; height: number; caption?: string; kicker?: string };
  }[];
  results: { title: string; description: string }[];
  learnings: string;
  accentColor?: string;
  confidential?: boolean;
  /** Optional context paragraph shown above the Results content. */
  resultsIntro?: string;
  /** "Before"/context screenshot shown in the overview section. */
  contextImage?: { src: string; width: number; height: number; caption?: string; kicker?: string };
  /** Editorial metric ledger shown in the Results section (design "stat" band). */
  metrics?: { value: string; sup?: string; unit: string; label: string }[];
  /** Scrollytelling gallery ("O sistema em ação"). */
  systemInAction?: {
    title: string;
    intro: string;
    meta: { value: string; label: string }[];
    shots: {
      idx: string;
      kind: string;
      title: string;
      description: string;
      tags: string[];
      images: string[];
      width: number;
      height: number;
      variant?: "dual" | "legend";
      annotations?: { label: string; side?: "right"; style: string }[];
      legend?: { color: string; label: string }[];
    }[];
  };
  cta?: {
    title: string;
    description: string;
    linkLabel: string;
    linkUrl: string;
  };
}

export const cases: Record<"pt" | "en", CaseStudy[]> = {
  pt: [
    {
      id: "saas-platform",
      image: "/saas-platform.jpg",
      tag: "SaaS Platform",
      year: "2025",
      accentColor: "accent",
      confidential: true,
      title: "Plataforma SaaS confidencial",
      subtitle: "Design de plataforma SaaS e criação de Design System",
      role: "Product Designer",
      duration: "8 meses",
      scope: "UX, UI, Design System",
      overview:
        "Criação de uma plataforma SaaS do zero, com foco em estruturar uma experiência clara, consistente e preparada para escalar. O desafio central foi transformar uma ideia de produto em uma interface funcional, criando padrões de interface que sustentassem a evolução contínua da plataforma.",
      challenges: [
        "Plataforma com múltiplas funcionalidades e fluxos interdependentes",
        "Necessidade de estruturar arquitetura de interface desde o início",
        "Tradução de regras de negócio complexas em experiências claras",
        "Alinhamento técnico com shadcn/ui e Tailwind CSS",
      ],
      process: [
        {
          title: "Pesquisa e referências",
          headline: "Mapear o terreno",
          description:
            "Análise de plataformas concorrentes e produtos SaaS do mesmo segmento para identificar padrões de UX, boas práticas de organização de informação e oportunidades de simplificação.",
        },
        {
          title: "Design System",
          headline: "Tokens antes de componentes",
          description:
            "A estrutura de tokens foi definida antes dos primeiros componentes: cores semânticas (primária, sucesso, alerta, neutro), tipografia por hierarquia, espaçamentos por escala e estados de interação padronizados. A decisão de suportar dark mode desde o início significou que cada token de cor precisava ter sua variante escura — o que evitou retrabalho posterior e garantiu que o modo escuro fosse consistente em toda a plataforma, não uma adaptação.\n\nA escolha de shadcn/ui + Tailwind CSS foi um alinhamento deliberado com engenharia: ambos os lados avaliaram as opções disponíveis e concluíram que essa stack reduzia o gap entre o que era desenhado e o que seria implementado. Menos decisões duplicadas entre design e código, menos ciclos de revisão.",
        },
        {
          title: "Alinhamento com engenharia",
          headline: "Mesma linguagem, design e código",
          description:
            "Interface estruturada considerando shadcn/ui e Tailwind CSS, garantindo consistência entre design e código e implementação mais rápida.",
        },
        {
          title: "Liderança de design",
          headline: "Coordenar sem fragmentar",
          description:
            "Coordenação de dois designers juniores, dividindo funcionalidades, revisando interfaces e garantindo consistência visual em todo o produto.",
        },
        {
          title: "Governança do sistema",
          headline: "O desafio era comportamental, não técnico",
          description:
            "O maior desafio de liderança não foi técnico — foi comportamental. Os dois designers juniores tinham o hábito de criar componentes novos sem verificar se já existia um equivalente na biblioteca. O resultado era duplicação silenciosa: dois componentes com a mesma função, estilos levemente diferentes, quebrando a consistência sem que ninguém percebesse.\n\nA solução foi estabelecer uma regra clara de processo: antes de criar qualquer componente, verificar a biblioteca. Isso virou parte do fluxo de revisão — qualquer componente novo precisava de justificativa explícita de por que o existente não resolvia. Com o tempo, a duplicação diminuiu e os juniores passaram a contribuir para evoluir componentes existentes em vez de criar paralelos.",
        },
      ],
      results: [
        {
          title: "Design system estruturado do zero em 8 meses",
          description:
            "tokens semânticos de cor, tipografia e espaçamento; 48+ componentes reutilizáveis cobrindo botões, inputs, modais, cards, tabelas e navegação. Base preparada para escalar sem retrabalho.",
        },
        {
          title: "Stack alinhada com engenharia desde o início",
          description:
            "escolha deliberada de shadcn/ui + Tailwind CSS reduziu o gap entre o que era desenhado no Figma e o que era implementado em código. Menos ciclos de revisão, mais velocidade de entrega.",
        },
        {
          title: "Liderança de 2 designers juniores",
          description:
            "divisão de funcionalidades com revisão centralizada garantindo consistência visual em todo o produto, mesmo com trabalho paralelo.",
        },
        {
          title: "Plataforma com múltiplos fluxos interdependentes entregue com consistência",
          description:
            "regras de negócio complexas traduzidas em jornadas claras sem fragmentar a experiência entre módulos.",
        },
      ],
      learnings:
        "Este projeto reforçou a importância de estruturar um design system desde o início e o impacto que o alinhamento entre design e engenharia tem na velocidade de desenvolvimento de um SaaS.",
      resultsIntro:
        "O projeto foi interrompido antes do lançamento por mudanças internas na empresa. O design system foi entregue completo — 48 componentes, 120+ tokens semânticos, dois temas nativos, documentação de governança e processo estabelecido com a equipe. Pronto para implementação no momento em que o projeto foi encerrado.",
      metrics: [
        { value: "48", unit: "componentes", label: "Biblioteca reutilizável" },
        { value: "120", sup: "+", unit: "tokens", label: "Tokens semânticos" },
        { value: "2", unit: "temas", label: "Claro e escuro nativos" },
      ],
      systemInAction: {
        title: "Um design system, a mesma lógica em todo o produto",
        intro:
          "A plataforma cobre múltiplas superfícies com os mesmos tokens e componentes — login, dashboards (claro e escuro), gestão de vendas, carteira e assinaturas. Cada tela reusa as mesmas peças em composições adaptadas ao contexto, mantendo uma linguagem visual consistente em todo o produto.",
        meta: [
          { value: "2", label: "temas (claro + escuro)" },
          { value: "48+", label: "componentes reutilizados" },
          { value: "1", label: "linguagem visual" },
        ],
        shots: [
          {
            idx: "01",
            kind: "Entrada",
            title: "Tela de login",
            description:
              "Primeira superfície da plataforma. Layout dividido — formulário objetivo à esquerda, presença de marca à direita — para reduzir fricção sem abrir mão de identidade.",
            tags: ["split layout", "brand-first"],
            images: ["/login.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Formulário enxuto", style: "top:50%;left:-12px" },
              { label: "Marca à direita", side: "right", style: "top:34%;right:-12px" },
            ],
          },
          {
            idx: "02",
            kind: "Dashboard",
            title: "Claro e escuro, desde o dia 1",
            description:
              "O dark mode foi planejado desde o início como decisão de futuro — não adaptado depois. Cada token de cor semântica nasceu com sua variante para os dois temas, evitando retrabalho e mantendo consistência total.",
            tags: ["tokens semânticos", "dual-theme"],
            images: ["/home.png", "/home_dark.png"],
            width: 1712,
            height: 1094,
            variant: "dual",
            annotations: [{ label: "Mesma estrutura, dois temas", style: "top:18%;left:-12px" }],
          },
          {
            idx: "03",
            kind: "Gestão de vendas",
            title: "Filtros em cascata, padrão reutilizável",
            description:
              "Gestão de vendas com filtros independentes em cascata — produto, período, origem, situação, métodos de pagamento e UTMs. O mesmo padrão de filtros multiníveis se repete em outras seções, com contextos diferentes.",
            tags: ["filtros em cascata", "padrão reutilizado", "empty state"],
            images: ["/vendas.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Filtros em cascata", style: "top:44%;left:-12px" },
              { label: "Empty state informativo", side: "right", style: "bottom:20%;right:-12px" },
            ],
          },
          {
            idx: "04",
            kind: "Carteira",
            title: "Cor com semântica, não decoração",
            description:
              "Cards financeiros com semântica de cor deliberada: verde para saldo disponível, laranja para pendente e azul para total. A cor carrega significado — quem escaneia o painel entende o estado antes de ler o número.",
            tags: ["cor = significado", "scan-first"],
            images: ["/carteira_dark.png"],
            width: 1920,
            height: 965,
            variant: "legend",
            legend: [
              { color: "var(--green)", label: "Saldo disponível" },
              { color: "var(--orange)", label: "Pendente" },
              { color: "oklch(0.62 0.15 255)", label: "Total" },
            ],
          },
          {
            idx: "05",
            kind: "Assinaturas",
            title: "O sistema escala sem reestruturar",
            description:
              "A mesma estrutura de tabela e a mesma lógica de filtros da gestão de vendas, agora no contexto de assinaturas — MRR, ativas e canceladas. A prova de que o sistema escala para um novo módulo sem reescrever a interface.",
            tags: ["mesma tabela", "mesma lógica", "novo contexto"],
            images: ["/assinaturas.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Mesma tabela de vendas", style: "top:46%;left:-12px" },
              { label: "Mesmos filtros", side: "right", style: "top:30%;right:-12px" },
            ],
          },
        ],
      },
      cta: {
        title: "Quer saber mais sobre esse projeto?",
        description:
          "As telas acima são apenas um recorte de um projeto bem maior. Por conta do acordo de confidencialidade, posso mostrar publicamente só uma parte — em uma conversa fechada consigo detalhar o design system completo, as decisões de arquitetura e o processo de liderança.",
        linkLabel: "Falar no LinkedIn",
        linkUrl: "https://www.linkedin.com/in/cristiano-carvalho-design/",
      },
    },
    {
      id: "vivara",
      image: "/vivara.jpg",
      tag: "Redesign de sistema",
      year: "2025",
      accentColor: "accent-2",
      title: "Vivara",
      subtitle: "Redesign do sistema interno Capta usado nas lojas físicas da Vivara e Life",
      role: "UX/Product Designer",
      duration: "1 mês",
      scope: "UX, UI, Redesign",
      overview:
        "Redesign do sistema Capta, usado pelas vendedoras nas lojas físicas da Vivara e Life, para melhorar a performance e a experiência de uso. O objetivo foi modernizar o sistema trazendo agilidade, simplicidade e integração à operação de loja, com foco em atendimento mais rápido, processos mais intuitivos e melhoria na experiência de clientes e colaboradoras.",
      challenges: [
        "Sistema com excesso de campos e lentidão no fluxo de venda",
        "Alternância entre múltiplos sistemas para operações básicas",
        "Falta de feedback e excesso de cliques nos fluxos de troca e devolução",
        "Repetição de dados e processos manuais nas ordens de serviço",
      ],
      process: [
        {
          title: "O problema real estava escondido no comportamento",
          description:
            "As vendedoras das lojas físicas tinham desenvolvido maneiras próprias de contornar o sistema Capta. Buscas no banco de dados eram lentas e algumas ações travavam — então elas criavam atalhos informais para não perder tempo com o cliente na frente. Isso revelou algo mais sério do que lentidão técnica: o sistema gerava carga cognitiva alta logo na entrada, com muita informação exposta de uma vez.",
        },
        {
          title: "Por que só melhorar o layout não resolvia",
          description:
            "A primeira hipótese foi redesenhar a interface mantendo a estrutura existente. Descartei rápido: reorganizar o que estava visível não reduzia o volume de informação que as vendedoras precisavam processar de uma vez. O caminho certo foi separar as informações em etapas, entregando só o que era necessário para cada momento da venda. Menos decisões simultâneas, menos sobrecarga, menos necessidade de contornar o sistema.",
        },
      ],
      results: [
        {
          title: "Redução do tempo de atendimento nas lojas",
          description:
            "separação das informações em etapas eliminou a sobrecarga cognitiva que forçava as vendedoras a criar atalhos informais para contornar o sistema.",
        },
        {
          title: "Diminuição da alternância entre sistemas",
          description:
            "operações que exigiam trocar de tela ou sistema foram consolidadas em um fluxo único, reduzindo interrupções durante o atendimento ao cliente.",
        },
        {
          title: "Fluxos de troca e devolução simplificados",
          description:
            "indicadores de progresso e resumo otimizado de pedidos reduziram o número de cliques nas jornadas mais críticas da operação de loja.",
        },
        {
          title: "Backlog estruturado para continuidade",
          description:
            "todas as melhorias documentadas com etapa do fluxo, tela afetada, regras de negócio e navegação, deixando a equipe de desenvolvimento com contexto completo para implementação.",
        },
      ],
      learnings:
        "Este projeto reforçou a importância de entender profundamente o contexto operacional dos usuários (vendedoras em loja) antes de propor soluções, e como a simplificação de fluxos internos tem impacto direto na experiência do cliente final.",
    },
    {
      id: "leiteiro",
      image: "/leiteiro.jpg",
      tag: "Plataforma multilateral",
      year: "2024",
      accentColor: "accent-3",
      title: "Leiteiro",
      subtitle:
        "UX e UI para plataforma que conecta empresas agro e produtores rurais",
      role: "Product Designer",
      duration: "3 meses",
      scope: "UX, UI, Design System",
      overview:
        "A Leiteiro conecta empresas do setor agro a produtores rurais interessados em adquirir produtos e serviços personalizados. O grande desafio foi criar uma experiência fluida para dois públicos com perfis opostos: produtores com pouca familiaridade tecnológica e empresas que precisam de painéis administrativos robustos.",
      challenges: [
        "Dois públicos com perfis e necessidades muito distintos",
        "Usuários finais com pouca familiaridade digital (produtores 30+)",
        "Necessidade de painéis admin robustos para empresas e analistas",
        "Responsabilidade total sobre todo o design da plataforma",
      ],
      process: [
        {
          title: "A tensão central do projeto",
          description:
            "A plataforma servia dois perfis radicalmente diferentes. De um lado, empresas agro com times estruturados e familiaridade com ferramentas digitais. Do outro, produtores rurais — em grande parte pessoas mais velhas, com pouca experiência tecnológica e contexto de uso completamente diferente. O que funcionava para um lado criava barreira para o outro.",
        },
        {
          title: "A decisão de design",
          description:
            "Qualquer solução que priorizasse funcionalidade avançada para as empresas sacrificaria a acessibilidade para os produtores. A decisão foi desenhar a partir do usuário mais vulnerável: fluxos simplificados, linguagem direta, hierarquia visual clara e menos opções por tela. As empresas perderiam alguma densidade de informação, mas o produto só funcionaria se os dois lados conseguissem operar com autonomia.",
        },
      ],
      results: [
        {
          title: "Experiência acessível para usuários com baixa familiaridade digital",
          description:
            "fluxos guiados, linguagem direta e hierarquia visual simplificada permitiram que produtores rurais operassem a plataforma com autonomia, sem treinamento prévio.",
        },
        {
          title: "Painéis administrativos robustos sem comprometer usabilidade",
          description:
            "empresas e analistas tiveram acesso a tabelas, CRUDs, filtros e status coloridos dentro da mesma base de design system, sem abrir mão de consistência.",
        },
        {
          title: "3 jornadas distintas entregues em 3 meses",
          description:
            "cliente, empresa e analista com fluxos independentes e coerentes entre si, do zero até produção.",
        },
        {
          title: "Design system completo para o setor agro",
          description:
            "paleta, tipografia, ícones customizados e componentes reutilizáveis estruturados desde o início, com escala prevista.",
        },
      ],
      learnings:
        "O maior aprendizado foi construir uma experiência intuitiva para usuários com pouca familiaridade digital, sem comprometer a robustez e autonomia dos perfis administrativos.",
    },
    {
      id: "honda",
      image: "/honda.jpg",
      tag: "Otimização de conversão",
      year: "2024",
      accentColor: "accent-4",
      title: "Honda Automóveis",
      subtitle: "Otimização da experiência em formulários de interesse",
      role: "UX Designer",
      duration: "2 meses",
      scope: "UX Research, UI, Otimização",
      overview:
        "Otimização da jornada do usuário nos formulários de interesse da Honda Automóveis. Através de análises comportamentais com Crazy Egg e benchmarks competitivos no setor automotivo, reestruturei o fluxo do formulário para reduzir fricção e aumentar a taxa de conversão.",
      contextImage: {
        src: "/honda-home-antiga.png",
        width: 1920,
        height: 2097,
        kicker: "Antes",
        caption: "A página de formulário antiga — ponto de partida da análise comportamental.",
      },
      challenges: [
        "Formulários com alta taxa de abandono antes do final — confirmado por heatmap de scroll",
        "Seletor de concessionárias causava confusão e hesitação — identificado no heatmap de movimento do mouse",
        "Campos de modelo e versão concentravam alta interação; dados pessoais tinham baixa interação, sugerindo fricção no meio do fluxo",
        "Formulário sem adaptação ao contexto: mesmo layout para usuário que chegou pela página do carro e para quem clicou no header sem escolher modelo",
        "Ausência de personalização visual por campanha, quebrando a consistência com peças de mídia da Honda",
      ],
      process: [
        {
          title: "Diagnóstico comportamental com CrazyEgg",
          description:
            "Antes de propor qualquer solução, mapeei o comportamento real dos usuários com três tipos de análise:",
          bullets: [
            {
              label: "Heatmap de cliques",
              text: "campos de modelo e versão concentravam a maior interação; campos de dados pessoais tinham baixa interação — indicando que os usuários chegavam ao formulário motivados, mas perdiam impulso no meio do caminho",
            },
            {
              label: "Heatmap de scroll",
              text: "grande parte dos usuários não chegava ao final do formulário, sugerindo que o tamanho e a estrutura eram barreiras de conclusão",
            },
            {
              label: "Heatmap de movimento do mouse",
              text: "o seletor de concessionárias gerava hesitação visível — os usuários circulavam o mouse na área sem tomar decisão",
            },
          ],
          image: {
            src: "/honda-heatmap-scroll.jpg",
            width: 1211,
            height: 1780,
            kicker: "Diagnóstico — CrazyEgg",
            caption: "Heatmap de scroll: grande parte dos usuários não chegava ao final do formulário.",
          },
        },
        {
          title: "Benchmark competitivo",
          description:
            "Analisei os formulários de interesse de Toyota, Renault, Chevrolet, Mitsubishi Motors e Volkswagen. Padrões identificados:",
          bullets: [
            { label: "Toyota", text: "formulário com etapas progressivas, reduzindo a sobrecarga visual" },
            { label: "Renault", text: "agrupamento lógico de campos por contexto" },
            { label: "Todos os cinco", text: "preenchimento automático e validação em tempo real como padrão" },
          ],
        },
        {
          title: "Mapeamento de cenários de entrada",
          description:
            "O formulário era tratado como uma tela única, mas os usuários chegavam por caminhos completamente diferentes. Mapeei 7 cenários distintos que exigiam comportamentos diferentes do formulário:",
          bullets: [
            {
              label: "Fluxo 1 — Localização via navegador",
              text: "usuário compartilha geolocalização → concessionárias mais próximas exibidas automaticamente com distância em km",
            },
            {
              label: "Fluxo 2 — Localização via pop-up (apenas estado)",
              text: "sistema pré-seleciona o estado, usuário escolhe a cidade → concessionárias do estado filtradas, sem distância em km",
            },
            {
              label: "Fluxo 3 — Acesso pelo botão no header",
              text: "usuário clica em “Tenho interesse” sem ter escolhido um carro → formulário carrega neutro, usuário seleciona modelo e versão manualmente; localização é pré-preenchida se disponível",
            },
            {
              label: "Fluxo 4 — Nova exibição de seminovos",
              text: "formulário removido da página principal e movido para aba separada, acessível via botões “Tenho interesse” distribuídos pela página; página principal dedicada exclusivamente à exibição dos veículos",
            },
            {
              label: "Fluxo 5 — CPF vs CNPJ",
              text: "ao inserir CNPJ, o campo “Nome da Empresa” aparece dinamicamente; usuários PF não veem esse campo",
            },
            {
              label: "Fluxo 6 — Apenas uma loja disponível",
              text: "quando há somente uma concessionária na cidade selecionada, ela é pré-selecionada automaticamente, eliminando a etapa de escolha",
            },
            {
              label: "Fluxo 7 — Personalização por campanha",
              text: "o fundo do formulário adapta suas cores e imagem à campanha vigente (ex: CR-V Híbrido), reforçando a identidade visual da campanha e aumentando a coerência com as peças de mídia",
            },
          ],
          image: {
            src: "/honda-fluxo-7.jpg",
            width: 571,
            height: 371,
            kicker: "Fluxo 7",
            caption: "Fluxo 7 — o fundo do formulário se adapta à campanha vigente (ex: CR-V Híbrido).",
          },
        },
        {
          title: "Handoff com tecnologia",
          description:
            "Coordenação com a equipe de tecnologia da Honda para especificação técnica e testes de cada fluxo, incluindo configuração de geolocalização, lógica condicional dos campos e personalização visual por campanha.",
        },
      ],
      resultsIntro:
        "O projeto foi entregue como proposta validada em setembro de 2024. Por ter sido um trabalho freelance pontual, os dados de conversão pós-implementação não estão disponíveis. O que foi entregue:",
      results: [
        {
          title: "7 fluxos mapeados e prototipados",
          description: "cobrindo todos os cenários de entrada identificados.",
        },
        {
          title: "Etapa manual de seleção de concessionária eliminada",
          description: "nos casos de geolocalização disponível ou loja única.",
        },
        {
          title: "Menos campos exibidos simultaneamente",
          description: "via lógica condicional (CPF/CNPJ, modelo/versão por contexto).",
        },
        {
          title: "Personalização visual por campanha",
          description: "alinhando o formulário às peças de mídia vigentes.",
        },
        {
          title: "Benchmark de 5 concorrentes documentado",
          description: "com os padrões adotados na solução.",
        },
      ],
      learnings:
        "Este projeto consolidou a importância de usar dados comportamentais reais (não apenas heurísticas) para fundamentar decisões de design, e de tratar um formulário não como uma tela única, mas como um sistema que responde ao contexto de entrada de cada usuário.",
    },
  ],
  en: [
    {
      id: "saas-platform",
      image: "/saas-platform.jpg",
      tag: "SaaS Platform",
      year: "2025",
      accentColor: "accent",
      confidential: true,
      title: "Confidential SaaS Platform",
      subtitle: "SaaS platform design and Design System creation",
      role: "Product Designer",
      duration: "8 months",
      scope: "UX, UI, Design System",
      overview:
        "Creation of a SaaS platform from scratch, focused on structuring a clear, consistent experience ready to scale. The central challenge was transforming a product idea into a functional interface, creating interface patterns that would sustain the platform's continuous evolution.",
      challenges: [
        "Platform with multiple features and interdependent flows",
        "Need to structure interface architecture from the ground up",
        "Translating complex business rules into clear experiences",
        "Technical alignment with shadcn/ui and Tailwind CSS",
      ],
      process: [
        {
          title: "Research and references",
          headline: "Map the terrain",
          description:
            "Analysis of competing platforms and SaaS products in the same segment to identify UX patterns, best practices for information organization, and simplification opportunities.",
        },
        {
          title: "Design System",
          headline: "Tokens before components",
          description:
            "The token structure was defined before the first components: semantic colors (primary, success, warning, neutral), typography by hierarchy, spacing by scale, and standardized interaction states. Deciding to support dark mode from day one meant every color token needed a dark variant — which prevented rework later and ensured dark mode was consistent across the entire platform, not an adaptation.\n\nThe choice of shadcn/ui + Tailwind CSS was a deliberate alignment with engineering: both sides evaluated the available options and concluded this stack would reduce the gap between what was designed and what would be implemented. Fewer duplicated decisions between design and code, fewer review cycles.",
        },
        {
          title: "Engineering alignment",
          headline: "One language, design and code",
          description:
            "Interface structured considering shadcn/ui and Tailwind CSS, ensuring consistency between design and code and faster implementation.",
        },
        {
          title: "Design leadership",
          headline: "Coordinate without fragmenting",
          description:
            "Coordination of two junior designers, dividing features, reviewing interfaces and ensuring visual consistency throughout the product.",
        },
        {
          title: "System governance",
          headline: "The challenge was behavioral, not technical",
          description:
            "The biggest leadership challenge wasn't technical — it was behavioral. Both junior designers had a habit of creating new components without checking whether an equivalent already existed in the library. The result was silent duplication: two components with the same function, slightly different styles, breaking consistency without anyone noticing.\n\nThe solution was establishing a clear process rule: before creating any component, check the library. This became part of the review flow — any new component required an explicit justification for why the existing one didn't solve the problem. Over time, duplication decreased and the junior designers started contributing to evolving existing components instead of creating parallel ones.",
        },
      ],
      results: [
        {
          title: "Design system built from scratch over 8 months",
          description:
            "semantic tokens for color, typography, and spacing; 48+ reusable components covering buttons, inputs, modals, cards, tables, and navigation. Foundation ready to scale without rework.",
        },
        {
          title: "Stack aligned with engineering from day one",
          description:
            "deliberate choice of shadcn/ui + Tailwind CSS reduced the gap between what was designed in Figma and what was implemented in code. Fewer review cycles, faster delivery.",
        },
        {
          title: "Leadership of 2 junior designers",
          description:
            "workload split by feature with centralized review, ensuring visual consistency across the entire product despite parallel work.",
        },
        {
          title: "Platform with multiple interdependent flows delivered consistently",
          description:
            "complex business rules translated into clear journeys without fragmenting the experience across modules.",
        },
      ],
      learnings:
        "This project reinforced the importance of structuring a design system from the start and the impact that alignment between design and engineering has on the development speed of a SaaS.",
      resultsIntro:
        "The project was halted before launch due to internal changes at the company. The design system was delivered complete — 48 components, 120+ semantic tokens, two native themes, governance documentation, and an established process with the team. Ready for implementation at the moment the project was closed.",
      metrics: [
        { value: "48", unit: "components", label: "Reusable library" },
        { value: "120", sup: "+", unit: "tokens", label: "Semantic tokens" },
        { value: "2", unit: "themes", label: "Native light and dark" },
      ],
      systemInAction: {
        title: "One design system, the same logic across the product",
        intro:
          "The platform spans multiple surfaces with the same tokens and components — login, dashboards (light and dark), sales management, wallet, and subscriptions. Each screen reuses the same pieces in context-adapted compositions, keeping one consistent visual language across the product.",
        meta: [
          { value: "2", label: "themes (light + dark)" },
          { value: "48+", label: "reused components" },
          { value: "1", label: "visual language" },
        ],
        shots: [
          {
            idx: "01",
            kind: "Entry",
            title: "Login screen",
            description:
              "The platform's first surface. Split layout — a focused form on the left, brand presence on the right — to reduce friction without giving up identity.",
            tags: ["split layout", "brand-first"],
            images: ["/login.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Lean form", style: "top:50%;left:-12px" },
              { label: "Brand on the right", side: "right", style: "top:34%;right:-12px" },
            ],
          },
          {
            idx: "02",
            kind: "Dashboard",
            title: "Light and dark, from day 1",
            description:
              "Dark mode was planned from the start as a forward-looking decision — not retrofitted. Every semantic color token was born with its variant for both themes, avoiding rework and keeping full consistency.",
            tags: ["semantic tokens", "dual-theme"],
            images: ["/home.png", "/home_dark.png"],
            width: 1712,
            height: 1094,
            variant: "dual",
            annotations: [{ label: "Same structure, two themes", style: "top:18%;left:-12px" }],
          },
          {
            idx: "03",
            kind: "Sales management",
            title: "Cascading filters, a reusable pattern",
            description:
              "Sales management with independent chained filters — product, period, origin, status, payment methods, and UTMs. The same multi-level filter pattern repeats across other sections, in different contexts.",
            tags: ["chained filters", "reused pattern", "empty state"],
            images: ["/vendas.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Cascading filters", style: "top:44%;left:-12px" },
              { label: "Informative empty state", side: "right", style: "bottom:20%;right:-12px" },
            ],
          },
          {
            idx: "04",
            kind: "Wallet",
            title: "Color as meaning, not decoration",
            description:
              "Financial cards with deliberate color semantics: green for available balance, orange for pending, and blue for total. Color carries meaning — anyone scanning the panel understands the state before reading the number.",
            tags: ["color = meaning", "scan-first"],
            images: ["/carteira_dark.png"],
            width: 1920,
            height: 965,
            variant: "legend",
            legend: [
              { color: "var(--green)", label: "Available balance" },
              { color: "var(--orange)", label: "Pending" },
              { color: "oklch(0.62 0.15 255)", label: "Total" },
            ],
          },
          {
            idx: "05",
            kind: "Subscriptions",
            title: "The system scales without restructuring",
            description:
              "The same table structure and the same filter logic from sales management, now in the subscriptions context — MRR, active, and canceled. Proof that the system scales to a new module without rewriting the interface.",
            tags: ["same table", "same logic", "new context"],
            images: ["/assinaturas.png"],
            width: 1920,
            height: 965,
            annotations: [
              { label: "Same sales table", style: "top:46%;left:-12px" },
              { label: "Same filters", side: "right", style: "top:30%;right:-12px" },
            ],
          },
        ],
      },
      cta: {
        title: "Want to know more about this project?",
        description:
          "The screens above are just a slice of a much larger project. Due to a confidentiality agreement, I can only show part of it publicly — in a private conversation I can detail the complete design system, the architecture decisions, and the leadership process.",
        linkLabel: "Connect on LinkedIn",
        linkUrl: "https://www.linkedin.com/in/cristiano-carvalho-design/",
      },
    },
    {
      id: "vivara",
      image: "/vivara.jpg",
      tag: "System Redesign",
      year: "2025",
      accentColor: "accent-2",
      title: "Vivara",
      subtitle: "Redesign of the internal Capta system used in Vivara and Life physical stores",
      role: "UX/Product Designer",
      duration: "1 month",
      scope: "UX, UI, Redesign",
      overview:
        "Redesign of the Capta system, used by sales associates in Vivara and Life physical stores, to improve performance and the user experience. The goal was to modernize the system by bringing agility, simplicity and integration to store operations, with a focus on faster service, more intuitive processes, and improved experience for customers and staff.",
      challenges: [
        "System with excessive fields and slow sales flow",
        "Switching between multiple systems for basic operations",
        "Lack of feedback and too many clicks in exchange and return flows",
        "Data repetition and manual processes in service orders",
      ],
      process: [
        {
          title: "The real problem was hidden in behavior",
          description:
            "The store associates had developed their own workarounds for the Capta system. Database searches were slow and some actions froze — so they created informal shortcuts to avoid losing time with a customer standing in front of them. This revealed something more serious than technical slowness: the system generated high cognitive load from the very first screen, with too much information exposed at once.",
        },
        {
          title: "Why just improving the layout wasn't enough",
          description:
            "The first hypothesis was to redesign the interface while keeping the existing structure. I discarded it quickly: reorganizing what was visible wouldn't reduce the volume of information associates had to process at once. The right path was to separate information into steps, delivering only what was needed for each moment of the sale. Fewer simultaneous decisions, less overload, less need to work around the system.",
        },
      ],
      results: [
        {
          title: "Reduced customer service time in stores",
          description:
            "splitting information into steps eliminated the cognitive overload that was forcing associates to create informal shortcuts to work around the system.",
        },
        {
          title: "Less switching between systems",
          description:
            "operations that required changing screens or tools were consolidated into a single flow, reducing interruptions during customer service.",
        },
        {
          title: "Simplified exchange and return flows",
          description:
            "progress indicators and an optimized order summary reduced the number of clicks in the most critical store operation journeys.",
        },
        {
          title: "Structured backlog for continuity",
          description:
            "all improvements documented with flow stage, affected screen, business rules, and navigation, giving the development team full context for implementation.",
        },
      ],
      learnings:
        "This project reinforced the importance of deeply understanding the operational context of users (in-store sales associates) before proposing solutions, and how the simplification of internal flows has a direct impact on the end customer experience.",
    },
    {
      id: "leiteiro",
      image: "/leiteiro.jpg",
      tag: "Multilateral Platform",
      year: "2024",
      accentColor: "accent-3",
      title: "Leiteiro",
      subtitle:
        "UX and UI for a platform connecting agribusiness companies and rural producers",
      role: "Product Designer",
      duration: "3 months",
      scope: "UX, UI, Design System",
      overview:
        "Leiteiro connects agribusiness companies to rural producers interested in acquiring customized products and services. The big challenge was creating a fluid experience for two audiences with opposite profiles: producers with little technological familiarity and companies that need robust administrative dashboards.",
      challenges: [
        "Two audiences with very different profiles and needs",
        "End users with little digital familiarity (producers 30+)",
        "Need for robust admin dashboards for companies and analysts",
        "Full responsibility for the entire platform design",
      ],
      process: [
        {
          title: "The core tension of the project",
          description:
            "The platform served two radically different profiles. On one side, agro companies with structured teams and digital tool familiarity. On the other, rural producers — largely older individuals with limited tech experience and a completely different usage context. What worked well for one side created a barrier for the other.",
        },
        {
          title: "The design decision",
          description:
            "Any solution that prioritized advanced functionality for companies would sacrifice accessibility for producers. The decision was to design from the most vulnerable user outward: simplified flows, direct language, clear visual hierarchy, and fewer options per screen. Companies would lose some information density, but the product would only work if both sides could operate independently.",
        },
      ],
      results: [
        {
          title: "Accessible experience for users with low digital familiarity",
          description:
            "guided flows, plain language, and simplified visual hierarchy allowed rural producers to operate the platform independently, without prior training.",
        },
        {
          title: "Robust admin panels without compromising usability",
          description:
            "companies and analysts accessed tables, CRUDs, filters, and color-coded statuses within the same design system, without sacrificing consistency.",
        },
        {
          title: "3 distinct journeys delivered in 3 months",
          description:
            "client, company, and analyst flows built independently but cohesively, from zero to production.",
        },
        {
          title: "Complete design system for the agro sector",
          description:
            "palette, typography, custom icons, and reusable components structured from the start with scale in mind.",
        },
      ],
      learnings:
        "The biggest learning was building an intuitive experience for users with little digital familiarity, without compromising the robustness and autonomy of administrative profiles.",
    },
    {
      id: "honda",
      image: "/honda.jpg",
      tag: "Conversion Optimization",
      year: "2024",
      accentColor: "accent-4",
      title: "Honda Automóveis",
      subtitle: "Optimization of user experience in interest forms",
      role: "UX Designer",
      duration: "2 months",
      scope: "UX Research, UI, Optimization",
      overview:
        "Optimization of the user journey in Honda Automóveis interest forms. Through behavioral analysis with Crazy Egg and competitive benchmarks in the automotive sector, I restructured the form flow to reduce friction and increase conversion rate.",
      contextImage: {
        src: "/honda-home-antiga.png",
        width: 1920,
        height: 2097,
        kicker: "Before",
        caption: "The previous form page — the starting point of the behavioral analysis.",
      },
      challenges: [
        "Forms with high abandonment before the end — confirmed by scroll heatmap",
        "The dealership selector caused confusion and hesitation — identified in the mouse-movement heatmap",
        "Model and version fields concentrated high interaction; personal data had low interaction, suggesting friction mid-flow",
        "Form with no context adaptation: the same layout for a user who arrived from the car page and for one who clicked the header without choosing a model",
        "No visual customization per campaign, breaking consistency with Honda's media pieces",
      ],
      process: [
        {
          title: "Behavioral diagnosis with CrazyEgg",
          description:
            "Before proposing any solution, I mapped real user behavior with three types of analysis:",
          bullets: [
            {
              label: "Click heatmap",
              text: "model and version fields concentrated the most interaction; personal data fields had low interaction — indicating that users reached the form motivated, but lost momentum halfway through",
            },
            {
              label: "Scroll heatmap",
              text: "a large share of users never reached the end of the form, suggesting its length and structure were completion barriers",
            },
            {
              label: "Mouse-movement heatmap",
              text: "the dealership selector caused visible hesitation — users hovered around the area without making a decision",
            },
          ],
          image: {
            src: "/honda-heatmap-scroll.jpg",
            width: 1211,
            height: 1780,
            kicker: "Diagnosis — CrazyEgg",
            caption: "Scroll heatmap: a large share of users never reached the end of the form.",
          },
        },
        {
          title: "Competitive benchmark",
          description:
            "I analyzed the interest forms of Toyota, Renault, Chevrolet, Mitsubishi Motors, and Volkswagen. Patterns identified:",
          bullets: [
            { label: "Toyota", text: "form with progressive steps, reducing visual overload" },
            { label: "Renault", text: "logical grouping of fields by context" },
            { label: "All five", text: "autofill and real-time validation as a standard" },
          ],
        },
        {
          title: "Mapping entry scenarios",
          description:
            "The form was treated as a single screen, but users arrived through completely different paths. I mapped 7 distinct scenarios that required different form behaviors:",
          bullets: [
            {
              label: "Flow 1 — Location via browser",
              text: "user shares geolocation → nearest dealerships shown automatically with distance in km",
            },
            {
              label: "Flow 2 — Location via pop-up (state only)",
              text: "the system pre-selects the state, the user picks the city → dealerships filtered by state, without distance in km",
            },
            {
              label: "Flow 3 — Access via the header button",
              text: "user clicks “I'm interested” without having chosen a car → the form loads neutral, the user selects model and version manually; location is pre-filled if available",
            },
            {
              label: "Flow 4 — New used-car display",
              text: "the form is removed from the main page and moved to a separate tab, accessible via “I'm interested” buttons distributed across the page; the main page is dedicated exclusively to showcasing the vehicles",
            },
            {
              label: "Flow 5 — CPF vs CNPJ",
              text: "when entering a CNPJ, the “Company Name” field appears dynamically; individual users never see this field",
            },
            {
              label: "Flow 6 — Only one store available",
              text: "when there is only one dealership in the selected city, it is pre-selected automatically, eliminating the selection step",
            },
            {
              label: "Flow 7 — Campaign customization",
              text: "the form background adapts its colors and image to the active campaign (e.g., CR-V Hybrid), reinforcing the campaign's visual identity and increasing coherence with the media pieces",
            },
          ],
          image: {
            src: "/honda-fluxo-7.jpg",
            width: 571,
            height: 371,
            kicker: "Flow 7",
            caption: "Flow 7 — the form background adapts to the active campaign (e.g., CR-V Hybrid).",
          },
        },
        {
          title: "Handoff with technology",
          description:
            "Coordination with Honda's technology team for technical specification and testing of each flow, including geolocation setup, conditional field logic, and visual customization per campaign.",
        },
      ],
      resultsIntro:
        "The project was delivered as a validated proposal in September 2024. As it was a one-off freelance engagement, post-implementation conversion data is not available. What was delivered:",
      results: [
        {
          title: "7 flows mapped and prototyped",
          description: "covering all identified entry scenarios.",
        },
        {
          title: "Manual dealership selection step eliminated",
          description: "in cases of available geolocation or a single store.",
        },
        {
          title: "Fewer fields shown at once",
          description: "via conditional logic (CPF/CNPJ, model/version by context).",
        },
        {
          title: "Visual customization per campaign",
          description: "aligning the form with the active media pieces.",
        },
        {
          title: "Benchmark of 5 competitors documented",
          description: "with the patterns adopted in the solution.",
        },
      ],
      learnings:
        "This project consolidated the importance of using real behavioral data (not just heuristics) to support design decisions, and of treating a form not as a single screen but as a system that responds to each user's entry context.",
    },
  ],
};
