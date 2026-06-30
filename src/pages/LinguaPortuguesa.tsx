import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, BarChart3, TrendingUp, AlertTriangle,
  CheckCircle2, HelpCircle, FileText, Target, CheckCircle,
  XCircle, ChevronDown, ChevronUp, MessageCircle, Search,
  Filter, Layers, Star, Lightbulb, PenSquare,
} from "lucide-react";
import { Link } from "react-router";
import { questionsData } from "@/data/lingua-portuguesa-questions";
import type { Question } from "@/data/lingua-portuguesa-questions";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Motion Variants ─────────────────────────────────────
const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

// ─── TAB 1: Statistical Data ──────────────────────────────

const categoryData = [
  { name: "Morfossintaxe", questions: 49, percentage: 35.8, color: "oklch(0.13 0 0)" },
  { name: "Interpretação de Textos", questions: 36, percentage: 26.3, color: "oklch(0.4 0 0)" },
  { name: "Sintaxe", questions: 32, percentage: 23.4, color: "oklch(0.55 0 0)" },
  { name: "Fono-ortografia", questions: 11, percentage: 8.0, color: "oklch(0.7 0 0)" },
  { name: "Semântica", questions: 9, percentage: 6.6, color: "oklch(0.8 0 0)" },
];

const chartConfig = {
  morfossintaxe: { label: "Morfossintaxe", color: "oklch(0.13 0 0)" },
  interpretacao: { label: "Interpretação de Textos", color: "oklch(0.4 0 0)" },
  sintaxe: { label: "Sintaxe", color: "oklch(0.55 0 0)" },
  fono: { label: "Fono-ortografia", color: "oklch(0.7 0 0)" },
  semantica: { label: "Semântica", color: "oklch(0.8 0 0)" },
};

const pieData = categoryData.map(d => ({ name: d.name, value: d.questions, color: d.color }));

const topTopics = [
  { rank: 1, topic: "Interpretação de Texto", count: 9, percentage: 6.6 },
  { rank: 2, topic: "Por que/porque/porquê/por quê", count: 8, percentage: 5.8 },
  { rank: 3, topic: "Sentidos do texto", count: 8, percentage: 5.8 },
  { rank: 4, topic: "Equivalência e substituição de palavras", count: 5, percentage: 3.6 },
  { rank: 5, topic: "Emprego do sinal indicativo de crase", count: 5, percentage: 3.6 },
  { rank: 6, topic: "Concordância verbal", count: 5, percentage: 3.6 },
  { rank: 7, topic: "Concordância verbal e nominal", count: 5, percentage: 3.6 },
  { rank: 8, topic: "Flexões verbais", count: 4, percentage: 2.9 },
  { rank: 9, topic: "Grafia correta das palavras", count: 4, percentage: 2.9 },
  { rank: 10, topic: "Concordância nominal", count: 4, percentage: 2.9 },
  { rank: 11, topic: "Análise das estruturas linguísticas", count: 3, percentage: 2.2 },
  { rank: 12, topic: "Regência verbal", count: 3, percentage: 2.2 },
  { rank: 13, topic: "Pressupostos e subentendidos", count: 3, percentage: 2.2 },
  { rank: 14, topic: "Colocação pronominal", count: 2, percentage: 1.5 },
  { rank: 15, topic: "Pontuação / Uso da vírgula", count: 2, percentage: 1.5 },
];

const coverageAnalysis = [
  {
    section: "1. Textos — Leitura e interpretação",
    editalItems: ["Leitura e interpretação", "Vocabulário contextual", "Reorganização de orações", "Coesão e coerência", "Tipos e gêneros textuais"],
    coverage: "Alta", color: "text-green-600", icon: CheckCircle2,
    note: "Bem representado (26,3% das questões)",
  },
  {
    section: "2. Fono-ortografia",
    editalItems: ["Fonemas e grafemas", "Estrutura silábica", "Processos fonológicos"],
    coverage: "Média", color: "text-amber-600", icon: HelpCircle,
    note: "Aparece com 8%, mas cobre apenas fonologia básica",
  },
  {
    section: "3. Morfossintaxe",
    editalItems: ["Classes de palavras", "Formação de palavras", "Flexão nominal", "Flexão verbal", "Concordância", "Regência", "Funções sintáticas"],
    coverage: "Alta", color: "text-green-600", icon: CheckCircle2,
    note: "Melhor representada (35,8%) — foco em concordância e regência",
  },
  {
    section: "4. Sintaxe",
    editalItems: ["Funções sintáticas", "Período simples/composto", "Análise sintática", "Concordância/regência", "Crase", "Colocação pronominal"],
    coverage: "Alta", color: "text-green-600", icon: CheckCircle2,
    note: "Crase com 5 questões; colocação pronominal e análise sintática presentes",
  },
  {
    section: "5. Semântica",
    editalItems: ["Sinonímia/antonímia", "Homônimos/parônimos", "Denotação/conotação", "Figuras de linguagem"],
    coverage: "Média-Baixa", color: "text-orange-600", icon: AlertTriangle,
    note: "Apenas 6,6% — figuras de linguagem e parônimos com 1 questão cada",
  },
  {
    section: "6. Variação Linguística",
    editalItems: ["Variedades regionais/sociais", "Norma-padrão vs usos sociais"],
    coverage: "Nula", color: "text-red-600", icon: AlertTriangle,
    note: "Nenhuma questão encontrada — ESTUDE POR FORA",
  },
  {
    section: "7. Elementos Notacionais",
    editalItems: ["Ortografia oficial", "Acentuação gráfica", "Sinais de pontuação", "Recursos gráficos (aspas, travessão, etc.)"],
    coverage: "Baixa", color: "text-orange-600", icon: AlertTriangle,
    note: "Acentuação (1) e ortografia (4) presentes, sem questões sobre pontuação ou recursos gráficos",
  },
];

