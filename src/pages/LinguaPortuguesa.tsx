import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, HelpCircle, FileText, Target } from "lucide-react";
import { Link } from "react-router";
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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// Distribution by edital category
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

// Top 15 most frequent topics
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

// Coverage comparison: edital section vs questions found
const coverageAnalysis = [
  {
    section: "1. Textos — Leitura e interpretação",
    editalItems: ["Leitura e interpretação", "Vocabulário contextual", "Reorganização de orações", "Coesão e coerência", "Tipos e gêneros textuais"],
    coverage: "Alta",
    coverageColor: "text-green-600",
    icon: CheckCircle2,
    note: "Bem representado (26,3% das questões)",
  },
  {
    section: "2. Fono-ortografia",
    editalItems: ["Fonemas e grafemas", "Estrutura silábica", "Processos fonológicos"],
    coverage: "Média",
    coverageColor: "text-amber-600",
    icon: HelpCircle,
    note: "Aparece com 8%, mas cobre apenas fonologia básica",
  },
  {
    section: "3. Morfossintaxe",
    editalItems: ["Classes de palavras", "Formação de palavras", "Flexão nominal", "Flexão verbal", "Concordância", "Regência", "Funções sintáticas"],
    coverage: "Alta",
    coverageColor: "text-green-600",
    icon: CheckCircle2,
    note: "Melhor representada (35,8%) — foco em concordância e regência",
  },
  {
    section: "4. Sintaxe",
    editalItems: ["Funções sintáticas", "Período simples/composto", "Análise sintática", "Concordância/regência", "Crase", "Colocação pronominal"],
    coverage: "Alta",
    coverageColor: "text-green-600",
    icon: CheckCircle2,
    note: "Crase com 5 questões; colocação pronominal e análise sintática presentes",
  },
  {
    section: "5. Semântica",
    editalItems: ["Sinonímia/antonímia", "Homônimos/parônimos", "Denotação/conotação", "Figuras de linguagem"],
    coverage: "Média-Baixa",
    coverageColor: "text-orange-600",
    icon: AlertTriangle,
    note: "Apenas 6,6% — figuras de linguagem e parônimos com 1 questão cada",
  },
  {
    section: "6. Variação Linguística",
    editalItems: ["Variedades regionais/sociais", "Norma-padrão vs usos sociais"],
    coverage: "Nula",
    coverageColor: "text-red-600",
    icon: AlertTriangle,
    note: "Nenhuma questão encontrada — ESTUDE POR FORA",
  },
  {
    section: "7. Elementos Notacionais",
    editalItems: ["Ortografia oficial", "Acentuação gráfica", "Sinais de pontuação", "Recursos gráficos (aspas, travessão, etc.)"],
    coverage: "Baixa",
    coverageColor: "text-orange-600",
    icon: AlertTriangle,
    note: "Acentuação (1 questão) e ortografia (4) presentes, mas sem questões sobre pontuação ou recursos gráficos",
  },
];

