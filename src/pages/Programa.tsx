import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpen, ScrollText, Building2, Landmark, Scale,
  Gavel, Briefcase, Heart, Shield, PiggyBank, GitBranch,
  Link2, FileText, GanttChart, Crosshair, Layers, Library,
  AlertTriangle, Star
} from "lucide-react";
import type { ElementType } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

// ─── Interdisciplinary Data ─────────────────────────────────

interface DisciplineRef {
  name: string;
  icon: ElementType;
}

interface CrossCuttingNorm {
  name: string;
  shortName: string;
  legislation: string;
  description: string;
  disciplines: DisciplineRef[];
}

interface CrossCuttingTheme {
  name: string;
  description: string;
  disciplines: DisciplineRef[];
}

const disciplineMap: Record<string, DisciplineRef> = {
  "constitucional": { name: "Direito Constitucional", icon: Gavel },
  "administrativo": { name: "Direito Administrativo", icon: Building2 },
  "civil": { name: "Direito Civil e Consumidor", icon: Scale },
  "processual-civil": { name: "Direito Processual Civil", icon: Shield },
  "tributario": { name: "Direito Tributário e Financeiro", icon: PiggyBank },
  "ambiental": { name: "Direito Ambiental e Urbanístico", icon: Landmark },
  "trabalho": { name: "Direito do Trabalho e Processo do Trabalho", icon: Briefcase },
  "previdenciario": { name: "Direito Previdenciário", icon: Heart },
  "legislacao": { name: "Legislação Profissional", icon: ScrollText },
  "portugues": { name: "Língua Portuguesa", icon: BookOpen },
};

const crossCuttingNorms: CrossCuttingNorm[] = [
  {
    name: "LINDB",
    shortName: "LINDB",
    legislation: "Decreto-Lei nº 4.657/1942 e Lei nº 13.655/2018",
    description: "Lei de Introdução às Normas do Direito Brasileiro — normas de vigência, interpretação, eficácia, segurança jurídica e responsabilidade de agentes públicos.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.civil!],
  },
  {
    name: "LGPD",
    shortName: "LGPD",
    legislation: "Lei nº 13.709/2018",
    description: "Lei Geral de Proteção de Dados Pessoais — disciplina o tratamento de dados pessoais por entes públicos e privados.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.civil!],
  },
  {
    name: "Estatuto da Cidade",
    shortName: "Estatuto da Cidade",
    legislation: "Lei nº 10.257/2001",
    description: "Estabelece normas de ordem pública e interesse social que regulam o uso da propriedade urbana em prol do bem coletivo.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.ambiental!],
  },
  {
    name: "Lei de Improbidade Administrativa",
    shortName: "LIA",
    legislation: "Lei nº 8.429/1992",
    description: "Dispõe sobre as sanções aplicáveis em caso de enriquecimento ilícito, prejuízo ao erário e violação aos princípios da administração pública.",
    disciplines: [disciplineMap.administrativo!, disciplineMap["processual-civil"]!],
  },
  {
    name: "Mandado de Segurança",
    shortName: "Mandado de Segurança",
    legislation: "Lei nº 12.016/2009",
    description: "Remédio constitucional para proteger direito líquido e certo contra ato ilegal ou abusivo de autoridade pública.",
    disciplines: [disciplineMap.constitucional!, disciplineMap["processual-civil"]!, disciplineMap.tributario!],
  },
  {
    name: "Lei do Parcelamento do Solo Urbano",
    shortName: "Parcelamento do Solo",
    legislation: "Lei nº 6.766/1979",
    description: "Dispõe sobre o parcelamento do solo urbano e suas modalidades (loteamento e desmembramento).",
    disciplines: [disciplineMap.ambiental!, disciplineMap.civil!],
  },
  {
    name: "Lei de Regência da PGM Canoas",
    shortName: "PGM Canoas",
    legislation: "Lei Municipal nº 6.817/2025",
    description: "Lei de Regência da Procuradoria-Geral do Município de Canoas — organização, competências e funcionamento.",
    disciplines: [disciplineMap.legislacao!, disciplineMap.administrativo!],
  },
  {
    name: "Código Municipal de Meio Ambiente",
    shortName: "Código Meio Ambiente",
    legislation: "Lei Municipal nº 4.328/1998",
    description: "Código Municipal de Meio Ambiente de Canoas — normas de proteção ambiental no âmbito municipal.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.ambiental!],
  },
  {
    name: "Plano Diretor Urbano Ambiental",
    shortName: "PDUA",
    legislation: "Lei Municipal nº 5.961/2015",
    description: "Plano Diretor Urbano Ambiental de Canoas — diretrizes de ordenação territorial e desenvolvimento urbano.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.ambiental!],
  },
  {
    name: "Sistema Único de Saúde",
    shortName: "SUS",
    legislation: "Lei nº 8.080/1990",
    description: "Dispõe sobre a organização do Sistema Único de Saúde e as condições para a promoção, proteção e recuperação da saúde.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.constitucional!],
  },
  {
    name: "Reforma Tributária",
    shortName: "Reforma Tributária",
    legislation: "EC nº 132/2023",
    description: "Reforma do sistema tributário nacional — institui o IBS, CBS e IS (IVA dual) e altera o sistema de tributação sobre consumo.",
    disciplines: [disciplineMap.constitucional!, disciplineMap.tributario!],
  },
  {
    name: "Desapropriação",
    shortName: "Desapropriação",
    legislation: "Decreto-Lei nº 3.365/1941",
    description: "Dispõe sobre desapropriação por utilidade pública — procedimento, indenização e imissão na posse.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.ambiental!],
  },
];