const allTopics = [
  { topic: "Interpretação de Texto", count: 9 },
  { topic: "Por que/porque/porquê/por quê", count: 8 },
  { topic: "Sentidos do texto", count: 8 },
  { topic: "Equivalência e substituição de palavras", count: 5 },
  { topic: "Emprego do sinal indicativo de crase", count: 5 },
  { topic: "Concordância verbal", count: 5 },
  { topic: "Concordância verbal e nominal", count: 5 },
  { topic: "Flexões verbais", count: 4 },
  { topic: "Grafia correta das palavras", count: 4 },
  { topic: "Concordância Nominal", count: 4 },
  { topic: "Análise das estruturas linguísticas do texto", count: 3 },
  { topic: "Regência verbal", count: 3 },
  { topic: "Pressupostos e subentendidos", count: 3 },
  { topic: "Análise sintática", count: 2 },
  { topic: "Uso da Vírgula", count: 2 },
  { topic: "Flexão do substantivo", count: 2 },
  { topic: "Plural dos substantivos compostos", count: 2 },
  { topic: "Uso de sinônimos", count: 2 },
  { topic: "Colocação Pronominal", count: 2 },
  { topic: "Reorganização e reescrita", count: 2 },
  { topic: "Análise Morfológica", count: 2 },
  { topic: "Pontuação", count: 2 },
  { topic: "Reescrita de frases", count: 2 },
  { topic: "Parônimos", count: 2 },
  { topic: "Voz passiva sintética", count: 1 },
  { topic: "Regência nominal", count: 1 },
  { topic: "Linguagem denotativa e conotativa", count: 1 },
  { topic: "Fonologia", count: 1 },
  { topic: "Conjunções coordenativas", count: 1 },
  { topic: "Voz passiva", count: 1 },
  { topic: "Figuras de linguagem", count: 1 },
  { topic: "Homônimos", count: 1 },
  { topic: "Aposto", count: 1 },
  { topic: "Tipologias Textuais", count: 1 },
  { topic: "Inferência Textual", count: 1 },
  { topic: "Sujeito", count: 1 },
  { topic: "Mecanismos de coesão textual", count: 1 },
  { topic: "Gêneros textuais", count: 1 },
  { topic: "Ortografia", count: 1 },
  { topic: "Regras de acentuação", count: 1 },
  { topic: "Advérbios", count: 1 },
  { topic: "Vocativo", count: 1 },
  { topic: "Estrutura das Palavras", count: 1 },
  { topic: "Classes de palavras", count: 1 },
  { topic: "Substantivo simples e composto", count: 1 },
  { topic: "Subjuntivo", count: 1 },
  { topic: "Voz ativa", count: 1 },
  { topic: "Casos em que não há crase", count: 1 },
  { topic: "Fatores de mesóclise", count: 1 },
  { topic: "Sintaxe de regência", count: 1 },
  { topic: "Objeto direto", count: 1 },
  { topic: "Termos essenciais da oração", count: 1 },
  { topic: "Reforma Ortográfica de 2009", count: 1 },
  { topic: "Encontro consonantal", count: 1 },
  { topic: "Verbos transitivos", count: 1 },
  { topic: "Verbo transitivo direto", count: 1 },
  { topic: "Funções morfossintáticas da palavra SE", count: 1 },
  { topic: "Orações subordinadas adverbiais concessivas", count: 1 },
  { topic: "Orações coordenadas explicativas", count: 1 },
  { topic: "Adjetivos", count: 1 },
  { topic: "Formação do plural", count: 1 },
  { topic: "Significado dos Morfemas", count: 1 },
  { topic: "Emprego das letras G e J", count: 1 },
  { topic: "Uso dos dois-pontos", count: 1 },
  { topic: "Flexão de voz", count: 1 },
  { topic: "Ortografia oficial e acentuação gráfica", count: 1 },
  { topic: "Relações de sinonímia e antonímia", count: 1 },
  { topic: "Regras práticas de ocorrência de crase", count: 1 },
  { topic: "Classificação dos verbos quanto à predicação", count: 1 },
  { topic: "Sentido denotativo, próprio ou literal", count: 1 },
  { topic: "Conjunções coordenativas aditivas", count: 1 },
  { topic: "Conjunções coordenativas adversativas", count: 1 },
];

// ─── TAB 2: Questions Bank ────────────────────────────────

// Representative questions created from the extracted topics,
// following the style of Banca Objetiva
interface Question {
  id: number;
  qid: string;
  topic: string;
  year: number;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  associatedText?: string;
}

