import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, FileText, Scale, Landmark, Building2, Gavel, Shield, Heart, Briefcase, PiggyBank, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const examInfo = [
  {
    label: "Órgão",
    value: "Prefeitura Municipal de Canoas / PGM",
  },
  {
    label: "Cargo",
    value: "Procurador Municipal",
  },
  {
    label: "Edital",
    value: "Nº 125/2026",
  },
  {
    label: "Disciplinas",
    value: "10 áreas do Direito + Português",
  },
  {
    label: "Banca",
    value: "Instituto Objetiva",
  },
];

const disciplines = [
  {
    title: "Língua Portuguesa",
    description: "Compreensão textual, fonologia, morfossintaxe, sintaxe, semântica, variação linguística e elementos notacionais da escrita.",
    icon: BookOpen,
    topics: 7,
  },
  {
    title: "Legislação Profissional",
    description: "Estatuto da Advocacia, Código de Ética da OAB e Lei de Regência da PGM de Canoas.",
    icon: ScrollText,
    topics: 3,
  },
  {
    title: "Direito Administrativo",
    description: "Princípios, atos, agentes, licitações, contratos, responsabilidade civil, serviços públicos e legislação municipal específica.",
    icon: Building2,
    topics: 35,
  },
  {
    title: "Direito Ambiental e Urbanístico",
    description: "Tutela constitucional, licenciamento, SNUC, Estatuto da Cidade, Código Florestal, PDUA de Canoas e direito urbanístico.",
    icon: Landmark,
    topics: 18,
  },
  {
    title: "Direito Civil e Consumidor",
    description: "LINDB, pessoas, bens, negócios jurídicos, obrigações, contratos, responsabilidade civil, direitos reais e CDC.",
    icon: Scale,
    topics: 20,
  },
  {
    title: "Direito Constitucional",
    description: "Constituição de 1988, direitos fundamentais, organização do Estado, controle de constitucionalidade, sistema tributário e reforma tributária EC 132/2023.",
    icon: Gavel,
    topics: 25,
  },
  {
    title: "Direito do Trabalho e Processo do Trabalho",
    description: "Princípios, vínculo empregatício, CLT, jornada, remuneração, terceirização, processo do trabalho e recursos.",
    icon: Briefcase,
    topics: 20,
  },
  {
    title: "Direito Previdenciário",
    description: "Seguridade social, RGPS, RPPS, benefícios, aposentadorias, reforma EC 103/2019 e CANOASPREV.",
    icon: Heart,
    topics: 10,
  },
  {
    title: "Direito Processual Civil",
    description: "CPC, ação, tutela provisória, procedimento comum, provas, recursos, execução, ações constitucionais e LEF.",
    icon: Shield,
    topics: 18,
  },
  {
    title: "Direito Tributário e Financeiro",
    description: "CTN, sistema tributário nacional, ISS, ITBI, Reforma Tributária (LC 214/2025), LRF, execução fiscal e Código Tributário de Canoas.",
    icon: PiggyBank,
    topics: 28,
  },
];

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight text-foreground">
            PGM Canoas — 2026
          </span>
          <nav className="flex items-center gap-6">
            <a href="#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
            <a href="#disciplinas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Disciplinas
            </a>
            <Link
              to="/programa"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Programa Completo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                <FileText className="w-3 h-3" />
                Edital nº 125/2026
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-foreground"
            >
              Concurso Público
              <br />
              <span className="font-medium">Procurador Municipal</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
            >
              Plataforma de estudos para o concurso da Procuradoria-Geral do Município de
              Canoas. Todo o programa do edital organizado por disciplina para sua
              preparação.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link to="/programa">
                <Button className="h-11 px-6 text-sm bg-foreground text-background hover:bg-foreground/90 rounded-sm">
                  Acessar Programa de Estudos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#disciplinas">
                <Button variant="outline" className="h-11 px-6 text-sm border-border rounded-sm">
                  Ver Disciplinas
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Exam Details */}
      <section id="sobre" className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border mb-16">
            {examInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-background p-6"
              >
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  {info.label}
                </p>
                <p className="text-base font-medium text-foreground">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-medium mb-6 text-foreground"
            >
              Sobre o Concurso
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 text-sm text-muted-foreground leading-relaxed"
            >
              <p>
                A Prefeitura Municipal de Canoas, através do Instituto Objetiva, realiza
                Concurso Público destinado ao provimento de cargos de Procurador Municipal,
                cargo de nível superior da Procuradoria-Geral do Município (PGM).
              </p>
              <p>
                O concurso será regido pelo Edital nº 125/2026 e compreenderá a avaliação de
                conhecimentos em Língua Portuguesa e em dez áreas do Direito, conforme
                programa detalhado no Anexo III do edital.
              </p>
              <p>
                A PGM de Canoas, reestruturada pela Lei Municipal nº 6.817/2025, é o órgão
                responsável pela representação judicial e extrajudicial do município, bem como
                pela consultoria e assessoramento jurídico do Poder Executivo municipal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disciplines Grid */}
      <section id="disciplinas" className="py-20 px-6 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl font-medium mb-3 text-foreground">
              Programa de Estudos
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {disciplines.length} disciplinas organizadas conforme o Anexo III do Edital nº 125/2026.
              Clique para acessar o conteúdo programático completo de cada área.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {disciplines.map((discipline, i) => {
              const Icon = discipline.icon;
              return (
                <motion.div
                  key={discipline.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="bg-card p-6 group hover:bg-muted/50 transition-colors duration-200"
                >
                  <Link to="/programa" className="block">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground mb-1.5 group-hover:text-foreground transition-colors">
                          {discipline.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                          {discipline.description}
                        </p>
                        <span className="text-[11px] text-muted-foreground/60">
                          {discipline.topics} tópicos
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-medium mb-3 text-foreground">
              Prepare-se com o programa oficial
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Acesse o conteúdo programático completo do Edital nº 125/2026, organizado
            por disciplina para facilitar seus estudos.
            </p>
            <Link to="/programa">
              <Button className="h-11 px-8 text-sm bg-foreground text-background hover:bg-foreground/90 rounded-sm">
                Ver Programa Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Conteúdo baseado no Edital nº 125/2026 — Instituto Objetiva
          </p>
          <p className="text-xs text-muted-foreground">
            Plataforma de estudos — PGM Canoas 2026
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