const crossCuttingThemes: CrossCuttingTheme[] = [
  {
    name: "Responsabilidade Civil",
    description: "Teoria da responsabilidade civil nos diferentes ramos: responsabilidade objetiva do Estado, responsabilidade por dano ambiental e responsabilidade civil contratual e extracontratual.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.ambiental!, disciplineMap.civil!],
  },
  {
    name: "Prescrição e Decadência",
    description: "Institutos temporais que limitam o exercício de direitos e pretensões, com regras específicas em cada ramo jurídico.",
    disciplines: [disciplineMap.civil!, disciplineMap.trabalho!],
  },
  {
    name: "Terceirização",
    description: "Contratação de terceiros para prestação de serviços: conceito, tipos, efeitos e aplicação nos entes estatais.",
    disciplines: [disciplineMap.administrativo!, disciplineMap.trabalho!],
  },
  {
    name: "Função Social da Propriedade",
    description: "Princípio que condiciona o exercício do direito de propriedade ao atendimento de sua função social, com implicações urbanísticas e constitucionais.",
    disciplines: [disciplineMap.ambiental!, disciplineMap.constitucional!],
  },
  {
    name: "Execução Fiscal e Medida Cautelar Fiscal",
    description: "Procedimentos especiais de cobrança da dívida ativa e medidas assecuratórias do crédito tributário.",
    disciplines: [disciplineMap["processual-civil"]!, disciplineMap.tributario!],
  },
  {
    name: "Mediação e Arbitragem",
    description: "Métodos autocompositivos de resolução de conflitos: arbitragem (Lei nº 9.307/96) e mediação (Lei nº 13.140/15).",
    disciplines: [disciplineMap.civil!, disciplineMap["processual-civil"]!],
  },
  {
    name: "Funções Essenciais à Justiça",
    description: "Advocacia pública, Ministério Público e Defensoria Pública como funções essenciais à administração da justiça.",
    disciplines: [disciplineMap.constitucional!, disciplineMap["processual-civil"]!],
  },
];