// All 73 unique topic frequencies
const allTopics = [
  { topic: "Interpretação de Texto", count: 9 },
  { topic: "Por que/porque/porquê/por quê", count: 8 },
  { topic: "Sentidos do texto", count: 8 },
  { topic: "Equivalência e substituição de palavras", count: 5 },
  { topic: "Emprego do sinal indicativo de crase", count: 5 },
  { topic: "Concordância verbal", count: 5 },
  { topic: "Concordância verbal e nominal (sintaxe de concordância)", count: 5 },
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
  { topic: "Reorganização e reescrita de orações e períodos", count: 2 },
  { topic: "Análise Morfológica", count: 2 },
  { topic: "Pontuação", count: 2 },
  { topic: "Reescrita de frases e parágrafos do texto", count: 2 },
  { topic: "Parônimos", count: 2 },
  { topic: "Voz passiva sintética", count: 1 },
  { topic: "Regência nominal", count: 1 },
  { topic: "Linguagem denotativa e conotativa", count: 1 },
  { topic: "Fonologia", count: 1 },
  { topic: "Conjunções coordenativas adversativas", count: 1 },
  { topic: "Voz passiva", count: 1 },
  { topic: "Sentido denotativo, próprio ou literal", count: 1 },
  { topic: "Classificação dos verbos quanto à predicação", count: 1 },
  { topic: "Verbos", count: 1 },
  { topic: "Ortografia", count: 1 },
  { topic: "Homônimos", count: 1 },
  { topic: "Aposto", count: 1 },
  { topic: "Tipologias Textuais", count: 1 },
  { topic: "Orações coordenadas explicativas", count: 1 },
  { topic: "Adjetivos", count: 1 },
  { topic: "Conjunções coordenativas aditivas", count: 1 },
  { topic: "Inferência Textual", count: 1 },
  { topic: "Verbos transitivos", count: 1 },
  { topic: "Emprego das letras G e J", count: 1 },
  { topic: "Significado dos Morfemas", count: 1 },
  { topic: "Uso dos dois-pontos", count: 1 },
  { topic: "Formação do plural", count: 1 },
  { topic: "Sintaxe de regência", count: 1 },
  { topic: "Regras de acentuação", count: 1 },
  { topic: "Relações de sinonímia e antonímia", count: 1 },
  { topic: "Ortografia oficial e acentuação gráfica", count: 1 },
  { topic: "Termos essenciais da oração", count: 1 },
  { topic: "Regras práticas de ocorrência de crase", count: 1 },
  { topic: "Encontro consonantal e grupo consonantal", count: 1 },
  { topic: "Objeto direto", count: 1 },
  { topic: "Subjuntivo", count: 1 },
  { topic: "Substantivo simples e composto", count: 1 },
  { topic: "Flexão de voz (ativa, passiva, reflexiva)", count: 1 },
  { topic: "Voz ativa", count: 1 },
  { topic: "Reforma Ortográfica de 2009", count: 1 },
  { topic: "Advérbios", count: 1 },
  { topic: "Verbo transitivo direto", count: 1 },
  { topic: "Vocativo", count: 1 },
  { topic: "Orações subordinadas adverbiais concessivas", count: 1 },
  { topic: "Mecanismos de coesão textual", count: 1 },
  { topic: "Funções morfossintáticas da palavra SE", count: 1 },
  { topic: "Estrutura das Palavras", count: 1 },
  { topic: "Classes de palavras (classes gramaticais)", count: 1 },
  { topic: "Gêneros textuais", count: 1 },
  { topic: "Casos em que não há crase", count: 1 },
  { topic: "Figuras de linguagem", count: 1 },
  { topic: "Fatores de mesóclise", count: 1 },
  { topic: "Sujeito", count: 1 },
];

// Pie chart data for simpler visualization
const pieData = categoryData.map(d => ({
  name: d.name,
  value: d.questions,
  color: d.color,
}));

