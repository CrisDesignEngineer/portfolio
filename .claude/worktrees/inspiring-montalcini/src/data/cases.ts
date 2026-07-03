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
  process: { title: string; description: string }[];
  results: string[];
  learnings: string;
  accentColor?: string;
  confidential?: boolean;
}

export const cases: Record<"pt" | "en", CaseStudy[]> = {
  pt: [
    {
      id: "keoto",
      image: "/keoto.jpg",
      tag: "SaaS Platform",
      year: "2025",
      accentColor: "accent",
      confidential: true,
      title: "Keoto",
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
          description:
            "Análise de plataformas concorrentes e produtos SaaS do mesmo segmento para identificar padrões de UX, boas práticas de organização de informação e oportunidades de simplificação.",
        },
        {
          title: "Design System",
          description:
            "Estruturação de tokens (cores, tipografia, espaçamentos, estados), componentes reutilizáveis (botões, inputs, selects, modais, cards, tabelas, navegação) e padrões escaláveis.",
        },
        {
          title: "Alinhamento com engenharia",
          description:
            "Interface estruturada considerando shadcn/ui e Tailwind CSS, garantindo consistência entre design e código e implementação mais rápida.",
        },
        {
          title: "Liderança de design",
          description:
            "Coordenação de dois designers juniores, dividindo funcionalidades, revisando interfaces e garantindo consistência visual em todo o produto.",
        },
      ],
      results: [
        "Design system estruturado desde o início do produto",
        "Componentes reutilizáveis acelerando o desenvolvimento",
        "Alinhamento direto entre design e engenharia",
        "Base visual preparada para escalar",
      ],
      learnings:
        "Este projeto reforçou a importância de estruturar um design system desde o início e o impacto que o alinhamento entre design e engenharia tem na velocidade de desenvolvimento de um SaaS.",
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
          title: "Análise AS IS",
          description:
            "Mapeamento dos fluxos existentes (venda, devolução, troca, ordem de serviço, consulta de cliente e produto) identificando gargalos e dores por jornada.",
        },
        {
          title: "Ideação e Prototipação",
          description:
            "Redesign dos fluxos principais com indicadores de progresso, tabelas dinâmicas, seleção de múltiplos pagamentos, resumo otimizado de pedidos e envio automático por e-mail/WhatsApp.",
        },
        {
          title: "Backlog de Funcionalidades",
          description:
            "Organização de todas as melhorias e novas features com etapa do fluxo, tela afetada, área do componente, funcionalidade, regras de negócio e fluxo de navegação.",
        },
      ],
      results: [
        "Redução do tempo de atendimento nas lojas",
        "Aumento na satisfação das vendedoras",
        "Diminuição da troca entre sistemas",
        "Agilidade nas jornadas mais críticas",
      ],
      learnings:
        "Este projeto reforçou a importância de entender profundamente o contexto operacional dos usuários (vendedoras em loja) antes de propor soluções, e como a simplificação de fluxos internos tem impacto direto na experiência do cliente final.",
    },
    {
      id: "leiteiro",
      image: "/leiteiro.jpg",
      tag: "Plataforma multilateral",
      year: "2024",
      accentColor: "accent-4",
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
          title: "Estratégia de abordagem",
          description:
            "Mobile-first para o usuário final (telas simples, textos diretos, fluxos guiados) e estrutura modular para perfis administrativos (tabelas, CRUDs, filtros visuais, status coloridos).",
        },
        {
          title: "Design System",
          description:
            "Paleta de cores com alertas e temas neutros, tipografia estruturada, ícones personalizados para o setor agro e componentes reutilizáveis.",
        },
        {
          title: "3 jornadas distintas",
          description:
            "Cliente (landing > pagamento > envio de dados > acompanhamento > download), Empresa (login > cadastro de produtos > gestão de usuários) e Analista Leiteiro (aprovação de produtos, análise de dados, conformidade).",
        },
      ],
      results: [
        "Experiência intuitiva para usuários com baixa familiaridade digital",
        "Painéis administrativos robustos sem comprometer usabilidade",
        "Solução escalável e acessível entregue em 3 meses",
        "Controle completo do design system aos fluxos finais",
      ],
      learnings:
        "O maior aprendizado foi construir uma experiência intuitiva para usuários com pouca familiaridade digital, sem comprometer a robustez e autonomia dos perfis administrativos.",
    },
    {
      id: "honda",
      image: "/honda.jpg",
      tag: "Otimização de conversão",
      year: "2024",
      accentColor: "accent-3",
      title: "Honda Automóveis",
      subtitle: "Otimização da experiência em formulários de interesse",
      role: "UX Designer",
      duration: "2 meses",
      scope: "UX Research, UI, Otimização",
      overview:
        "Otimização da jornada do usuário nos formulários de interesse da Honda Automóveis. Através de análises comportamentais com Crazy Egg e benchmarks competitivos no setor automotivo, reestruturei o fluxo do formulário para reduzir fricção e aumentar a taxa de conversão.",
      challenges: [
        "Formulários com alta taxa de abandono",
        "Processo de preenchimento com excesso de cliques",
        "Falta de personalização por campanha e localização",
        "Necessidade de dados comportamentais para embasar decisões",
      ],
      process: [
        {
          title: "Análise comportamental",
          description:
            "Uso do Crazy Egg para mapear heatmaps, scroll maps e gravações de sessão. Identificação dos pontos exatos de abandono e fricção no fluxo do formulário.",
        },
        {
          title: "Benchmark competitivo",
          description:
            "Análise de formulários de concorrentes no setor automotivo para identificar padrões de sucesso e oportunidades de diferenciação na experiência Honda.",
        },
        {
          title: "Redesign do fluxo",
          description:
            "Implementação de preenchimento automático (autofill), exibição dinâmica de concessionárias baseada em geolocalização e personalização visual por campanha.",
        },
        {
          title: "Validação e iteração",
          description:
            "Monitoramento contínuo de métricas pós-implementação para validar hipóteses e iterar sobre a solução.",
        },
      ],
      results: [
        "Redução significativa na quantidade de cliques necessários",
        "Aumento na taxa de preenchimento do formulário",
        "Experiência personalizada por campanha e localização",
        "Decisões de design embasadas em dados comportamentais",
      ],
      learnings:
        "Este projeto consolidou a importância de usar dados comportamentais reais (não apenas heurísticas) para fundamentar decisões de design, especialmente em contextos onde cada ponto percentual de conversão tem impacto direto no negócio.",
    },
  ],
  en: [
    {
      id: "keoto",
      image: "/keoto.jpg",
      tag: "SaaS Platform",
      year: "2025",
      accentColor: "accent",
      confidential: true,
      title: "Keoto",
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
          description:
            "Analysis of competing platforms and SaaS products in the same segment to identify UX patterns, best practices for information organization, and simplification opportunities.",
        },
        {
          title: "Design System",
          description:
            "Structuring tokens (colors, typography, spacing, states), reusable components (buttons, inputs, selects, modals, cards, tables, navigation) and scalable patterns.",
        },
        {
          title: "Engineering alignment",
          description:
            "Interface structured considering shadcn/ui and Tailwind CSS, ensuring consistency between design and code and faster implementation.",
        },
        {
          title: "Design leadership",
          description:
            "Coordination of two junior designers, dividing features, reviewing interfaces and ensuring visual consistency throughout the product.",
        },
      ],
      results: [
        "Design system structured from the beginning of the product",
        "Reusable components accelerating development",
        "Direct alignment between design and engineering",
        "Visual foundation ready to scale",
      ],
      learnings:
        "This project reinforced the importance of structuring a design system from the start and the impact that alignment between design and engineering has on the development speed of a SaaS.",
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
          title: "AS IS Analysis",
          description:
            "Mapping of existing flows (sale, return, exchange, service order, customer and product lookup) identifying bottlenecks and pain points per journey.",
        },
        {
          title: "Ideation and Prototyping",
          description:
            "Redesign of main flows with progress indicators, dynamic tables, multiple payment selection, optimized order summary and automatic sending via email/WhatsApp.",
        },
        {
          title: "Feature Backlog",
          description:
            "Organization of all improvements and new features with flow stage, affected screen, component area, functionality, business rules and navigation flow.",
        },
      ],
      results: [
        "Reduced service time in stores",
        "Increased satisfaction among sales associates",
        "Reduced switching between systems",
        "Agility in the most critical journeys",
      ],
      learnings:
        "This project reinforced the importance of deeply understanding the operational context of users (in-store sales associates) before proposing solutions, and how the simplification of internal flows has a direct impact on the end customer experience.",
    },
    {
      id: "leiteiro",
      image: "/leiteiro.jpg",
      tag: "Multilateral Platform",
      year: "2024",
      accentColor: "accent-4",
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
          title: "Approach strategy",
          description:
            "Mobile-first for the end user (simple screens, direct text, guided flows) and modular structure for administrative profiles (tables, CRUDs, visual filters, colored statuses).",
        },
        {
          title: "Design System",
          description:
            "Color palette with alerts and neutral themes, structured typography, custom icons for the agro sector and reusable components.",
        },
        {
          title: "3 distinct journeys",
          description:
            "Customer (landing > payment > data submission > tracking > download), Company (login > product registration > user management) and Leiteiro Analyst (product approval, data analysis, compliance).",
        },
      ],
      results: [
        "Intuitive experience for users with low digital familiarity",
        "Robust administrative dashboards without compromising usability",
        "Scalable and accessible solution delivered in 3 months",
        "Complete control of the design system to final flows",
      ],
      learnings:
        "The biggest learning was building an intuitive experience for users with little digital familiarity, without compromising the robustness and autonomy of administrative profiles.",
    },
    {
      id: "honda",
      image: "/honda.jpg",
      tag: "Conversion Optimization",
      year: "2024",
      accentColor: "accent-3",
      title: "Honda Automóveis",
      subtitle: "Optimization of user experience in interest forms",
      role: "UX Designer",
      duration: "2 months",
      scope: "UX Research, UI, Optimization",
      overview:
        "Optimization of the user journey in Honda Automóveis interest forms. Through behavioral analysis with Crazy Egg and competitive benchmarks in the automotive sector, I restructured the form flow to reduce friction and increase conversion rate.",
      challenges: [
        "Forms with high abandonment rate",
        "Filling process with excessive clicks",
        "Lack of personalization by campaign and location",
        "Need for behavioral data to support decisions",
      ],
      process: [
        {
          title: "Behavioral analysis",
          description:
            "Use of Crazy Egg to map heatmaps, scroll maps and session recordings. Identification of exact abandonment and friction points in the form flow.",
        },
        {
          title: "Competitive benchmark",
          description:
            "Analysis of competitor forms in the automotive sector to identify success patterns and differentiation opportunities in the Honda experience.",
        },
        {
          title: "Flow redesign",
          description:
            "Implementation of autofill, dynamic dealership display based on geolocation and visual personalization by campaign.",
        },
        {
          title: "Validation and iteration",
          description:
            "Continuous monitoring of post-implementation metrics to validate hypotheses and iterate on the solution.",
        },
      ],
      results: [
        "Significant reduction in the number of clicks required",
        "Increased form completion rate",
        "Personalized experience by campaign and location",
        "Design decisions backed by behavioral data",
      ],
      learnings:
        "This project consolidated the importance of using real behavioral data (not just heuristics) to support design decisions, especially in contexts where each percentage point of conversion has a direct impact on the business.",
    },
  ],
};
