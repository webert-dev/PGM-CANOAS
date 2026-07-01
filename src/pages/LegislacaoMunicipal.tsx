import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, BarChart3, TrendingUp, AlertTriangle,
  CheckCircle2, HelpCircle, FileText, Target, CheckCircle,
  XCircle, ChevronDown, ChevronUp, MessageCircle, Search,
  Filter, Layers, Star, Lightbulb, Landmark, Building2, Scale,
  PiggyBank, Heart, ScrollText, MapPin, Award
} from "lucide-react";
import { Link } from "react-router";
import { questionsData } from "@/data/legislacao-municipal-questions";
import type { Question } from "@/data/legislacao-municipal-questions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Motion Variants ─────────────────────────────────────
const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

// ─── TAB 1: Statistical Data ──────────────────────────────

const categoryData = [
  { name: "Legislação da PGM", questions: 5, percentage: 16.7, color: "oklch(0.45 0.11 250)" },
  { name: "Dir. Tributário Municipal", questions: 6, percentage: 20.0, color: "oklch(0.55 0.15 200)" },
  { name: "Dir. Administrativo", questions: 7, percentage: 23.3, color: "oklch(0.5 0.12 180)" },
  { name: "Dir. Previdenciário", questions: 4, percentage: 13.3, color: "oklch(0.6 0.13 30)" },
  { name: "Dir. Ambiental/Urbanístico", questions: 5, percentage: 16.7, color: "oklch(0.48 0.14 140)" },
  { name: "Dir. Financeiro", questions: 3, percentage: 10.0, color: "oklch(0.52 0.1 280)" },
];

const coverageAnalysis = [
  {
    section: "Lei de Regência da PGM (Lei nº 6.817/2025)",
    coverage: "Alta", color: "text-sky-600", icon: CheckCircle2,
    note: "Funções exclusivas, Conselho Superior, estágio probatório, substituições e teletrabalho",
  },
  {
    section: "Código Tributário (Lei nº 1.783/1977) e ISSQN/ITBI",
    coverage: "Alta", color: "text-sky-600", icon: CheckCircle2,
    note: "IPTU, ITBI, ISSQN, Conselho de Contribuintes, multas e Habite-se",
  },
  {
    section: "Estatuto dos Servidores (Lei nº 2.214/1984)",
    coverage: "Alta", color: "text-sky-600", icon: CheckCircle2,
    note: "Posse, exercício, férias, luto, reintegração e prazos atualizados",
  },
  {
    section: "RPPS - LC nº 14/2025 (Previdência Municipal)",
    coverage: "Alta", color: "text-sky-600", icon: CheckCircle2,
    note: "Taxa de administração, aposentadoria, pensão por morte e alíquotas",
  },
  {
    section: "PDUA - Plano Diretor (Lei nº 5.961/2015)",
    coverage: "Média", color: "text-amber-600", icon: HelpCircle,
    note: "EIV, Direito de Preempção, IA Máximo e QI",
  },
  {
    section: "Código de Meio Ambiente (Lei nº 4.328/1998)",
    coverage: "Média", color: "text-amber-600", icon: HelpCircle,
    note: "Infrações, agravantes e atenuantes, defesa e prazos",
  },
  {
    section: "Decretos Regulamentares (PAEP, PAD, SRP)",
    coverage: "Alta", color: "text-sky-600", icon: CheckCircle2,
    note: "Prescrição no PAD, competência no PAEP, vigência do SRP",
  },
  {
    section: "Lei Orgânica Municipal (LOM)",
    coverage: "Média-Baixa", color: "text-orange-600", icon: AlertTriangle,
    note: "Competências privativas do Prefeito, processo legislativo, bens municipais",
  },
];

// ─── TAB 3: Apostila Data ─────────────────────────────────

interface ApostilaSection {
  id: string;
  title: string;
  subtitle: string;
  frequency: "Muito Alta" | "Alta" | "Média" | "Baixa";
  color: string;
  topics: {
    name: string;
    isHot: boolean;
    content: string;
  }[];
}