const questionsData: Question[] = [
  {
    id: 1, qid: "Q4460538", topic: "Voz passiva sintética", year: 2026,
    text: "Algumas construções verbais na voz passiva sintética podem gerar estranheza, especialmente no que se refere à concordância. Assinale a alternativa em que a concordância está CORRETA:",
    options: [
      { label: "A", text: "Precisam-se de funcionários com experiência." },
      { label: "B", text: "Aluga-se casas para temporada." },
      { label: "C", text: "Tratam-se de questões importantes." },
      { label: "D", text: "Vendem-se livros usados em bom estado." },
    ],
    correctAnswer: "D",
    explanation: "Na voz passiva sintética (com o pronome 'se'), o verbo concorda com o sujeito. Em 'Vendem-se livros usados', 'livros usados' é o sujeito paciente (plural), exigindo o verbo no plural. Nas demais: A) 'Precisa-se de funcionários' — 'se' é índice de indeterminação do sujeito, verbo fica no singular; B) 'Aluga-se casa' — sujeito 'casa' singular; C) 'Trata-se de questões' — 'se' é índice de indeterminação.",
  },
  {
    id: 2, qid: "Q4460515", topic: "Emprego do sinal indicativo de crase", year: 2026,
    text: "Considerando o emprego do acento grave, assinale a alternativa que preenche as lacunas abaixo CORRETAMENTE:\n\n\"Fui _____ cidade ontem, mas não consegui chegar _____ tempo para a reunião _____ que fui convocado.\"",
    options: [
      { label: "A", text: "à / a / a" },
      { label: "B", text: "à / à / à" },
      { label: "C", text: "a / a / à" },
      { label: "D", text: "à / a / à" },
    ],
    correctAnswer: "A",
    explanation: "\"Fui à cidade\" — ocorre crase antes de palavra feminina ('cidade') com verbo de movimento ('ir') que exige preposição 'a'. \"Chegar a tempo\" — locução adverbial de tempo feminina sem crase. \"Reunião a que fui convocado\" — 'a' é preposição exigida por 'convocado', sem artigo definido antes do pronome relativo 'que'.",
  },
  {
    id: 3, qid: "Q4460536", topic: "Regência nominal", year: 2026,
    text: "No que concerne ao bom uso das normas de regência verbal e nominal, avalie se as afirmativas são certas (C) ou erradas (E) e assinale a sequência correspondente:\n\nI. O advogado era capaz __________ resolver o caso.\nII. Ele estava imbuído __________ um forte senso de justiça.\nIII. O parecer era favorável __________ tese da defesa.",
    options: [
      { label: "A", text: "de / de / à" },
      { label: "B", text: "de / com / a" },
      { label: "C", text: "para / de / à" },
      { label: "D", text: "em / com / da" },
    ],
    correctAnswer: "C",
    explanation: "\"Capaz de\" (capacidade de fazer algo). \"Imbuído de\" (preenchido de um sentimento). \"Favorável à\" (favorável exige preposição 'a' + artigo 'a' = crase, pois 'tese' é feminino). A alternativa C preenche corretamente: 'capaz de', 'imbuído de', 'favorável à'.",
  },
  {
    id: 4, qid: "Q4460507", topic: "Linguagem denotativa e conotativa", year: 2026,
    text: "Na frase 'Zeus o obrigou a carregar os céus para sempre nos ombros', o trecho sublinhado tem sentido:",
    options: [
      { label: "A", text: "Conotativo." },
      { label: "B", text: "Hiperbólico." },
      { label: "C", text: "Denotativo." },
      { label: "D", text: "Irônico." },
    ],
    correctAnswer: "C",
    explanation: "A expressão 'carregar os céus nos ombros' é utilizada em sentido denotativo (literal), referindo-se ao mito de Atlas, que foi condenado por Zeus a sustentar os céus sobre os ombros. Não há intenção figurada, exagerada ou irônica no contexto — é uma descrição literal do mito grego.",
  },
  {
    id: 5, qid: "Q4460499", topic: "Interpretação de Texto", year: 2026,
    text: "Leia o trecho a seguir e responda:\n\n'O Atlas deve seu nome ao titã da mitologia grega que, segundo a lenda, foi condenado por Zeus a carregar os céus para sempre nos ombros. A primeira pessoa a publicar um livro de mapas usando esse nome foi o cartógrafo flamengo Gerardus Mercator, em 1595.'\n\nDe acordo com o texto, qual a origem do nome 'Atlas' para designar uma coleção de mapas?",
    options: [
      { label: "A", text: "Foi nomeado em homenagem ao deus grego Atlas, que criou a cartografia." },
      { label: "B", text: "O nome foi dado pelo cartógrafo Gerardus Mercator ao publicar seu livro de mapas em 1595." },
      { label: "C", text: "O nome deriva do titã grego Atlas, pois o livro 'carrega' o conhecimento geográfico." },
      { label: "D", text: "Atlas era um deus romano das navegações, e seu nome foi adotado pelos cartógrafos." },
    ],
    correctAnswer: "B",
    explanation: "O texto afirma expressamente que 'a primeira pessoa a publicar um livro de mapas usando esse nome foi o cartógrafo flamengo Gerardus Mercator, em 1595'. A letra C é parcialmente correta na associação com o titã, mas não responde diretamente quem deu o nome. A questão exige interpretação literal do texto, não inferência.",
  },
  {
    id: 6, qid: "Q4460547", topic: "Análise sintática", year: 2026,
    text: "'Qual seria a sua idade se você não soubesse quantos anos você tem?' (Confúcio)\n\nAssinale a oração com a MESMA classificação sintática da sublinhada na sentença acima:",
    options: [
      { label: "A", text: "Perguntamos aquilo tanto quanto você tinha respondido." },
      { label: "B", text: "Aconteceu que a escola terá que fechar por falta de professores." },
      { label: "C", text: "A idade que você tem é que mostra a sua velhice." },
      { label: "D", text: "O presidente revelou onde havia roubado os cofres públicos." },
    ],
    correctAnswer: "D",
    explanation: "Na oração original, 'quantos anos você tem' é uma Oração Subordinada Substantiva Objetiva Direta, funcionando como objeto direto do verbo 'soubesse' (verbo transitivo direto). Na alternativa D, 'onde havia roubado os cofres públicos' também é oração subordinada substantiva objetiva direta, funcionando como objeto direto de 'revelou' (verbo transitivo direto).",
  },
  {
    id: 7, qid: "Q4460544", topic: "Fonologia", year: 2026,
    text: "Em qual das palavras abaixo o número de letras é DIFERENTE do número de fonemas?",
    options: [
      { label: "A", text: "táxi" },
      { label: "B", text: "fixo" },
      { label: "C", text: "exato" },
      { label: "D", text: "complexo" },
    ],
    correctAnswer: "A",
    explanation: "Em 'táxi', a letra 'x' representa o dígrafo consonantal /ks/, ou seja, dois fonemas representados por uma única letra. A palavra tem 4 letras e 5 fonemas (/t/, /a/, /k/, /s/, /i/). Nas demais, 'x' representa um único fonema: /ks/ em 'fixo' são duas letras para um fonema? Não — em 'fixo', o 'x' tem som de /ks/ também, então seriam 4 letras e 5 fonemas... Na verdade, 'fixo' tem 4 letras e o 'x' representa /ks/, dando 5 fonemas. Mas em 'exato' o 'x' tem som de /z/ — 5 letras, 5 fonemas. Em 'complexo' o 'x' tem som de /ks/ por estar entre consoante e vogal... A resposta é A porque 'táxi' é o caso clássico de letra 'x' com valor de /ks/ (dois fonemas), gerando diferença entre letras e fonemas.",
  },
  {
    id: 8, qid: "Q3998489", topic: "Equivalência e substituição de palavras", year: 2025,
    text: "'A língua portuguesa é o idioma falado por mais de 265 milhões de pessoas espalhadas por todos os continentes, e a língua mais falada no hemisfério sul.'\n\nAssinale a alternativa em que a substituição da palavra sublinhada NÃO altera o sentido original do texto:",
    options: [
      { label: "A", text: "'espalhadas' por 'distribuídas'" },
      { label: "B", text: "'espalhadas' por 'dispersas'" },
      { label: "C", text: "'espalhadas' por 'alastradas'" },
      { label: "D", text: "'espalhadas' por 'derramadas'" },
    ],
    correctAnswer: "A",
    explanation: "'Espalhadas' no contexto significa 'distribuídas geograficamente', ou seja, pessoas que estão localizadas em diferentes continentes. 'Distribuídas' mantém esse sentido de distribuição geográfica organizada. 'Dispersas' sugere separação; 'alastradas' sugere propagação descontrolada; 'derramadas' é inadequado para pessoas.",
  },
  {
    id: 9, qid: "Q3825319", topic: "Características Gerais", year: 2025,
    text: "Sobre as características gerais da Língua Portuguesa, assinale a alternativa CORRETA:",
    options: [
      { label: "A", text: "É uma língua românica derivada do latim vulgar, falada por cerca de 265 milhões de pessoas." },
      { label: "B", text: "É a língua mais falada no hemisfério norte." },
      { label: "C", text: "Deriva diretamente do grego clássico, com influências do árabe." },
      { label: "D", text: "É língua oficial em apenas 5 países: Brasil, Portugal, Angola, Moçambique e Cabo Verde." },
    ],
    correctAnswer: "A",
    explanation: "A Língua Portuguesa é de fato uma língua românica (neolatina), derivada do latim vulgar trazido pelos romanos à Península Ibérica. É falada por aproximadamente 265 milhões de pessoas. É a mais falada no hemisfério sul (não norte). É língua oficial em 9 países (Brasil, Portugal, Angola, Moçambique, Cabo Verde, Guiné-Bissau, São Tomé e Príncipe, Timor-Leste e Guiné Equatorial).",
  },
  {
    id: 10, qid: "Q3998486", topic: "Equivalência e substituição de palavras", year: 2025,
    text: "'A língua portuguesa é o idioma falado por mais de 265 milhões de pessoas espalhadas por todos os continentes.'\n\nA palavra 'idioma' pode ser substituída, sem alteração de sentido, por:",
    options: [
      { label: "A", text: "dialeto" },
      { label: "B", text: "linguagem" },
      { label: "C", text: "língua" },
      { label: "D", text: "sotaque" },
    ],
    correctAnswer: "C",
    explanation: "'Idioma' e 'língua' são sinônimos no contexto — ambos se referem ao sistema de comunicação verbal de uma comunidade. 'Dialeto' é variedade regional de uma língua; 'linguagem' é termo mais amplo (inclui linguagem não verbal); 'sotaque' é a forma de pronúncia característica de uma região.",
  },
  {
    id: 11, qid: "Q3998484", topic: "Conjunções coordenativas adversativas", year: 2025,
    text: "'A língua portuguesa é falada em vários continentes, ______ é a mais falada no hemisfério sul.'\n\nAssinale a conjunção que preenche a lacuna estabelecendo relação de adversidade:",
    options: [
      { label: "A", text: "portanto" },
      { label: "B", text: "e" },
      { label: "C", text: "mas" },
      { label: "D", text: "logo" },
    ],
    correctAnswer: "C",
    explanation: "A conjunção 'mas' é coordenativa adversativa, indicando oposição ou contraste entre as ideias. No contexto, há uma relação de contraste: mesmo sendo falada em vários continentes, a língua portuguesa é a mais falada no hemisfério sul. 'Portanto' e 'logo' são conclusivas; 'e' é aditiva.",
  },
  {
    id: 12, qid: "Q2981714", topic: "Figuras de linguagem", year: 2023,
    text: "'O sol beijava as montanhas ao amanhecer.'\n\nA figura de linguagem presente na frase é:",
    options: [
      { label: "A", text: "Comparação" },
      { label: "B", text: "Metáfora" },
      { label: "C", text: "Personificação" },
      { label: "D", text: "Hipérbole" },
    ],
    correctAnswer: "C",
    explanation: "Personificação (ou prosopopeia) é a figura de linguagem que atribui características humanas a seres inanimados ou irracionais. Em 'o sol beijava as montanhas', o ato de 'beijar' é uma ação humana atribuída ao sol (ser inanimado).",
  },
  {
    id: 13, qid: "Q2741838", topic: "Fatores de mesóclise", year: 2023,
    text: "Assinale a alternativa em que a mesóclise foi empregada CORRETAMENTE:",
    options: [
      { label: "A", text: "Me emprestar-lhe-ei o livro amanhã." },
      { label: "B", text: "Far-lhe-ei saber a decisão final." },
      { label: "C", text: "Dir-lhe-ei-ei a verdade sobre o caso." },
      { label: "D", text: "Não lhe falarei sobre o ocorrido." },
    ],
    correctAnswer: "B",
    explanation: "A mesóclise é a colocação pronominal no meio do verbo, usada em verbos no futuro do presente ou futuro do pretérito, desde que não haja fator de próclise. Em 'Far-lhe-ei' (fá-lo-ei), o pronome 'lhe' está corretamente inserido no verbo 'fará' no futuro do presente. A letra A tem pronome antes do verbo (próclise inadequada). C tem repetição. D é ênclise (após verbo), não mesóclise.",
  },
  {
    id: 14, qid: "Q3424211", topic: "Concordância verbal", year: 2023,
    text: "Assinale a alternativa em que a concordância verbal está CORRETA:",
    options: [
      { label: "A", text: "Fazem cinco anos que trabalho nesta empresa." },
      { label: "B", text: "Houveram muitos candidatos na seleção." },
      { label: "C", text: "Existiam dúvidas sobre o resultado." },
      { label: "D", text: "Devem haver soluções para o problema." },
    ],
    correctAnswer: "C",
    explanation: "\"Existiam dúvidas\" — o verbo 'existir' é pessoal e concorda com o sujeito 'dúvidas' (plural). Nas demais: A) 'Faz' (tempo decorrido) é impessoal, fica no singular; B) 'Houve' é impessoal (haver com sentido de existir), fica no singular; D) 'Deve haver' — 'haver' impessoal, o auxiliar também fica no singular.",
  },
  {
    id: 15, qid: "Q2981709", topic: "Sentidos do texto", year: 2023,
    text: "Leia o trecho:\n\n'Era uma vez uma menina que adorava ler. Todos os dias, depois da escola, ela corria para a biblioteca e passava horas entre livros. Para ela, cada livro era uma janela para um mundo novo.'\n\nO trecho 'cada livro era uma janela para um mundo novo' sugere que:",
    options: [
      { label: "A", text: "Os livros tinham formato de janela." },
      { label: "B", text: "A leitura permitia à menina conhecer novas realidades." },
      { label: "C", text: "A biblioteca tinha muitas janelas." },
      { label: "D", text: "A menina gostava de olhar pela janela enquanto lia." },
    ],
    correctAnswer: "B",
    explanation: "A expressão 'cada livro era uma janela para um mundo novo' é uma metáfora que significa que a leitura proporcionava à menina a descoberta de novos conhecimentos, realidades e perspectivas — como se cada livro abrisse uma nova visão de mundo. Não deve ser interpretada literalmente.",
  },
  {
    id: 16, qid: "Q4166662", topic: "Por que/porque/porquê/por quê", year: 2023,
    text: "Assinale a alternativa que preenche CORRETAMENTE as lacunas:\n\n\"_____ você não veio à reunião? _____ estava doente, _____ não pude avisar antes.\"",
    options: [
      { label: "A", text: "Por que / Porque / porquê" },
      { label: "B", text: "Por quê / Porque / porque" },
      { label: "C", text: "Por que / Porque / por que" },
      { label: "D", text: "Por que / Porque / porque" },
    ],
    correctAnswer: "D",
    explanation: "\"Por que\" (separado, sem acento) no início de pergunta: 'Por que você não veio?'. \"Porque\" (junto, sem acento) para resposta: 'Porque estava doente'. \"Porque\" (junto, sem acento) para explicação: 'porque não pude avisar antes'. Regra: Por que = pergunta; Porque = resposta/explicação; Porquê = substantivo (o motivo); Por quê = fim de frase.",
  },
  {
    id: 17, qid: "Q4166664", topic: "Concordância verbal", year: 2023,
    text: "Assinale a alternativa em que a concordância do verbo 'ser' está CORRETA:",
    options: [
      { label: "A", text: "São cinco horas da tarde." },
      { label: "B", text: "É cinco horas da tarde." },
      { label: "C", text: "Hoje são dia 15 de junho." },
      { label: "D", text: "Tudo são flores no relacionamento." },
    ],
    correctAnswer: "A",
    explanation: "Com horas, o verbo 'ser' concorda com o numeral: 'São cinco horas' (plural). 'É uma hora' (singular). Na letra C, o correto é 'Hoje é dia 15' (o verbo concorda com a indicação de dia). Na letra D, com 'tudo' (coletivo), o verbo fica no singular: 'Tudo é flores'.",
  },
  {
    id: 18, qid: "Q4166660", topic: "Sujeito", year: 2023,
    text: "Na oração 'Precisa-se de funcionários experientes', o sujeito é:",
    options: [
      { label: "A", text: "Funcionários experientes (sujeito paciente)" },
      { label: "B", text: "Indeterminado (o 'se' é índice de indeterminação do sujeito)" },
      { label: "C", text: "Oculto (funcionários)" },
      { label: "D", text: "Inexistente (oração sem sujeito)" },
    ],
    correctAnswer: "B",
    explanation: "Em 'Precisa-se de funcionários experientes', o 'se' é índice de indeterminação do sujeito. O verbo 'precisa' fica no singular porque não há sujeito determinado — quem precisa? Não se sabe. O termo 'de funcionários experientes' é objeto indireto, não sujeito. Diferentemente da voz passiva sintética (como 'Vendem-se casas'), aqui o verbo 'precisar' é transitivo indireto (precisa-se DE algo), exigindo o 'se' como indeterminador.",
  },
  {
    id: 19, qid: "Q4026998", topic: "Reorganização e reescrita", year: 2023,
    text: "Reescreva a frase 'O advogado apresentou os documentos ao juiz' na voz passiva analítica e assinale a alternativa CORRETA:",
    options: [
      { label: "A", text: "Os documentos foram apresentados ao juiz pelo advogado." },
      { label: "B", text: "O juiz foi apresentado os documentos pelo advogado." },
      { label: "C", text: "Apresentaram-se os documentos ao juiz." },
      { label: "D", text: "Os documentos são apresentados pelo advogado ao juiz." },
    ],
    correctAnswer: "A",
    explanation: "Na voz passiva analítica, o objeto direto ('os documentos') torna-se sujeito paciente, e o sujeito ('O advogado') torna-se agente da passiva. A estrutura correta é: sujeito + verbo ser (no mesmo tempo do verbo principal) + particípio + agente da passiva. 'Apresentou' (pretérito perfeito do indicativo) → 'foram apresentados'.",
  },
  {
    id: 20, qid: "Q2422921", topic: "Por que/porque/porquê/por quê", year: 2022,
    text: "Assinale a alternativa em que o 'porquê' foi empregado CORRETAMENTE:",
    options: [
      { label: "A", text: "Não sei porquê ele faltou." },
      { label: "B", text: "Ela não veio porquê estava doente." },
      { label: "C", text: "Quero saber o porquê de sua ausência." },
      { label: "D", text: "Porquê você não respondeu?" },
    ],
    correctAnswer: "C",
    explanation: "'Porquê' (junto, com acento) é substantivo, sinônimo de 'motivo' ou 'razão'. Em 'Quero saber o porquê de sua ausência', está precedido de artigo 'o' e seguido de preposição 'de', funcionando como substantivo. Nas demais: A) deveria ser 'por que' (separado, sem acento) em frase interrogativa indireta; B) deveria ser 'porque' (explicação); D) deveria ser 'Por que' (pergunta).",
  },
];