export default function LinguaPortuguesa() {
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
      <section className="pt-16 pb-12 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                <BookOpen className="w-3 h-3" />
                Análise Estatística
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.1] mb-4 text-foreground"
            >
              Língua Portuguesa
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-8"
            >
              Dashboard analítico com a distribuição de <strong>137 questões</strong> da{" "}
              <strong>Banca Objetiva</strong> em Língua Portuguesa para cargos de
              Procurador e Advogado (2022–2026). Compare o que foi cobrado com o
              conteúdo programático do Edital nº 125/2026 e direcione seus estudos
              com base em dados reais.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden"
            >
              {[
                { value: "137", label: "Questões analisadas", icon: FileText },
                { value: "73", label: "Tópicos distintos", icon: BarChart3 },
                { value: "5", label: "Categorias do edital", icon: BookOpen },
                { value: "2022–26", label: "Período das provas", icon: TrendingUp },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-background p-5 flex flex-col items-start gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-2xl font-light text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Distribution Chart */}
      <section className="py-14 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-medium mb-2 text-foreground">
              Distribuição por Categoria do Edital
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Quantidade de questões encontradas em cada uma das grandes áreas do
              programa de Língua Portuguesa.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Bar Chart */}
              <div className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={categoryData} margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      allowDecimals={false}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="questions" radius={[2, 2, 0, 0]} barSize={32}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>

              {/* Pie Chart */}
              <div className="h-[300px] flex items-center justify-center">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
            </div>

            {/* Legend / Summary */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-px bg-border rounded-sm overflow-hidden">
              {categoryData.map((cat) => (
                <div
                  key={cat.name}
                  className="bg-background p-4 flex flex-col items-center text-center"
                >
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-muted-foreground mb-0.5 leading-tight">{cat.name}</span>
                  <span className="text-sm font-medium text-foreground">{cat.questions} ({cat.percentage}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Topics */}
      <section className="py-14 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-medium mb-2 text-foreground">
              Tópicos Mais Frequentes
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Os 15 assuntos que mais aparecem nas provas da Banca Objetiva. Priorize
              estes tópicos nos seus estudos.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">#</th>
                    <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópico</th>
                    <th className="text-right py-3 pl-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">Questões</th>
                    <th className="text-right py-3 pl-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Frequência</th>
                  </tr>
                </thead>
                <tbody>
                  {topTopics.map((row, i) => (
                    <tr
                      key={row.topic}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 pr-4 text-muted-foreground font-mono text-xs">{row.rank}</td>
                      <td className="py-3 pr-4 text-foreground">{row.topic}</td>
                      <td className="py-3 pl-4 text-right font-mono text-sm text-foreground">{row.count}</td>
                      <td className="py-3 pl-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-foreground rounded-full"
                              style={{ width: `${(row.count / 9) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground font-mono w-10 text-right">
                            {row.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Analysis */}
      <section className="py-14 px-6 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-medium mb-2 text-foreground">
              Comparativo: Edital × Questões da Banca
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Análise de cobertura entre as 7 seções do programa de Língua Portuguesa
              (Anexo III do Edital nº 125/2026) e as questões da Banca Objetiva.
            </p>

            <div className="space-y-px bg-border rounded-sm overflow-hidden">
              {coverageAnalysis.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.section}
                    className="bg-card p-5 grid grid-cols-1 md:grid-cols-5 gap-4 items-start"
                  >
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3">
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.coverageColor}`} />
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{item.section}</h3>
                          <ul className="mt-2 space-y-0.5">
                            {item.editalItems.map((sub, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground">
                                — {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${
                          item.coverage === "Alta"
                            ? "text-green-700 border-green-200 bg-green-50 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                            : item.coverage === "Média"
                            ? "text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                            : item.coverage === "Média-Baixa"
                            ? "text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                            : item.coverage === "Baixa"
                            ? "text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                            : "text-red-700 border-red-200 bg-red-50 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                        }`}
                      >
                        {item.coverage}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-14 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-medium mb-2 text-foreground">
              Insights para o Candidato
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Com base na análise estatística das 137 questões, recomendações
              estratégicas para sua preparação.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
              {[
                {
                  icon: TrendingUp,
                  title: "Morfossintaxe é prioridade máxima",
                  description: "Quase 36% das questões — domine concordância verbal e nominal, regência e flexão verbal. É o carro-chefe da banca.",
                  emphasis: "35,8% das questões",
                },
                {
                  icon: Target,
                  title: "Crase e 'porquês' são tópicos certos",
                  description: "Crase aparece em 5 questões e o uso dos porquês em 8 — assuntos relativamente simples que valem pontos preciosos.",
                  emphasis: "13 questões combinadas",
                },
                {
                  icon: BookOpen,
                  title: "Interpretação de texto é onipresente",
                  description: "Interpretação de texto (9 questões) e sentidos do texto (8) aparecem em praticamente todas as provas. Treine leitura crítica.",
                  emphasis: "17 questões combinadas",
                },
                {
                  icon: AlertTriangle,
                  title: "Pontos cegos: Variação Linguística",
                  description: "Nenhuma questão encontrada sobre variedades linguísticas ou norma-padrão. Estude este tópico por fora — pode ser a 'surpresa' da prova.",
                  emphasis: "0 questões encontradas",
                },
                {
                  icon: HelpCircle,
                  title: "Semântica: pouco cobrada, mas presente",
                  description: "Figuras de linguagem, parônimos e sinônimos aparecem com 1 questão cada — estude o básico, mas sem exageros.",
                  emphasis: "6,6% das questões",
                },
                {
                  icon: FileText,
                  title: "Elementos notacionais: lacuna importante",
                  description: "Acentuação (1 questão) e ortografia (4) aparecem pouco. Não há questões sobre pontuação ou recursos gráficos — estude separadamente.",
                  emphasis: "Pode cair na prova",
                },
              ].map((insight, i) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={i}
                    className="bg-background p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground mb-2">
                          {insight.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                          {insight.description}
                        </p>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">
                          {insight.emphasis}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Topic List */}
      <section className="py-14 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-medium mb-2 text-foreground">
              Lista Completa de Tópicos ({allTopics.length})
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Todos os 73 tópicos distintos identificados nas 137 questões analisadas,
              ordenados por frequência.
            </p>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-border rounded-sm">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">#</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tópico</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Frequência</th>
                  </tr>
                </thead>
                <tbody>
                  {allTopics.map((item, i) => (
                    <tr
                      key={item.topic}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{i + 1}</td>
                      <td className="py-2.5 px-4 text-foreground">{item.topic}</td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-foreground/60 rounded-full"
                              style={{ width: `${(item.count / 9) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground w-6 text-right">
                            {item.count}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
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