const disciplines = [
  {
    id: "lingua-portuguesa",
    title: "Língua Portuguesa",
    icon: BookOpen,
    content: [
      {
        subtitle: "1. Textos",
        items: [
          "Leitura, compreensão e interpretação de textos.",
          "Vocabulário: significado e substituição contextual.",
          "Reorganização da estrutura de orações e períodos do texto.",
          "Mecanismos de coesão e coerência textual.",
          "Tipos e gêneros textuais.",
        ],
      },
      {
        subtitle: "2. Fono-ortografia",
        items: [
          "Relações entre fonemas e grafemas no português.",
          "Estrutura, divisão e classificação silábica.",
          "Processos fonológicos.",
        ],
      },
      {
        subtitle: "3. Morfossintaxe",
        items: [
          "Classes de palavras: classificação e uso.",
          "Processos de formação de palavras.",
          "Flexão nominal: gênero, número e grau.",
          "Flexão verbal: pessoas, tempos, número, modos, vozes e aspectos.",
          "Concordância nominal e verbal.",
          "Regência nominal e verbal.",
          "Relação entre classes de palavras e funções sintáticas.",
        ],
      },
      {
        subtitle: "4. Sintaxe",
        items: [
          "Funções sintáticas: sujeito, predicado, objeto, complementos, modificadores.",
          "Período simples e composto: relações de coordenação e subordinação.",
          "Análise sintática completa.",
          "Correlação entre concordância, regência e retomada.",
          "Organização sintática canônica e variações estilísticas.",
          "Emprego do sinal indicativo de crase.",
          "Colocação pronominal.",
        ],
      },
      {
        subtitle: "5. Semântica",
        items: [
          "Sinonímia, antonímia, polissemia.",
          "Homônimos e parônimos.",
          "Denotação e conotação.",
          "Figuras de linguagem (metáfora, comparação, metonímia, ironia, eufemismo, hipérbole, personificação etc.).",
          "Efeitos de sentido em textos argumentativos, literários e multimodais.",
        ],
      },
      {
        subtitle: "6. Variação Linguística",
        items: [
          "Variedades regionais, sociais, históricas e situacionais da língua portuguesa.",
          "Norma-padrão e usos sociais da língua.",
        ],
      },
      {
        subtitle: "7. Elementos Notacionais da Escrita",
        items: [
          "Ortografia oficial.",
          "Acentuação gráfica.",
          "Sinais de pontuação.",
          "Recursos gráficos e estilísticos: aspas, parênteses, travessão, negrito, itálico.",
          "Regularidades e irregularidades ortográficas na produção textual.",
        ],
      },
    ],
  },
  {
    id: "legislacao-profissional",
    title: "Legislação Profissional",
    icon: ScrollText,
    content: [
      {
        subtitle: "Legislação",
        items: [
          "Lei nº 8.906/1994 (Estatuto da Advocacia e a Ordem dos Advogados do Brasil).",
          "Regulamento Geral e Código de Ética e Disciplina da OAB.",
          "Lei Municipal nº 6.817/2025 (Lei de Regência da Procuradoria-Geral do Município de Canoas).",
        ],
      },
    ],
  },
  {
    id: "direito-administrativo",
    title: "Direito Administrativo",
    icon: Building2,
    content: [
      {
        subtitle: "Parte Geral",
        items: [
          "Estado, governo e administração pública: conceitos e elementos.",
          "Conceito, objeto e fontes do direito administrativo.",
          "Princípios expressos e implícitos da administração pública.",
          "Ato administrativo.",
          "Agentes públicos.",
          "Poderes da administração pública. Uso e abuso do poder.",
          "Regime jurídico-administrativo.",
          "Responsabilidade civil do Estado no direito brasileiro.",
          "Serviços públicos.",
          "Bens públicos.",
          "Organização administrativa.",
          "Controle da administração pública.",
          "Desestatização. Privatização. Delegação. Terceirização. Despolitização.",
          "Agentes e órgãos reguladores. Regulação normativa, executiva e judicante. Controle da atividade regulatória.",
        ],
      },
      {
        subtitle: "Licitações e Contratos",
        items: [
          "Licitações e contratos administrativos: disposições constitucionais e doutrinárias aplicáveis.",
          "A LINDB e o direito administrativo. Responsabilidade de agentes públicos na LINDB. Segurança jurídica e eficiência na aplicação do direito público.",
          "Decreto nº 11.462/2023 — Sistema de Registro de Preços.",
          "Decreto-Lei nº 201/1967 — Crimes de responsabilidade de prefeitos e vereadores.",
          "Decreto-Lei nº 3.365/1941 — Desapropriação por utilidade pública.",
          "Lei nº 10.257/2001 — Estatuto da Cidade.",
          "Lei nº 11.079/2004 — Licitação e Contratação de Parceria Público-Privada (PPP).",
          "Lei nº 11.107/2005 — Convênios e Consórcios públicos.",
          "Lei nº 12.232/2010 — Licitação para contratação de serviços de publicidade.",
          "Lei nº 12.462/2011 — Regime Diferenciado de Contratações Públicas.",
          "Lei nº 12.527/2011 — Lei de Acesso à Informação (LAI).",
          "Lei nº 12.846/2013 — Responsabilização de pessoas jurídicas (Lei Anticorrupção).",
          "Lei nº 13.019/2014 — Marco Regulatório das Organizações da Sociedade Civil (OSCs).",
          "Lei nº 13.303/2016 — Estatuto Jurídico das Empresas Públicas e Sociedades de Economia Mista.",
          "Lei nº 13.645/2017 — REURB.",
          "Lei nº 13.655/2018 — LINDB.",
          "Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais.",
          "Lei nº 14.133/2021 — Lei de Licitações e Contratos Administrativos.",
          "Lei nº 8.080/1990 — Dispõe sobre o Sistema Único de Saúde.",
          "Lei nº 8.429/1992 — Improbidade administrativa.",
          "Lei nº 8.987/1995 — Concessão e permissão de serviços públicos.",
          "Lei nº 9.784/1999 — Processo administrativo.",
        ],
      },
      {
        subtitle: "Legislação Municipal de Canoas",
        items: [
          "Decreto Municipal nº 110/2024 — Tratamento diferenciado e simplificado para ME/EPP.",
          "Decreto Municipal nº 240/2025 — Decreto regulamentar regência PGM.",
          "Decreto Municipal nº 45/2024 — Sistema de registro de preços.",
          "Decreto Municipal nº 462/2016 — PAD.",
          "Decreto Municipal nº 549/2023 — Fase interna das licitações.",
          "Decreto Municipal nº 59/2024 — Procedimento Administrativo Especial de Punição (PAEP) — Lei nº 14.133/21.",
          "Decreto Municipal nº 60/2024 — Diálogo Competitivo — Lei nº 14.133/21.",
          "Decreto Municipal nº 88/2013 — Decreto sobre procedimentos administrativos.",
          "Lei Complementar nº 6/2016 — Lei da Guarda Municipal.",
          "Lei Municipal 6.485/2021 — Reestrutura o Fundo de Assistência à Saúde do Servidor Municipal.",
          "Lei Municipal nº 2.214/1984 — Regime Jurídico dos Servidores Públicos do Município de Canoas.",
          "Lei Municipal nº 4.328/1998 — Código Municipal de Meio Ambiente.",
          "Lei Municipal nº 5.565/2010 — Criação da Fundação Municipal de Saúde de Canoas (FMSC).",
          "Lei Municipal nº 5.777/2013 — Quadro especial de servidores.",
          "Lei Municipal nº 5.877/2014 — Quadro geral de servidores.",
          "Lei Municipal nº 5.878/2014 — PEB.",
          "Lei Municipal nº 5.912/2015 — GRE e GR.",
          "Lei Municipal nº 5.961/2015 — Plano Diretor Urbano Ambiental PDUA.",
          "Lei Municipal nº 5909/2015 — Optantes pelo Subsídio.",
          "Lei Municipal nº 5910/2015 — Magistério- subsídio.",
          "Lei Municipal nº 6.485/2021 — Fundo de Assistência à Saúde do Servidor Municipal de Canoas.",
          "Lei Municipal nº 6.796/2025 — Lei da Estrutura Administrativa.",
          "Lei Municipal nº 6.817/2025 — Lei de Regência da PGM.",
          "Lei Municipal nº 6.883/2025 — RPV.",
          "Lei Orgânica do Município de Canoas.",
          "Portaria Municipal nº 228/2025 — Delegação de atribuições CANOASPREV demandas jurídicas.",
        ],
      },
    ],
  },
  {
    id: "direito-ambiental-urbanistico",
    title: "Direito Ambiental e Urbanístico",
    icon: Landmark,
    content: [
      {
        subtitle: "Direito Ambiental",
        items: [
          "Tutela constitucional do meio ambiente (Constituição Federal e Estadual).",
          "Princípios estruturantes do estado de direito ambiental.",
          "Competência constitucional, administrativa, legislativa e jurisdicional em matéria ambiental.",
          "Responsabilidade administrativa, civil e penal ambiental.",
          "Tutela processual ambiental.",
          "Licenciamento e fiscalização ambiental. Resolução CONAMA nº 237/1997.",
          "Avaliação Ambiental Integrada. Normas de cooperação para os entes federados em matéria ambiental.",
          "Lei Complementar Federal nº 140/2011.",
          "Lei nº 6.938/1981 (Política Nacional do Meio Ambiente).",
          "Lei nº 9.985/2000 (Sistema Nacional de Unidades de Conservação da Natureza — SNUC).",
          "Lei nº 12.651/2012 (Código Florestal).",
          "Lei nº 9.433/1997 (Política Nacional de Recursos Hídricos).",
          "Lei nº 11.445/2007 (Política Nacional do Saneamento Básico).",
        ],
      },
      {
        subtitle: "Direito Urbanístico",
        items: [
          "Função social da propriedade urbana.",
          "Direito urbanístico: Conceito e princípios. Direito à cidade.",
          "Ordenação, uso e ocupação do solo urbano.",
          "Licenças urbanísticas. Concessão urbanística.",
          "Responsabilidade administrativa, infrações e sanções administrativas.",
          "Responsabilidade civil e penal urbanística.",
          "Parcelamento do solo urbano. Regularização fundiária urbanística.",
          "Desapropriação urbanística.",
          "Proteção do patrimônio cultural.",
          "Lei nº 10.257/2001 (Estatuto da Cidade).",
          "Lei nº 6.766/1979 (Lei do Parcelamento do Solo Urbano).",
        ],
      },
      {
        subtitle: "Legislação Municipal de Canoas",
        items: [
          "Lei Municipal nº 4.328/1998 (Código Municipal de Meio Ambiente).",
          "Lei Municipal nº 5.961/2015 (Plano Diretor Urbano Ambiental — PDUA).",
        ],
      },
    ],
  },
  {
    id: "direito-civil-consumidor",
    title: "Direito Civil e Consumidor",
    icon: Scale,
    content: [
      {
        subtitle: "Parte Geral",
        items: [
          "Lei de Introdução às Normas do Direito Brasileiro — LINDB. Vigência, aplicação, obrigatoriedade, interpretação e integração das leis. Conflito das leis no tempo. Eficácia das leis no espaço.",
          "Pessoas naturais e Pessoas jurídicas. Capacidade civil, direitos e responsabilidades inerentes à personalidade.",
          "Bens no Código Civil.",
          "Teorias e aplicação do fato, ato e negócio jurídico, inclusive elementos incidentais, defeitos e invalidade do negócio jurídico.",
          "Nulidade e anulabilidade do negócio jurídico.",
          "Atos jurídicos lícitos e ilícitos.",
          "Teorias sobre o dano moral, dano estético, dano coletivo e dano social.",
          "Prescrição e decadência.",
          "Prova: teoria geral e meios de prova.",
        ],
      },
      {
        subtitle: "Obrigações e Contratos",
        items: [
          "Direito das obrigações.",
          "Contratos: disposições gerais do Código Civil, extinção do contrato. Classificação dos contratos.",
          "Contratos preliminares e definitivos. Interpretação dos contratos.",
          "Contratos típicos dispostos no Código Civil: compra e venda, troca, contrato estimatório, doação, locação, comodato, prestação de serviços, empreitada, mandato, transporte, seguro, fiança, transação e compromisso.",
          "Institutos da supressio e do comportamento contraditório (venire contra factum proprium).",
          "Atos unilaterais.",
        ],
      },
      {
        subtitle: "Responsabilidade Civil",
        items: [
          "Responsabilidade civil de indenizar (extracontratual, pré-contratual, contratual e pós-contratual).",
          "Teoria da responsabilidade civil objetiva.",
        ],
      },
      {
        subtitle: "Direitos Reais e Empresa",
        items: [
          "Direito de empresa.",
          "Posse.",
          "Direitos reais: propriedade, superfície, servidões, usufruto, uso e habitação.",
          "Direito do promitente comprador.",
          "Direitos reais de garantia.",
        ],
      },
      {
        subtitle: "Registros Públicos",
        items: [
          "Noções gerais, registros, presunção de fé pública, prioridade, especialidade, legalidade, continuidade, transcrição, inscrição e averbação.",
          "Procedimento de dúvida.",
        ],
      },
      {
        subtitle: "Locações",
        items: [
          "Disposições gerais, locação em geral, sublocações, aluguel, deveres do locador e do locatário, direito de preferência, benfeitorias, garantias locatícias, penalidades civis, nulidades, locação residencial, locação para temporada, locação não residencial.",
        ],
      },
      {
        subtitle: "Legislação",
        items: [
          "Lei nº 10.406/2002 — Código Civil.",
          "Decreto-Lei nº 4.657/1942 (LINDB) — Lei de Introdução às Normas do Direito Brasileiro.",
          "Lei nº 8.078/1990 (CDC) — Código de Defesa do Consumidor.",
          "Lei nº 9.307/1996 — Arbitragem.",
          "Lei nº 13.140/2015 — Mediação e autocomposição de conflitos.",
          "Lei nº 6.766/1979 — Parcelamento do solo urbano.",
          "Lei nº 9.514/1997 — Alienação fiduciária de imóveis.",
          "Lei nº 13.709/2018 (LGPD) — Proteção de dados pessoais.",
          "Lei nº 8.245/1991 — Lei de Locações.",
          "Lei nº 15.040/2024 — Seguros privados.",
          "Lei nº 8.069/1990 — Estatuto da Criança e do Adolescente.",
          "Lei nº 6.015/1973 — Registros Públicos.",
          "Lei nº 8.245/1991 — Locação de Imóveis Urbanos.",
        ],
      },
    ],
  },
  {
    id: "direito-constitucional",
    title: "Direito Constitucional",
    icon: Gavel,
    content: [
      {
        subtitle: "Teoria da Constituição",
        items: [
          "História Constitucional do Brasil.",
          "Constitucionalismo, neoconstitucionalismo e pós-positivismo.",
          "Poder constituinte.",
          "Aplicabilidade das normas constitucionais: normas de eficácia plena, contida e limitada. Normas programáticas.",
          "Constituição da República Federativa do Brasil de 1988: Conceito, classificação e interpretação das normas constitucionais.",
          "Princípios fundamentais.",
        ],
      },
      {
        subtitle: "Direitos e Garantias Fundamentais",
        items: [
          "Direitos e garantias fundamentais.",
        ],
      },
      {
        subtitle: "Organização do Estado",
        items: [
          "Organização político-administrativa do Estado.",
          "O município na Federação. Autonomia municipal.",
          "Repartição das competências constitucionais. Competências municipais e interesse local.",
          "Administração pública.",
        ],
      },
      {
        subtitle: "Poderes e Funções",
        items: [
          "Poder Executivo.",
          "Poder Legislativo. Processo legislativo. Fiscalização contábil, financeira e orçamentária. Comissões parlamentares de inquérito.",
          "Poder Judiciário.",
          "Funções essenciais à justiça: Ministério público. Advocacia pública. Defensoria pública.",
        ],
      },
      {
        subtitle: "Controle de Constitucionalidade",
        items: [
          "Supremacia constitucional e controle de constitucionalidade das normas.",
          "Defesa do Estado e das instituições democráticas: Intervenção federal. Intervenção estadual nos municípios.",
          "Lei nº 11.417/2006 (Súmula vinculante).",
          "Lei nº 9.868/1999 — Controle concentrado de constitucionalidade (ADI, ADC).",
          "Lei nº 9.882/1999 — Arguição de Descumprimento de Preceito Fundamental (ADPF).",
        ],
      },
      {
        subtitle: "Sistema Tributário Nacional",
        items: [
          "Sistema Tributário Nacional: Princípios gerais. Limitações do poder de tributar.",
          "Impostos da União, dos estados e dos municípios. Repartição das receitas tributárias.",
          "Finanças e orçamento público.",
        ],
      },
      {
        subtitle: "Ordem Econômica e Social",
        items: [
          "Ordem econômica e financeira. Política urbana, agrícola e fundiária e reforma agrária.",
          "Sistema Financeiro Nacional: Finanças municipais. Tributos e outras receitas municipais. Orçamento municipal.",
          "Ordem social. Regime constitucional da propriedade: função social.",
          "Direito à saúde na ordem constitucional e legal. Sistema Único de Saúde.",
        ],
      },
      {
        subtitle: "Procuradoria-Geral do Município",
        items: [
          "Procuradoria Geral do Município: representação judicial e extrajudicial do município; consultoria e assessoramento jurídico do Poder Executivo; organização e funcionamento.",
        ],
      },
      {
        subtitle: "Reforma Tributária",
        items: [
          "Emenda Constitucional nº 132/2023 — Reforma Tributária — IBS, CBS e IS (IVA dual).",
        ],
      },
      {
        subtitle: "Legislação",
        items: [
          "Lei nº 12.016/2009 — Mandado de segurança individual e coletivo.",
          "Lei nº 13.300/2016 — Mandado de injunção individual e coletivo.",
          "Lei nº 9.507/1997 — Habeas data.",
        ],
      },
    ],
  },
  {
    id: "direito-trabalho",
    title: "Direito do Trabalho e Processo do Trabalho",
    icon: Briefcase,
    content: [
      {
        subtitle: "Direito Material do Trabalho",
        items: [
          "Princípios e fontes do direito do trabalho.",
          "Direitos constitucionais dos trabalhadores (Art. 7º da Constituição Federal de 1988).",
          "Relação de trabalho e relação de emprego. Vínculo empregatício como categoria jurídica.",
          "Sujeitos do vínculo empregatício. Empregador e capacidade jurídica. Responsabilidade solidária.",
          "Formação do vínculo empregatício. Contrato individual de trabalho.",
          "Alteração do vínculo empregatício. Vícios do consentimento em matéria trabalhista (dolo, erro, coação, simulação, fraude).",
          "Jornada de trabalho.",
          "Remuneração e salário. Salário mínimo.",
          "Aviso prévio. Férias. Décimo terceiro salário. FGTS.",
          "Equiparação salarial. Desvio de função.",
          "Suspensão, interrupção e rescisão do contrato de trabalho. Extinção do vínculo empregatício.",
          "Estabilidade e garantias provisórias de emprego.",
          "Segurança e medicina no trabalho.",
          "Terceirização: conceito, tipos e efeitos. Entes estatais e terceirização: prestação de serviços e locação de mão de obra.",
          "Administração Pública e tratamento derrogatório da norma trabalhista.",
          "Prescrição e decadência. Convenções e acordos coletivos de trabalho.",
          "Proteção ao trabalho do menor. Combate à exploração do trabalho na infância e juventude.",
          "Combate ao trabalho em condições análogas às de escravo.",
          "Teletrabalho.",
          "Direito de greve e serviços essenciais. O servidor público e a sindicalização.",
          "Decreto-Lei nº 5.452/1943 (Consolidação das Leis do Trabalho).",
        ],
      },
      {
        subtitle: "Direito Processual do Trabalho",
        items: [
          "Justiça do Trabalho: organização, estrutura, competência e Jurisdição.",
          "Os Juízes de Direito. Tribunais Regionais do Trabalho e Tribunal Superior do Trabalho: composição, funcionamento, jurisdição e competência.",
          "Ministério Público do Trabalho. Corregedoria. Reclamação Correicional e pedido de providências.",
          "Procedimentos nos Dissídios Individuais. Reclamação: inquérito, revelia, contestação, reconvenção, partes e procuradores.",
          "Substituição processual na Justiça do Trabalho.",
          "Audiência. Conciliação: instrução e julgamento.",
          "Provas no Processo do Trabalho: interrogatório e depoimento pessoal — confissão e consequências.",
          "Documentos: oportunidade de juntada, incidente de falsidade.",
          "Prova técnica: sistemática de realização das perícias.",
          "Testemunhas: compromissos, impedimentos e consequências.",
          "Justiça Gratuita.",
          "Execução: conceito e incidentes na fase executória. Sentença de Liquidação e Impugnação.",
          "Embargos de devedor e impugnação de credor.",
          "Procedimento nos dissídios coletivos: instauração de instância, conciliação e julgamento.",
          "Extensão das decisões e revisão. Ação de cumprimento.",
          "Sentença individual e sentença coletiva.",
          "Recursos no Processo do Trabalho: disposições gerais; efeitos suspensivo, devolutivo e regressivo; recursos no processo de cognição; recursos no processo de execução.",
          "Prescrição e decadência no processo do trabalho.",
        ],
      },
    ],
  },
  {
    id: "direito-previdenciario",
    title: "Direito Previdenciário",
    icon: Heart,
    content: [
      {
        subtitle: "Seguridade Social",
        items: [
          "Seguridade social: conceito, princípios, composição e financiamento.",
        ],
      },
      {
        subtitle: "Regime Geral de Previdência Social (RGPS)",
        items: [
          "Previdência social: regime geral, segurados, dependentes, filiação e carência.",
          "Custeio: fontes de financiamento e contribuições.",
          "Benefícios previdenciários: espécies, requisitos, aposentadorias, auxílios, pensão por morte, cálculo, manutenção e revisão.",
          "Regras atuais: idade mínima, tempo de contribuição e transição.",
        ],
      },
      {
        subtitle: "Regimes Próprios e Previdência Complementar",
        items: [
          "Regimes próprios: noções gerais e equilíbrio financeiro.",
          "Previdência complementar: conceitos básicos.",
        ],
      },
      {
        subtitle: "Assistência Social",
        items: [
          "Assistência social: benefício de prestação continuada (BPC) e requisitos.",
        ],
      },
      {
        subtitle: "Legislação",
        items: [
          "Constituição Federal de 1988 — Seguridade Social.",
          "Lei nº 8.213/1991 — Planos de benefícios da Previdência Social (RGPS).",
          "Lei nº 8.212/1991 — Organização e custeio da Seguridade Social.",
          "Emenda Constitucional nº 103/2019 — Reforma da Previdência.",
          "Lei nº 9.717/1998 — Regras gerais dos Regimes Próprios de Previdência Social (RPPS).",
          "LC nº 108/2001 — Previdência complementar dos entes públicos (fundos de pensão fechados).",
          "LC nº 109/2001 — Regime de previdência complementar.",
          "Lei nº 8.742/1993 (LOAS) — Benefício de Prestação Continuada (BPC).",
          "Lei Municipal nº 4.739/2003 — Cria o CANOASPREV.",
          "Lei Complementar nº 14/2025 — Reestrutura o Regime Próprio de Previdência Social do Município de Canoas.",
        ],
      },
    ],
  },
  {
    id: "direito-processual-civil",
    title: "Direito Processual Civil",
    icon: Shield,
    content: [
      {
        subtitle: "Parte Geral",
        items: [
          "Princípios gerais do Processo Civil.",
          "Lei nº 13.105/2015 (Código de Processo Civil). Normas processuais civis.",
          "Função jurisdicional.",
          "Ação: conceito, natureza, elementos e características, condições e classificação da ação, pressupostos processuais.",
          "Preclusão.",
          "Sujeitos do processo. Litisconsórcio. Intervenção de terceiros.",
          "Poderes, deveres e responsabilidade do juiz. Ministério público. Advocacia pública. Defensoria pública.",
          "Atos processuais: forma dos atos; tempo e lugar; prazos; comunicação dos atos processuais; nulidades; distribuição e registro; valor da causa.",
        ],
      },
      {
        subtitle: "Tutela Provisória e Procedimentos",
        items: [
          "Tutela provisória: Disposições gerais; Tutela de urgência.",
          "Formação, suspensão e extinção do processo.",
          "Processo de conhecimento e do cumprimento de sentença: Disposições gerais.",
          "Procedimento comum. Petição inicial. Improcedência liminar do pedido.",
          "Audiência de conciliação ou de mediação.",
          "Contestação, reconvenção e revelia.",
          "Audiência de instrução e julgamento.",
          "Providências preliminares e do saneamento.",
          "Julgamento conforme o estado do processo.",
          "Provas.",
          "Sentença e coisa julgada.",
          "Cumprimento da sentença: Disposições gerais, cumprimento e liquidação.",
        ],
      },
      {
        subtitle: "Procedimentos Especiais e Recursos",
        items: [
          "Procedimentos especiais.",
          "Procedimentos de jurisdição voluntária.",
          "Processos de execução.",
          "Processos nos tribunais e meios de impugnação das decisões judiciais.",
          "Livro Complementar: Disposições finais e transitórias.",
        ],
      },
      {
        subtitle: "Ações Constitucionais e Legislação",
        items: [
          "Mandado de segurança.",
          "Ação popular.",
          "Ação civil pública.",
          "Ação de improbidade administrativa.",
          "Reclamação constitucional.",
          "Lei nº 13.105/2015 — Código de Processo Civil.",
          "Lei nº 6.830/1980 (LEF) — Lei de Execução Fiscal.",
          "Lei nº 7.347/1985 — Ação civil pública.",
          "Lei nº 4.717/1965 — Ação popular.",
          "Lei nº 9.469/1997 — Intervenção da União e das Fazendas Públicas em processos judiciais; acordos.",
          "Lei nº 8.397/1992 — Medida cautelar fiscal.",
          "Lei nº 12.153/2009 — Juizados Especiais da Fazenda Pública.",
        ],
      },
    ],
  },
  {
    id: "direito-tributario-financeiro",
    title: "Direito Tributário e Financeiro",
    icon: PiggyBank,
    content: [
      {
        subtitle: "Sistema Tributário Nacional",
        items: [
          "Limitações ao Poder de Tributar (Princípios Jurídicos da Tributação).",
          "Imunidades Genéricas e Específicas.",
          "Competência Tributária: Impostos da União, Estados, Distrito Federal e Municípios.",
          "Empréstimos Compulsórios. Contribuições sociais e outras contribuições.",
          "Repartição das Receitas Tributárias.",
        ],
      },
      {
        subtitle: "Código Tributário Nacional (CTN)",
        items: [
          "Conceito e natureza jurídica do tributo. Impostos, taxas, contribuições de melhoria.",
          "Normas Gerais de Direito Tributário: legislação tributária, fontes principais e secundárias, vigência, aplicação, interpretação e integração.",
          "Obrigação Tributária: tipos e objetos, fato gerador, sujeito ativo, sujeito passivo, solidariedade, capacidade tributária, domicílio tributário.",
          "Responsabilidade Tributária: responsabilidade dos sucessores, responsabilidade de terceiros, responsabilidade por infrações.",
          "Crédito Tributário: lançamento tributário, modalidades de lançamentos.",
          "Suspensão da exigibilidade do crédito tributário — modalidades.",
          "Extinção do crédito tributário — modalidades.",
          "Exclusão do crédito tributário — modalidades.",
          "Garantias e Privilégios do Crédito Tributário, preferências.",
          "Administração Tributária: Fiscalização; Dívida Ativa; Certidões negativas e positivas.",
        ],
      },
      {
        subtitle: "Processo Judicial Tributário",
        items: [
          "Execução Fiscal.",
          "Medida Cautelar Fiscal.",
          "Ação Anulatória de Lançamento Tributário.",
          "Ação Declaratória de Inexistência de Relação Jurídico-tributária.",
          "Ação de Repetição de Indébito.",
          "Ação Consignatória em matéria tributária.",
          "Mandado de Segurança.",
          "Crimes contra a ordem tributária.",
        ],
      },
      {
        subtitle: "Direito Financeiro e Orçamento",
        items: [
          "Finanças públicas na Constituição Federal de 1988.",
          "Orçamento: conceito e espécies, natureza jurídica, princípios orçamentários.",
          "Normas gerais de direito financeiro.",
          "Fiscalização e controle interno e externo dos orçamentos.",
          "Despesa pública. Conceito e classificação; disciplina constitucional dos precatórios.",
          "Receita pública. Conceito, ingressos e receitas. Classificação: receitas originárias e receitas derivadas.",
          "Dívida ativa de natureza tributária e não tributária; crédito público; dívida pública.",
        ],
      },
      {
        subtitle: "Legislação Municipal de Canoas",
        items: [
          "Lei Municipal nº 1.783/1977 — Código Tributário do Município de Canoas.",
          "Lei Municipal nº 1.943/1979 — Normas sobre tributos municipais (IPTU, ISSQN, ITBI, taxas, contribuição de melhoria); Conselho Municipal de Contribuintes; isenções de IPTU (art. 86).",
          "Lei Municipal nº 4.818/2003 — ISSQN — normas específicas, alíquotas e procedimentos do ISS no Município; altera a Lei nº 1.943/1979.",
          "Lei Municipal nº 5.503/2010 — ITBI — Imposto sobre a Transmissão Intervivos, por ato oneroso, de bens imóveis e de direitos reais a eles relativos.",
          "Decreto Municipal nº 701/2009 — Regulamenta o art. 95 da Lei nº 1.943/1979 — política permanente de financiamento e refinanciamento de créditos tributários e não tributários.",
          "Decreto Municipal nº 684/2003 — Dispõe sobre parcelamento de créditos tributários e não tributários.",
        ],
      },
      {
        subtitle: "Legislação Geral",
        items: [
          "Lei nº 5.172/1966 — Código Tributário Nacional.",
          "Constituição Federal de 1988 — Sistema Tributário Nacional.",
          "LC nº 116/2003 — Imposto sobre Serviços de Qualquer Natureza.",
          "LC nº 123/2006 — Simples Nacional — Microempresas e Empresas de Pequeno Porte.",
          "LC nº 214/2025 — IBS, CBS e IS — regulamentação da Reforma Tributária (EC 132/2023).",
          "Decreto nº 70.235/1972 — Processo Administrativo Fiscal Federal (aplicado subsidiariamente ao PAF municipal).",
          "Lei nº 4.320/1964 — Normas gerais de direito financeiro e orçamento público; receita tributária e dívida ativa.",
          "Constituição Federal de 1988 — Finanças públicas, orçamento e dívida pública.",
          "LC nº 101/2000 (LRF) — Lei de Responsabilidade Fiscal.",
          "LC nº 131/2009 — Transparência fiscal.",
          "Lei nº 10.028/2000 — Crimes contra as finanças públicas.",
        ],
      },
    ],
  },
];