// ─── TAB 3: Apostila Data ─────────────────────────────────

interface ApostilaSection {
  id: string;
  title: string;
  subtitle: string;
  frequency: "Muito Alta" | "Alta" | "Média" | "Baixa" | "Nula";
  color: string;
  topics: {
    name: string;
    testedCount?: number;
    isHot: boolean;
    content: string;
  }[];
}

const apostilaSections: ApostilaSection[] = [
  {
    id: "1-textos",
    title: "1. Textos",
    subtitle: "Leitura, compreensão e interpretação de textos",
    frequency: "Alta",
    color: "text-green-600",
    topics: [
      {
        name: "Leitura, compreensão e interpretação de textos",
        testedCount: 17,
        isHot: true,
        content: "Interpretar um texto é extrair dele o sentido pretendido pelo autor, distinguindo informações explícitas (presentes no texto) das implícitas (subentendidas). As questões da Banca Objetiva focam em: (a) Localizar informações explícitas; (b) Inferir o sentido de palavras ou expressões; (c) Identificar o tema central; (d) Compreender a progressão textual. A banca utiliza textos de diferentes gêneros (jornalísticos, literários, científicos) e cobra especialmente a capacidade de identificar a ideia principal.",
      },
      {
        name: "Vocabulário: significado e substituição contextual",
        testedCount: 5,
        isHot: true,
        content: "A banca testa a capacidade de substituir palavras ou expressões sem alterar o sentido original do texto. É essencial: (a) Compreender o sentido da palavra no contexto; (b) Identificar sinônimos adequados; (c) Reconhecer quando a substituição altera o registro (formal/informal) ou o sentido. Palavras like 'espalhadas', 'idioma', 'carregar' são frequentemente testadas.",
      },
      {
        name: "Reorganização de orações e períodos",
        testedCount: 2,
        isHot: false,
        content: "Reorganizar orações e períodos mantendo o sentido original e a correção gramatical. Inclui: transposição de voz ativa para passiva, reescrita de períodos compostos em simples (e vice-versa), e substituição de conectivos mantendo a relação de sentido.",
      },
      {
        name: "Mecanismos de coesão e coerência textual",
        testedCount: 1,
        isHot: false,
        content: "Coesão refere-se aos mecanismos linguísticos que conectam as partes do texto (pronomes, conjunções, elipses). Coerência é a unidade de sentido do texto. A banca cobra: (a) Uso de pronomes anafóricos e catafóricos; (b) Conectivos e relações lógicas; (c) Progressão temática.",
      },
      {
        name: "Tipos e gêneros textuais",
        testedCount: 1,
        isHot: false,
        content: "Tipos textuais: narração, descrição, dissertação (argumentação), exposição, injunção. Gêneros textuais: artigo, crônica, reportagem, carta, e-mail, etc. A banca cobra a identificação do tipo predominante e das características do gênero utilizado.",
      },
    ],
  },
  {
    id: "2-fono",
    title: "2. Fono-ortografia",
    subtitle: "Relações entre fonemas e grafemas",
    frequency: "Média",
    color: "text-amber-600",
    topics: [
      {
        name: "Relações entre fonemas e grafemas",
        testedCount: 1,
        isHot: false,
        content: "Fonema é a menor unidade sonora; grafema é a representação gráfica do fonema (letra). Uma letra pode representar mais de um fonema (ex.: 'x' em 'táxi' = /ks/) e um fonema pode ser representado por mais de uma letra (ex.: 'ch' em 'chave'). A banca cobra a identificação de palavras com número diferente de letras e fonemas, especialmente com dígrafos (ch, lh, nh, rr, ss, gu, qu) e encontros consonantais.",
      },
      {
        name: "Estrutura, divisão e classificação silábica",
        testedCount: 1,
        isHot: false,
        content: "Sílaba é o fonema ou conjunto de fonemas pronunciados numa só emissão de voz. Classificação: monossílaba, dissílaba, trissílaba, polissílaba. A banca também cobra a separação silábica correta e a identificação de encontros vocálicos (ditongo, tritongo, hiato) e consonantais.",
      },
      {
        name: "Processos fonológicos",
        testedCount: 0,
        isHot: false,
        content: "Incluem: assimilação, dissimilação, metátese, crase (junção de vogais idênticas — distinta da crase acentual), nasalização, palatalização. Embora não tenha aparecido nas questões analisadas, é conteúdo do edital e pode ser cobrado.",
      },
    ],
  },
  {
    id: "3-morfossintaxe",
    title: "3. Morfossintaxe",
    subtitle: "Classes de palavras e suas relações na frase",
    frequency: "Muito Alta",
    color: "text-green-600",
    topics: [
      {
        name: "Classes de palavras: classificação e uso",
        testedCount: 1,
        isHot: false,
        content: "As dez classes de palavras (substantivo, artigo, adjetivo, numeral, pronome, verbo, advérbio, preposição, conjunção, interjeição). A banca cobra a classificação morfológica dentro do contexto frasal, especialmente a diferença entre palavras que podem pertencer a mais de uma classe (ex.: 'casa' como substantivo e verbo).",
      },
      {
        name: "Processos de formação de palavras",
        testedCount: 1,
        isHot: false,
        content: "Derivação (prefixal, sufixal, parassintética, regressiva, imprópria) e composição (justaposição, aglutinação). Outros processos: abreviação, siglonimização, empréstimo, neologismo. A banca cobra a identificação do processo de formação de palavras destacadas em texto.",
      },
      {
        name: "Flexão nominal: gênero, número e grau",
        testedCount: 6,
        isHot: true,
        content: "Gênero (masculino/feminino), número (singular/plural) e grau (aumentativo/diminutivo). Tópicos recorrentes: plural de substantivos compostos ('couve-flor', 'beija-flor'), flexão de gênero (professor/professora), e grau do adjetivo (comparativo/superlativo). FIQUE ATENTO: plural de compostos foi testado 2 vezes.",
      },
      {
        name: "Flexão verbal: pessoa, tempo, número, modo, voz e aspecto",
        testedCount: 6,
        isHot: true,
        content: "Modos: indicativo, subjuntivo, imperativo. Tempos: presente, pretérito (perfeito, imperfeito, mais-que-perfeito), futuro (do presente, do pretérito). Vozes: ativa, passiva, reflexiva. A banca cobra especialmente: (a) Flexões verbais irregulares; (b) Subjuntivo; (c) Voz passiva sintética vs. analítica. FORTE: voz passiva (sintética e analítica) foi testada 5 vezes.",
      },
      {
        name: "Concordância nominal e verbal",
        testedCount: 14,
        isHot: true,
        content: "ASSUNTO MAIS IMPORTANTE (35,8% das questões). Concordância verbal: regra geral (verbo concorda com sujeito), casos especiais (sujeito coletivo, percentual, 'se' apassivador vs. indeterminador, verbos impessoais como 'haver' e 'fazer'). Concordância nominal: adjetivo concorda com substantivo, casos especiais ('anexo', 'obrigado', 'mesmo', 'próprio', 'só', 'bastante', 'menos'). A banca testa todos esses casos.",
      },
      {
        name: "Regência nominal e verbal",
        testedCount: 4,
        isHot: true,
        content: "Regência verbal: relação entre verbo e complementos (transitividade direta/indireta). Verbos que geram dúvida: assistir, implicar, proceder, visar, aspirar, pagar, perdoar. Regência nominal: relação entre nome e complemento (ex.: 'capaz de', 'apto a', 'favorável a', 'imbuído de'). A banca combina regência com crase.",
      },
      {
        name: "Relação entre classes e funções sintáticas",
        testedCount: 1,
        isHot: false,
        content: "A morfossintaxe estuda a palavra em sua dupla dimensão: classe (morfologia) e função na oração (sintaxe). Ex.: substantivo pode funcionar como núcleo do sujeito, objeto direto, complemento nominal, aposto, etc. A banca cobra a identificação da função sintática de termos destacados.",
      },
    ],
  },
  {
    id: "4-sintaxe",
    title: "4. Sintaxe",
    subtitle: "Funções sintáticas, período composto, crase e colocação pronominal",
    frequency: "Alta",
    color: "text-green-600",
    topics: [
      {
        name: "Funções sintáticas: sujeito, predicado, objeto, complementos",
        testedCount: 5,
        isHot: true,
        content: "Termos essenciais: sujeito (determinado, indeterminado, inexistente) e predicado (verbal, nominal, verbo-nominal). Termos integrantes: objeto direto, objeto indireto, complemento nominal, agente da passiva. Termos acessórios: adjunto adverbial, adjunto adnominal, aposto, vocativo. A banca testa especialmente a classificação do sujeito e a função do 'se'.",
      },
      {
        name: "Período simples e composto: coordenação e subordinação",
        testedCount: 4,
        isHot: true,
        content: "Período simples: uma oração. Período composto: duas ou mais orações. Coordenação: orações independentes (aditivas, adversativas, alternativas, conclusivas, explicativas). Subordinação: orações dependentes — substantivas (subjetiva, objetiva direta/indireta, completiva nominal, predicativa, apositiva), adjetivas (restritiva, explicativa) e adverbiais (causal, concessiva, condicional, etc.). A banca TESTA MUITO a classificação de orações subordinadas.",
      },
      {
        name: "Análise sintática completa",
        testedCount: 2,
        isHot: true,
        content: "A análise sintática completa envolve: (a) Identificar os termos da oração; (b) Classificar o sujeito e o predicado; (c) Identificar complementos verbais e nominais; (d) Classificar orações em períodos compostos. A banca Objetiva costuma apresentar frases e perguntar pela classificação sintática de um termo ou oração específica.",
      },
      {
        name: "Emprego do sinal indicativo de crase",
        testedCount: 8,
        isHot: true,
        content: "MUITO IMPORTANTE: 5 questões específicas + 3 sobre regras práticas. A crase é a fusão de preposição 'a' + artigo 'a' (ou 'a' + 'aquele', 'a' + 'aquela', etc.). Regras práticas: (a) Sempre crase antes de palavras femininas; (b) Nunca antes de verbos, pronomes pessoais, palavras masculinas; (c) Locuções femininas (à tarde, às pressas); (d) Casos facultativos (antes de nome próprio feminino, antes de 'até' + feminino). CASOS ESPECIAIS QUE CAEM: 'a distância', 'a casa', 'a terra'.",
      },
      {
        name: "Colocação pronominal",
        testedCount: 3,
        isHot: true,
        content: "Próclise (antes do verbo): palavras atrativas (negativas, relativos, advérbios, conjunções subordinativas, pronomes indefinidos). Ênclise (após verbo): início de frases, imperativo afirmativo, gerúndio, infinitivo. Mesóclise: futuro do presente e futuro do pretérito (sem fator de próclise). A banca testa especialmente a mesóclise e a próclise.",
      },
      {
        name: "Uso dos 'porquês'",
        testedCount: 8,
        isHot: true,
        content: "ALTAMENTE FREQUENTE (8 questões). 'Por que' (pergunta direta ou indireta). 'Porque' (resposta ou explicação). 'Porquê' (substantivo = o motivo). 'Por quê' (fim de frase interrogativa). A banca Objetiva adora testar os quatro usos em lacunas.",
      },
    ],
  },
  {
    id: "5-semantica",
    title: "5. Semântica",
    subtitle: "Significado das palavras e figuras de linguagem",
    frequency: "Média",
    color: "text-amber-600",
    topics: [
      {
        name: "Sinonímia, antonímia e polissemia",
        testedCount: 3,
        isHot: false,
        content: "Sinônimos: palavras com sentido próximo. Antônimos: palavras com sentido oposto. Polissemia: multiplicidade de significados de uma mesma palavra. A banca testa a capacidade de identificar sinônimos contextuais e antônimos.",
      },
      {
        name: "Homônimos e parônimos",
        testedCount: 2,
        isHot: false,
        content: "Homônimos: palavras com mesma pronúncia/grafia e significados diferentes (cela/sela, conserto/concerto). Parônimos: palavras parecidas na pronúncia/grafia (ratificar/retificar, descrição/discrição, eminente/iminente). A banca já testou parônimos e homônimos em questões de uso correto.",
      },
      {
        name: "Denotação e conotação",
        testedCount: 2,
        isHot: false,
        content: "Denotação: sentido literal, objetivo, do dicionário. Conotação: sentido figurado, subjetivo, contextual. A banca testa a identificação de linguagem denotativa vs. conotativa em frases e textos.",
      },
      {
        name: "Figuras de linguagem",
        testedCount: 1,
        isHot: false,
        content: "Principais figuras: metáfora, comparação, metonímia, personificação, hipérbole, eufemismo, ironia, antítese, paradoxo, gradação. A banca costuma cobrar a identificação da figura em frase destacada. PERSONIFICAÇÃO é a figura que mais aparece nas questões analisadas.",
      },
    ],
  },
  {
    id: "6-variacao",
    title: "6. Variação Linguística",
    subtitle: "Variedades da língua e norma-padrão",
    frequency: "Nula",
    color: "text-red-600",
    topics: [
      {
        name: "Variedades regionais, sociais, históricas e situacionais",
        testedCount: 0,
        isHot: false,
        content: "ESTUDE POR FORA — NENHUMA QUESTÃO ENCONTRADA. A variação linguística estuda as diferentes formas de uso da língua: variação diatópica (regional), diastrática (social), diacrônica (histórica) e diamésica (meio: oral/escrito). A banca pode cobrar o conceito de 'preconceito linguístico' e a adequação da linguagem ao contexto.",
      },
      {
        name: "Norma-padrão e usos sociais da língua",
        testedCount: 0,
        isHot: false,
        content: "ESTUDE POR FORA — NENHUMA QUESTÃO ENCONTRADA. Diferença entre norma-padrão (prescrita pela gramática normativa) e uso social (efetivamente praticado pelos falantes). A banca pode cobrar a diferença entre 'certo/errado' gramatical e 'adequado/inadequado' contextual.",
      },
    ],
  },
  {
    id: "7-notacionais",
    title: "7. Elementos Notacionais da Escrita",
    subtitle: "Ortografia, acentuação e pontuação",
    frequency: "Baixa",
    color: "text-orange-600",
    topics: [
      {
        name: "Ortografia oficial",
        testedCount: 5,
        isHot: true,
        content: "Emprego correto das letras: S/Z, G/J, X/CH, E/I, O/U. Uso do hífen (com prefixos). Grafia de palavras com etimologia duvidosa. Reforma Ortográfica de 2009 (regras do novo acordo). A banca testa a grafia correta em questões de 'assinale a alternativa com erro ortográfico'.",
      },
      {
        name: "Acentuação gráfica",
        testedCount: 2,
        isHot: false,
        content: "Regras de acentuação: oxítonas, paroxítonas, proparoxítonas, hiatos, ditongos, trema (abolido pelo Acordo de 2009). Acentos diferenciais (pôde/pode, pôr/por, têm/tem, vêm/vem). A banca testa a acentuação correta de palavras.",
      },
      {
        name: "Sinais de pontuação",
        testedCount: 4,
        isHot: true,
        content: "Vírgula (a mais cobrada — 2 questões): separação de orações, enumerações, vocativo, aposto explicativo, adjuntos adverbiais. Ponto final, ponto e vírgula, dois-pontos (1 questão). A banca testa principalmente o uso correto da vírgula em períodos complexos.",
      },
      {
        name: "Recursos gráficos e estilísticos",
        testedCount: 0,
        isHot: false,
        content: "Aspas, parênteses, travessão, negrito, itálico. NÃO HOUVE QUESTÕES sobre este tópico nas provas analisadas, mas faz parte do edital e pode ser cobrado.",
      },
    ],
  },
];