const apostilaSections: ApostilaSection[] = [
  {
    id: "1-pgm",
    title: "1. Lei de Regência da PGM Canoas",
    subtitle: "Lei Municipal nº 6.817/2025 — Organização, competências e funcionamento",
    frequency: "Muito Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "Funções Exclusivas da PGM",
        isHot: true,
        content: "A PGM tem como funções exclusivas: (a) consultoria jurídica da Administração Direta; (b) representação judicial e extrajudicial do Município; (c) assessoramento ao Prefeito; (d) representação e consultoria do CANOASPREV (incluído pela Lei nº 6.833/2025). A banca Objetiva costuma confundir essas funções com competências da Câmara ou do Prefeito.",
      },
      {
        name: "Conselho Superior da PGM",
        isHot: true,
        content: "O Conselho Superior é presidido pelo Procurador-Geral e conta com a participação nata do Presidente da APMC. Deve opinar sobre acordos com proveito econômico superior a 1.000 salários mínimos. Composto por membros natos e eleitos, conforme Art. 11 da Lei 6.817/2025.",
      },
      {
        name: "Estágio Probatório do Procurador",
        isHot: true,
        content: "Regra especial: avaliado por 02 procuradores estáveis + Procurador-Geral, diferente das comissões maiores usadas em outras carreiras. O Boletim de Desempenho é o instrumento de avaliação.",
      },
      {
        name: "Substituição e Teletrabalho",
        isHot: false,
        content: "O Procurador-Geral é substituído pelo Procurador-Geral Adjunto em suas ausências. O teletrabalho é permitido para Procuradores, desde que observadas metas e condições definidas pela chefia imediata.",
      },
    ],
  },
  {
    id: "2-tributario",
    title: "2. Direito Tributário Municipal",
    subtitle: "Código Tributário, IPTU, ISSQN, ITBI e Conselho de Contribuintes",
    frequency: "Muito Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "IPTU — Fato Gerador e Base de Cálculo",
        isHot: true,
        content: "Fato gerador ocorre em 1º de janeiro de cada ano. Todo o território de Canoas é considerado urbano para fins fiscais. Base de cálculo: valor venal. Lançamento em nome do proprietário, titular do domínio útil ou possuidor. Referências: Lei 1.943/79, Art. 2º; Lei 5.961/15, Art. 133.",
      },
      {
        name: "ITBI — Incidência e Exclusões",
        isHot: true,
        content: "Incidência: transmissão onerosa de bens imóveis e cessão de direitos à aquisição. Exclui: direitos reais de garantia. Alíquota reduzida de 0,5% para SFH sobre valor financiado; 3% sobre recursos próprios. Referência: Lei nº 5.503/2010.",
      },
      {
        name: "ISSQN — Alíquotas e Obrigações",
        isHot: true,
        content: "Alíquotas: mínima 2% e máxima 5%. Sociedades pagam valor fixo de 300 URM por profissional habilitado. O 'Habite-se' depende do pagamento do ISSQN da obra. Referência: Lei nº 4.818/2003.",
      },
      {
        name: "Conselho Municipal de Contribuintes",
        isHot: false,
        content: "Órgão paritário: 7 membros (3 da Fazenda, 3 dos contribuintes e 1 Presidente). Julga em 2ª instância administrativa. Referência: Lei 1.783/1977, Art. 90.",
      },
      {
        name: "Multas e Infrações",
        isHot: false,
        content: "Iniciar atividade sem licença: multa de 65 URM. Infrações de obrigações acessórias têm valores fixos em URM. Referência: Lei 1.783/1977, Art. 65, I.",
      },
    ],
  },
  {
    id: "3-estatuto",
    title: "3. Estatuto dos Servidores de Canoas",
    subtitle: "Lei Municipal nº 2.214/1984 — Regime Jurídico dos Servidores",
    frequency: "Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "Prazos de Posse e Exercício",
        isHot: true,
        content: "ATUALIZAÇÃO IMPORTANTE: Com a Lei 6.484/2021, a posse passou a ser em 5 dias úteis, e o exercício inicia no primeiro dia útil após a posse. Prazos são o tema favorito da banca Objetiva para criar pegadinhas.",
      },
      {
        name: "Férias e Licenças",
        isHot: false,
        content: "Interrupção de férias por interesse público depende de autorização expressa do Prefeito. Luto por falecimento de tios, padrasto ou madrasta: 02 dias de afastamento (incluído pela Lei 6.698/2023).",
      },
      {
        name: "Reintegração e Vacância",
        isHot: true,
        content: "Servidor reintegrado retoma o cargo. O ocupante anterior (se estável) é reconduzido ao cargo de origem, sem indenização, aproveitado em outro cargo ou posto em disponibilidade. Referência: Art. 107, § 2º c/c Art. 43.",
      },
    ],
  },
  {
    id: "4-previdencia",
    title: "4. Regime Próprio de Previdência (RPPS)",
    subtitle: "Lei Complementar nº 14/2025 — CANOASPREV",
    frequency: "Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "Taxa de Administração",
        isHot: true,
        content: "1,7% sobre o somatório da remuneração bruta de todos os servidores ativos, inativos e pensionistas do exercício anterior. Não confundir com a alíquota de contribuição do servidor (14%).",
      },
      {
        name: "Aposentadoria Voluntária",
        isHot: true,
        content: "Idades: 62 anos (mulheres) e 65 anos (homens). Base de cálculo: média aritmética de 90% das maiores remunerações desde julho/1994.",
      },
      {
        name: "Pensão por Morte",
        isHot: true,
        content: "Sistema de cotas: cota familiar de 60% + 10% por dependente, até 100%. Segue o modelo federal da Reforma da Previdência.",
      },
    ],
  },
  {
    id: "5-ambiental",
    title: "5. Direito Ambiental e Urbanístico Municipal",
    subtitle: "Código de Meio Ambiente (Lei 4.328/1998) e PDUA (Lei 5.961/2015)",
    frequency: "Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "Estudo de Impacto de Vizinhança (EIV)",
        isHot: true,
        content: "Instrumento do PDUA para avaliar impactos na qualidade de vida da vizinhança (adensamento, paisagem urbana). Diferente do EVU (viabilidade técnica) e do RIMA (impacto ambiental).",
      },
      {
        name: "Direito de Preempção",
        isHot: false,
        content: "Prazo máximo de 05 anos, renovável após 1 ano do fim do prazo inicial. O Município tem preferência na compra de imóveis em áreas delimitadas por lei.",
      },
      {
        name: "IA Máximo (PDUA)",
        isHot: false,
        content: "Soma do IA básico da zona com o potencial construtivo recebido via Transferência do Potencial Construtivo (TPC). Alterado pela Lei nº 6.398/2020.",
      },
      {
        name: "Infrações Ambientais",
        isHot: true,
        content: "Prazo para defesa: 07 dias. Agravantes: reincidência, vantagem pecuniária, coação. Atenuantes: arrependimento eficaz e reparação espontânea do dano.",
      },
    ],
  },
  {
    id: "6-decretos",
    title: "6. Decretos Regulamentares",
    subtitle: "PAD, PAEP, SRP e Processo Administrativo Comum",
    frequency: "Alta",
    color: "text-sky-600",
    topics: [
      {
        name: "PAD — Prescrição (Decreto 462/2016)",
        isHot: true,
        content: "Faltas puníveis com repreensão, multa, suspensão: 2 anos. Demissão e cassação: 4 anos. Autoridades para instaurar: Prefeito, PGM, Controlador e Secretários delegados.",
      },
      {
        name: "PAEP — Competência (Decreto 59/2024)",
        isHot: true,
        content: "Secretário aplica: advertência, multa, suspensão e impedimento de contratar. Prefeito aplica: declaração de inidoneidade. Prescrição: 5 anos da ciência da infração.",
      },
      {
        name: "SRP — Vigência (Decreto 45/2024)",
        isHot: false,
        content: "Ata de registro de preços: 1 ano, prorrogável por igual período se comprovada vantagem. ME/EPP: exclusividade para licitações até R$ 80.000,00.",
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
          { value: "30", label: "Questões elaboradas", icon: FileText },
          { value: "6", label: "Áreas temáticas", icon: BarChart3 },
          { value: "547", label: "Modelos de questões analisados", icon: Layers },
          { value: "2024–25", label: "Legislação vigente", icon: TrendingUp },
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

      {/* Distribution */}
      <motion.div variants={fadeIn}>
        <h2 className="text-xl font-medium mb-2 text-foreground">Distribuição por Área Temática</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Distribuição das 30 questões de Legislação Municipal organizadas por área do direito com incidência local.
        </p>
        <div className="grid gap-px bg-border rounded-sm overflow-hidden">
          {categoryData.map((cat) => (
            <div key={cat.name} className="bg-background p-4 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-sm text-foreground flex-1">{cat.name}</span>
              <div className="w-32 sm:w-48 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} />
              </div>
              <span className="text-xs text-muted-foreground font-mono w-20 text-right">{cat.questions} ({cat.percentage}%)</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Coverage Analysis */}
      <motion.div variants={fadeIn} className="mt-14">
        <h2 className="text-xl font-medium mb-2 text-foreground">Cobertura: Legislação × Questões</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Análise de cobertura entre as normas municipais do edital e as questões elaboradas.
        </p>
        <div className="space-y-px bg-border rounded-sm overflow-hidden">
          {coverageAnalysis.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.section} className="bg-card p-5 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.color}`} />
                    <span className="text-sm font-medium text-foreground">{item.section}</span>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${
                    item.coverage === "Alta" ? "text-sky-700 border-sky-200 bg-sky-50 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800"
                    : item.coverage === "Média" || item.coverage === "Média-Baixa" ? "text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                    : "text-red-700 border-red-200 bg-red-50 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                  }`}>{item.coverage}</span>
                </div>
                <div className="md:col-span-1">
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
          Recomendações estratégicas baseadas na análise da legislação municipal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
          {[
            { icon: TrendingUp, title: "PGM e Tributário são prioridade", description: "A Lei de Regência da PGM, o IPTU/ISSQN/ITBI e o Estatuto do Servidor concentram a maioria das questões possíveis.", emphasis: "~60% do conteúdo" },
            { icon: Target, title: "Decore prazos e competências", description: "A banca Objetiva adora trocar prazos (5 dias úteis vs 30 dias) e competências (Prefeito vs Câmara vs PGM).", emphasis: "Armadilhas frequentes" },
            { icon: Award, title: "Legislação municipal é diferencial", description: "As normas de Canoas (LC 14/2025, Lei 6.817/2025) são recentes e serão cobradas em detalhes.", emphasis: "Normas de 2025" },
            { icon: AlertTriangle, title: "Prefeito vs Câmara vs PGM", description: "Domine a diferença entre competências privativas do Prefeito (Art. 66 LOM), exclusivas da Câmara (Art. 18) e funções da PGM.", emphasis: "Comparativo essencial" },
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
    </div>
  );
}

// ─── TAB 2: Interactive Questions ─────────────────────────

function QuestionCard({
  question, index, selected, showExplanation,
  onSelect, onToggleExplanation,
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
  const maxCount = questionsData.length;
  const progressPct = Math.round((index / maxCount) * 100);

  function getTopicIcon(topic: string) {
    if (topic.includes("PGM")) return ScrollText;
    if (topic.includes("Tributário") || topic.includes("Financeiro")) return PiggyBank;
    if (topic.includes("Administrativo") || topic.includes("Estatuto") || topic.includes("PAD") || topic.includes("Licitações")) return Building2;
    if (topic.includes("Previdenciário")) return Heart;
    if (topic.includes("Ambiental") || topic.includes("Urbanístico")) return Landmark;
    return Scale;
  }

  const TopicIcon = getTopicIcon(question.topic);

  return (
    <div className="border border-border rounded-sm bg-card overflow-hidden">
      <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">#{question.id}</span>
          <TopicIcon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">{question.topic}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">Banca Objetiva • PGM Canoas</span>
      </div>

      <div className="px-5 py-4">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{question.text}</p>
      </div>

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

      {selected !== null && (
        <div className={`px-5 py-3 border-t ${isCorrect ? "border-green-200 bg-green-50/50 dark:bg-green-950/10" : "border-red-200 bg-red-50/50 dark:bg-red-950/10"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-500" />}
            <span className={`text-xs font-medium ${isCorrect ? "text-green-700" : "text-red-600"}`}>
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
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-sky-500" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Guia de Estudos</span>
        </div>
        <h2 className="text-xl font-medium mb-2 text-foreground">
          Legislação Municipal de Canoas — Guia Completo
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Material didático baseado na análise de <strong>547 questões</strong> da Banca Objetiva para cargos jurídicos,
          adaptado à legislação específica do Município de Canoas prevista no Edital nº 125/2026.
          Os tópicos com <Star className="w-3 h-3 fill-yellow-400 text-yellow-500 inline" /> são os de maior incidência.
        </p>
      </div>

      <div className="space-y-3">
        {apostilaSections.map((section) => {
          const isOpen = expandedSection === section.id;
          const hotCount = section.topics.filter(t => t.isHot).length;

          return (
            <div key={section.id} className="border border-sky-200/50 rounded-sm overflow-hidden bg-card">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    section.frequency === "Muito Alta" ? "bg-sky-500"
                    : section.frequency === "Alta" ? "bg-emerald-500"
                    : section.frequency === "Média" ? "bg-amber-400"
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
                      <span className="text-[11px] text-muted-foreground">{hotCount} tópicos</span>
                    </div>
                  )}
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    section.frequency === "Muito Alta" ? "text-sky-600 border-sky-200 bg-sky-50"
                    : section.frequency === "Alta" ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                    : "text-amber-600 border-amber-200 bg-amber-50"
                  }`}>
                    {section.frequency}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

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
                        <div key={topic.name} className={`p-4 rounded-sm ${topic.isHot ? "bg-sky-50/70 border border-sky-200" : "bg-muted/30"}`}>
                          <div className="flex items-start gap-3">
                            {topic.isHot && <Star className="w-4 h-4 fill-yellow-400 text-yellow-500 shrink-0 mt-0.5" />}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="text-sm font-medium text-foreground">{topic.name}</h4>
                                {topic.isHot && (
                                  <span className="text-[11px] text-sky-600 font-medium">⚡ Prioridade</span>
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

      <div className="mt-10 p-5 bg-card border border-sky-200/50 rounded-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Como usar este material</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Este guia foi elaborado a partir da análise de 547 questões da Banca Objetiva para cargos jurídicos
              (modelos 001-547), cruzando os assuntos cobrados com a legislação municipal de Canoas disponível e
              prevista no edital. Os tópicos marcados com <Star className="w-3 h-3 fill-yellow-400 text-yellow-500 inline" /> são prioridade
              máxima. As leis municipais de Canoas mais recentes (LC 14/2025, Lei 6.817/2025, Lei 6.883/2025)
              têm alta probabilidade de cobrança por serem normas novas e específicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────

export default function LegislacaoMunicipal() {
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
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sky-500" />
              </div>
              <span className="text-xs font-medium text-sky-600 bg-sky-50 dark:bg-sky-950/50 px-2 py-1 rounded-sm border border-sky-200/50">
                Disciplina Interdisciplinar
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.1] mb-3 text-foreground"
            >
              Legislação Municipal de Canoas
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-sm text-muted-foreground max-w-2xl leading-relaxed"
            >
              Disciplina interdisciplinar com <strong>30 questões</strong> elaboradas a partir da análise de{" "}
              <strong>547 modelos</strong> da Banca Objetiva, adaptadas à legislação municipal de Canoas.
              Abrange as normas locais com incidência em Direito Administrativo, Tributário, Previdenciário,
              Ambiental/Urbanístico e a Lei de Regência da PGM.
            </motion.p>

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
                    Guia
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
              <motion.div initial="initial" animate="animate" variants={stagger}>
                <TabAnaliseEstatistica />
              </motion.div>
            </TabsContent>
            <TabsContent value="questoes" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <TabRepositorioQuestoes />
              </motion.div>
            </TabsContent>
            <TabsContent value="apostila" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
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
            Material baseado em 547 modelos de questões da Banca Objetiva — adaptado à legislação municipal de Canoas
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