const iconMap: Record<string, ElementType> = {
  "lingua-portuguesa": BookOpen,
  "legislacao-profissional": ScrollText,
  "direito-administrativo": Building2,
  "direito-ambiental-urbanistico": Landmark,
  "direito-civil-consumidor": Scale,
  "direito-constitucional": Gavel,
  "direito-trabalho": Briefcase,
  "direito-previdenciario": Heart,
  "direito-processual-civil": Shield,
  "direito-tributario-financeiro": PiggyBank,
};

export default function Programa() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="text-sm font-medium tracking-tight text-foreground">
            PGM Canoas — 2026
          </span>
        </div>
      </header>

      {/* Intro */}
      <section className="pt-12 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3 text-foreground">
              Programa de Estudos
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Conteúdo programático completo conforme o <strong>Anexo III do Edital nº 125/2026</strong> do
              Concurso Público para <strong>Procurador Municipal</strong> da Procuradoria-Geral do Município
              de Canoas. Organizado por disciplina para facilitar sua preparação.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
                {disciplines.length} disciplinas
              </span>
              <span className="inline-flex items-center text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
                Edital nº 125/2026
              </span>
              <span className="inline-flex items-center text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
                Instituto Objetiva
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="detalhado" className="w-full">
            <TabsList className="w-full sm:w-auto mb-8">
              <TabsTrigger value="detalhado" className="text-xs sm:text-sm gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Programa Detalhado
              </TabsTrigger>
              <TabsTrigger value="interdisciplinar" className="text-xs sm:text-sm gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                Observações Interdisciplinares
              </TabsTrigger>
            </TabsList>

            {/* ─── TAB 1: Programa Detalhado ───────────── */}
            <TabsContent value="detalhado" className="mt-0">
              <Accordion type="single" collapsible className="space-y-2">
                {disciplines.map((discipline, i) => {
                  const Icon = iconMap[discipline.id] || BookOpen;
                  const isPortuguese = discipline.id === "lingua-portuguesa";
                  return (
                    <motion.div
                      key={discipline.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                    >
                      <AccordionItem
                        value={discipline.id}
                        className="border border-border bg-card data-[state=open]:bg-muted/30 transition-colors"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3 text-left flex-1">
                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium text-foreground">
                              {discipline.title}
                            </span>
                            {isPortuguese && (
                              <Link
                                to="/lingua-portuguesa"
                                onClick={(e) => e.stopPropagation()}
                                className="ml-auto text-[11px] text-muted-foreground hover:text-foreground bg-muted px-2 py-0.5 rounded-sm transition-colors shrink-0"
                              >
                                Dashboard ›
                              </Link>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6">
                          <div className="pt-2 space-y-6">
                            {discipline.content.map((section, idx) => (
                              <div key={idx}>
                                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                  {section.subtitle}
                                </h3>
                                <ul className="space-y-1.5">
                                  {section.items.map((item, itemIdx) => (
                                    <li
                                      key={itemIdx}
                                      className="text-sm text-foreground/80 leading-relaxed pl-4 border-l border-border/50"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  );
                })}
              </Accordion>
            </TabsContent>

            {/* ─── TAB 2: Observações Interdisciplinares ─ */}
            <TabsContent value="interdisciplinar" className="mt-0">
              <div className="space-y-12">
                {/* Section Intro */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <GitBranch className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-medium text-foreground mb-1.5">Observações Interdisciplinares</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Com base no <strong>Anexo III do edital</strong>, este levantamento reúne as normas e temas
                        que apresentam <strong>incidência em múltiplas áreas</strong> do conteúdo programático.
                        O estudo desses pontos é estratégico, pois revela os assuntos de maior relevância transversal
                        para a prova de <strong>Procurador Municipal</strong>. A prova de produção escrita (peça e
                        discursivas) buscará, sempre que possível, a interdisciplinaridade entre essas áreas.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 mb-2">
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <FileText className="w-3 h-3" />
                      {crossCuttingNorms.length} normas transversais
                    </Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Link2 className="w-3 h-3" />
                      {crossCuttingThemes.length} temas coincidentes
                    </Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Crosshair className="w-3 h-3" />
                      Estudo estratégico
                    </Badge>
                  </div>
                </motion.div>

                {/* ── Section 1: Normas Transversais ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-border/50" />
                    <div className="flex items-center gap-2 px-3">
                      <Layers className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">
                        Normas com Incidência em Múltiplas Áreas
                      </h3>
                    </div>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>

                  <div className="grid gap-3">
                    {crossCuttingNorms.map((norm, idx) => {
                      const Icon = norm.disciplines.length > 2 ? Library : FileText;
                      return (
                        <motion.div
                          key={norm.shortName}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + idx * 0.04, duration: 0.3 }}
                          className="border border-border bg-card rounded-lg p-4 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-medium text-foreground">{norm.name}</h4>
                                <span className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                                  {norm.legislation}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {norm.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 ml-11">
                            {norm.disciplines.map((d) => (
                              <Badge
                                key={d.name}
                                variant="outline"
                                className="gap-1 text-[11px] py-0.5 h-auto"
                              >
                                <d.icon className="w-3 h-3" />
                                {d.name}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* ── Section 2: Temas Transversais ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-border/50" />
                    <div className="flex items-center gap-2 px-3">
                      <GanttChart className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">
                        Temas e Assuntos Repetidos
                      </h3>
                    </div>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>

                  <div className="grid gap-3">
                    {crossCuttingThemes.map((theme, idx) => (
                      <motion.div
                        key={theme.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.04, duration: 0.3 }}
                        className="border border-border bg-card rounded-lg p-4 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-foreground">{theme.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {theme.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 ml-11">
                          {theme.disciplines.map((d) => (
                            <Badge
                              key={d.name}
                              variant="outline"
                              className="gap-1 text-[11px] py-0.5 h-auto"
                            >
                              <d.icon className="w-3 h-3" />
                              {d.name}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* ── Section 3: Observações do Edital ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-border/50" />
                    <div className="flex items-center gap-2 px-3">
                      <Star className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">
                        Observações Importantes do Edital
                      </h3>
                    </div>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>

                  <div className="border border-border bg-card rounded-lg p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">1</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        A prova engloba o conhecimento das <strong>normas</strong> junto com{' '}
                        <strong>doutrina</strong> e <strong>posicionamentos jurisprudenciais</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">2</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        As normas devem ser consideradas em sua{' '}
                        <strong>totalidade</strong> e com as <strong>alterações vigentes</strong> até a
                        publicação do edital.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">3</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        A prova de <strong>produção escrita</strong> (peça e discursivas) buscará,
                        sempre que possível, a <strong>interdisciplinaridade</strong> entre as áreas
                        do conteúdo programático.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Footer Tip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="border border-border/50 bg-muted/30 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Dica estratégica:</strong> Priorize o estudo
                      das normas e temas com incidência transversal. Cada hora dedicada a um desses
                      pontos rende aprendizado simultâneo para múltiplas disciplinas — otimizando sua
                      preparação para as provas objetiva, discursiva e de peça profissional.
                    </p>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Conteúdo baseado no Edital nº 125/2026 — Instituto Objetiva
          </p>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Página inicial
          </Link>
        </div>
      </footer>
    </motion.div>
  );
}