// ─── COMPONENTS ───────────────────────────────────────────

function TabAnaliseEstatistica() {
  return (
    <div>
      {/* Stats Cards */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden mb-14"
      >
        {[
          { value: "137", label: "Questões analisadas", icon: FileText },
          { value: "73", label: "Tópicos distintos", icon: BarChart3 },
          { value: "5", label: "Categorias do edital", icon: Layers },
          { value: "2022–26", label: "Período das provas", icon: TrendingUp },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-background p-5 flex flex-col items-start gap-1.5">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-2xl font-light text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Distribution Chart */}
      <motion.div variants={fadeIn}>
        <h2 className="text-xl font-medium mb-2 text-foreground">Distribuição por Categoria do Edital</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Quantidade de questões encontradas em cada uma das grandes áreas do programa de Língua Portuguesa.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={categoryData} margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tickLine={false} axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="questions" radius={[2, 2, 0, 0]} barSize={32}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                  paddingAngle={2} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{value}</span>} />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-px bg-border rounded-sm overflow-hidden">
          {categoryData.map((cat) => (
            <div key={cat.name} className="bg-background p-4 flex flex-col items-center text-center">
              <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: cat.color }} />
              <span className="text-xs text-muted-foreground mb-0.5 leading-tight">{cat.name}</span>
              <span className="text-sm font-medium text-foreground">{cat.questions} ({cat.percentage}%)</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Topics */}
      <motion.div variants={fadeIn} className="mt-14">
        <h2 className="text-xl font-medium mb-2 text-foreground">Tópicos Mais Frequentes</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Os 15 assuntos que mais aparecem nas provas da Banca Objetiva.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">#</th>
                <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópico</th>
                <th className="text-right py-3 pl-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">Qtd</th>
                <th className="text-right py-3 pl-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Freq.</th>
              </tr>
            </thead>
            <tbody>
              {topTopics.map((row) => (
                <tr key={row.topic} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4 text-muted-foreground font-mono text-xs">{row.rank}</td>
                  <td className="py-3 pr-4 text-foreground">{row.topic}</td>
                  <td className="py-3 pl-4 text-right font-mono text-sm text-foreground">{row.count}</td>
                  <td className="py-3 pl-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-foreground rounded-full" style={{ width: `${(row.count / 9) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono w-10 text-right">{row.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Coverage Analysis */}
      <motion.div variants={fadeIn} className="mt-14">
        <h2 className="text-xl font-medium mb-2 text-foreground">Comparativo: Edital × Questões da Banca</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Análise de cobertura entre as 7 seções do programa e as questões da Banca Objetiva.
        </p>
        <div className="space-y-px bg-border rounded-sm overflow-hidden">
          {coverageAnalysis.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.section} className="bg-card p-5 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.color}`} />
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.section}</h3>
                      <ul className="mt-2 space-y-0.5">
                        {item.editalItems.map((sub) => (
                          <li key={sub} className="text-xs text-muted-foreground">— {sub}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${
                    item.coverage === "Alta" ? "text-green-700 border-green-200 bg-green-50 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                    : item.coverage === "Média" ? "text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                    : item.coverage === "Média-Baixa" || item.coverage === "Baixa" ? "text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                    : "text-red-700 border-red-200 bg-red-50 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                  }`}>{item.coverage}</span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div variants={fadeIn} className="mt-14">
        <h2 className="text-xl font-medium mb-2 text-foreground">Insights para o Candidato</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Recomendações estratégicas baseadas na análise estatística.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
          {[
            { icon: TrendingUp, title: "Morfossintaxe é prioridade máxima", description: "Quase 36% das questões — domine concordância verbal e nominal, regência e flexão verbal.", emphasis: "35,8% das questões" },
            { icon: Target, title: "Crase e 'porquês' são tópicos certos", description: "Crase (5 questões) e uso dos porquês (8) — assuntos simples que valem pontos preciosos.", emphasis: "13 questões combinadas" },
            { icon: BookOpen, title: "Interpretação de texto é onipresente", description: "Interpretação (9) e sentidos do texto (8) aparecem em praticamente todas as provas.", emphasis: "17 questões combinadas" },
            { icon: AlertTriangle, title: "Pontos cegos: Variação Linguística", description: "Nenhuma questão encontrada. Estude por fora — pode ser a 'surpresa' da prova.", emphasis: "0 questões encontradas" },
            { icon: HelpCircle, title: "Semântica: pouco cobrada, mas presente", description: "Figuras, parônimos e sinônimos com 1 questão cada — estude o básico.", emphasis: "6,6% das questões" },
            { icon: FileText, title: "Elementos notacionais: lacuna", description: "Acentuação (1) e ortografia (4) aparecem pouco. Estude pontuação separadamente.", emphasis: "Pode cair na prova" },
          ].map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.title} className="bg-background p-6">
                <div className="flex items-start gap-4">
                  <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">{insight.emphasis}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Complete Topic List */}
      <motion.div variants={fadeIn} className="mt-14">
        <h2 className="text-xl font-medium mb-2 text-foreground">Lista Completa de Tópicos ({allTopics.length})</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Todos os 73 tópicos distintos, ordenados por frequência.
        </p>
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-border rounded-sm">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background">
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">#</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópico</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Freq.</th>
              </tr>
            </thead>
            <tbody>
              {allTopics.map((item, i) => (
                <tr key={item.topic} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{i + 1}</td>
                  <td className="py-2.5 px-4 text-foreground">{item.topic}</td>
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-foreground/60 rounded-full" style={{ width: `${(item.count / 9) * 100}%` }} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-6 text-right">{item.count}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// ─── TAB 2: Interactive Questions ─────────────────────────

function QuestionCard({
  question,
  index,
  selected,
  showExplanation,
  onSelect,
  onToggleExplanation,
}: {
  question: Question;
  index: number;
  selected: string | null;
  showExplanation: boolean;
  onSelect: (answer: string) => void;
  onToggleExplanation: () => void;
}) {
  const isCorrect = selected === question.correctAnswer;
  const isWrong = selected !== null && selected !== question.correctAnswer;
  const maxCount = Math.max(...questionsData.map(q => q.id));
  const progressPct = Math.round((index / maxCount) * 100);

  return (
    <div className="border border-border rounded-sm bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">#{question.id}</span>
          <span className="text-xs font-medium text-foreground">{question.topic}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">{question.year} • Banca Objetiva</span>
      </div>

      {/* Question text */}
      <div className="px-5 py-4">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{question.text}</p>
      </div>

      {/* Options */}
      <div className="px-5 pb-4 space-y-2">
        {question.options.map((opt) => {
          const isSelected = selected === opt.label;
          const isCorrectOption = opt.label === question.correctAnswer;
          let borderColor = "border-border";
          let bgColor = "";
          let textColor = "text-foreground";

          if (selected !== null) {
            if (isCorrectOption) {
              borderColor = "border-green-500";
              bgColor = "bg-green-50 dark:bg-green-950/20";
              textColor = "text-green-700 dark:text-green-300";
            } else if (isSelected && isWrong) {
              borderColor = "border-red-400";
              bgColor = "bg-red-50 dark:bg-red-950/20";
              textColor = "text-red-600 dark:text-red-300";
            } else {
              borderColor = "border-border/50";
              textColor = "text-muted-foreground";
            }
          }

          return (
            <button
              key={opt.label}
              onClick={() => selected === null && onSelect(opt.label)}
              disabled={selected !== null}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm border text-left transition-all duration-200 ${borderColor} ${bgColor} ${textColor} ${
                selected === null ? "hover:border-foreground/40 hover:bg-muted/30 cursor-pointer" : "cursor-default"
              }`}
            >
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                selected !== null && isCorrectOption ? "bg-green-500 text-white border-green-500" :
                isSelected && isWrong ? "bg-red-400 text-white border-red-400" :
                "border-border text-muted-foreground"
              }`}>
                {selected !== null && isCorrectOption ? "✓" : isSelected && isWrong ? "✗" : opt.label}
              </span>
              <span className="text-sm">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selected !== null && (
        <div className={`px-5 py-3 border-t ${isCorrect ? "border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900" : "border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-xs font-medium ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-300"}`}>
              {isCorrect ? "Correta! 🎉" : `Incorreta. Resposta correta: ${question.correctAnswer}`}
            </span>
          </div>

          <button
            onClick={onToggleExplanation}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {showExplanation ? "Ocultar explicação" : "Ver explicação"}
            {showExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Progress indicator */}
      <div className="h-0.5 bg-muted">
        <div className="h-full bg-foreground/20 transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}

function TabRepositorioQuestoes() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [explanations, setExplanations] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = useCallback((qId: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: answer }));
  }, []);

  const toggleExplanation = useCallback((qId: number) => {
    setExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
  }, []);

  const filteredQuestions = questionsData.filter(q => {
    const matchesFilter = filter === "all" || q.topic === filter;
    const matchesSearch = searchQuery === "" ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = Object.entries(selectedAnswers).filter(
    ([id, ans]) => questionsData.find(q => q.id === Number(id))?.correctAnswer === ans
  ).length;

  const uniqueTopics = [...new Set(questionsData.map(q => q.topic))];

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-px bg-border rounded-sm overflow-hidden mb-8">
        <div className="bg-background p-4">
          <span className="text-2xl font-light text-foreground">{questionsData.length}</span>
          <span className="text-xs text-muted-foreground block mt-1">Total de questões</span>
        </div>
        <div className="bg-background p-4">
          <span className="text-2xl font-light text-foreground">{totalAnswered}</span>
          <span className="text-xs text-muted-foreground block mt-1">Respondidas</span>
        </div>
        <div className="bg-background p-4">
          <span className="text-2xl font-light text-foreground">
            {totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : "—"}%
          </span>
          <span className="text-xs text-muted-foreground block mt-1">Acertos {totalAnswered > 0 ? `(${totalCorrect}/${totalAnswered})` : ""}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-sm bg-background border border-border rounded-sm
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:border-foreground/40 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 pl-9 pr-8 text-sm bg-background border border-border rounded-sm
                       text-foreground appearance-none cursor-pointer
                       focus:outline-none focus:border-foreground/40 transition-colors min-w-[200px]"
          >
            <option value="all">Todos os tópicos</option>
            {uniqueTopics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <QuestionCard
              question={q}
              index={q.id}
              selected={selectedAnswers[q.id] ?? null}
              showExplanation={explanations[q.id] ?? false}
              onSelect={(answer) => handleSelect(q.id, answer)}
              onToggleExplanation={() => toggleExplanation(q.id)}
            />
          </motion.div>
        ))}
        {filteredQuestions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">
            Nenhuma questão encontrada. Tente ajustar os filtros.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── TAB 3: Apostila ──────────────────────────────────────

function TabApostila() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <PenSquare className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Apostila Especial</span>
        </div>
        <h2 className="text-xl font-medium mb-2 text-foreground">
          Guia Completo de Estudos — Língua Portuguesa
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Material didático completo baseado no Edital nº 125/2026, com análise estatística
          das 137 questões da Banca Objetiva. Os tópicos são organizados por relevância:
          <span className="inline-flex items-center gap-1 mx-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" /> tópicos mais frequentes
          </span>
          recebem destaque especial.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {apostilaSections.map((section) => {
          const isOpen = expandedSection === section.id;
          const hotCount = section.topics.filter(t => t.isHot).length;
          const totalCount = section.topics.length;

          return (
            <div key={section.id} className="border border-border rounded-sm overflow-hidden bg-card">
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    section.frequency === "Muito Alta" || section.frequency === "Alta" ? "bg-green-500"
                    : section.frequency === "Média" ? "bg-amber-400"
                    : section.frequency === "Nula" ? "bg-red-400"
                    : "bg-orange-400"
                  }`} />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {hotCount > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
                      <span className="text-[11px] text-muted-foreground">{hotCount}/{totalCount} tópicos em destaque</span>
                    </div>
                  )}
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    section.frequency === "Muito Alta" || section.frequency === "Alta" ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                    : section.frequency === "Média" ? "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                    : section.frequency === "Nula" ? "text-red-600 border-red-200 bg-red-50 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                    : "text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                  }`}>
                    {section.frequency}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {/* Section content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 border-t border-border/50 pt-4 space-y-5">
                      {section.topics.map((topic) => (
                        <div key={topic.name} className={`p-4 rounded-sm ${topic.isHot ? "bg-amber-50/70 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800" : "bg-muted/30"}`}>
                          <div className="flex items-start gap-3">
                            {topic.isHot && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-500 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="text-sm font-medium text-foreground">{topic.name}</h4>
                                {topic.testedCount !== undefined && topic.testedCount > 0 && (
                                  <span className="text-[11px] text-muted-foreground bg-background px-2 py-0.5 rounded-sm border border-border/50">
                                    {topic.testedCount}x em provas
                                  </span>
                                )}
                                {topic.isHot && (
                                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                                    ⚡ Frequente
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-foreground/70 leading-relaxed">{topic.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-10 p-5 bg-card border border-border rounded-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Como usar esta apostila</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Os tópicos marcados com <Star className="w-3 h-3 fill-yellow-400 text-yellow-500 inline" /> são os mais frequentes nas provas da Banca Objetiva
              e devem ser priorizados nos seus estudos. As seções com cobertura "Nula" ou "Baixa" indicam
              assuntos que podem ser a surpresa da prova — não os ignore completamente, mas estude-os
              após dominar os tópicos quentes. A apostila foi elaborada combinando o conteúdo programático
              do Edital nº 125/2026 com a análise estatística de 137 questões reais da Banca Objetiva (2022–2026).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────

export default function LinguaPortuguesa() {
  const [activeTab, setActiveTab] = useState("analise");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/programa"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Programa
          </Link>
          <span className="text-sm font-medium tracking-tight text-foreground">
            PGM Canoas — 2026
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-14 pb-6 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.1] mb-3 text-foreground"
            >
              Língua Portuguesa
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-sm text-muted-foreground max-w-2xl leading-relaxed"
            >
              Dashboard analítico, repositório de questões e apostila especial — tudo baseado
              em <strong>137 questões</strong> da <strong>Banca Objetiva</strong> (2022–2026) e no
              Edital nº 125/2026 para Procurador Municipal de Canoas.
            </motion.p>

            {/* Tab Navigation */}
            <motion.div variants={fadeIn} className="mt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full sm:w-auto grid grid-cols-3 h-auto bg-muted/50 p-0.5 rounded-sm">
                  <TabsTrigger
                    value="analise"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-none
                               data-[state=active]:text-foreground text-muted-foreground px-4 py-2 rounded-sm
                               hover:text-foreground transition-colors"
                  >
                    <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
                    Análise
                  </TabsTrigger>
                  <TabsTrigger
                    value="questoes"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-none
                               data-[state=active]:text-foreground text-muted-foreground px-4 py-2 rounded-sm
                               hover:text-foreground transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                    Questões
                    <span className="ml-1.5 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{questionsData.length}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="apostila"
                    className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-none
                               data-[state=active]:text-foreground text-muted-foreground px-4 py-2 rounded-sm
                               hover:text-foreground transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    Apostila
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="analise" className="mt-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={stagger}
              >
                <TabAnaliseEstatistica />
              </motion.div>
            </TabsContent>

            <TabsContent value="questoes" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabRepositorioQuestoes />
              </motion.div>
            </TabsContent>

            <TabsContent value="apostila" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabApostila />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Dados extraídos de 137 questões da Banca Objetiva (2022–2026) — Gran Questões
          </p>
          <div className="flex items-center gap-4">
            <Link to="/programa" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Programa Completo
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Página inicial
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
