import { motion } from "framer-motion";
import {
  ArrowLeft, FileText, BookOpen, Search, ScrollText, ExternalLink,
  Scale, Building2, Gavel
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { constituicaoSections } from "@/data/legislacoes/constituicao-federal";
import { lei8906Sections } from "@/data/legislacoes/lei-8906-1994";
import { codigoEticaSections } from "@/data/legislacoes/codigo-etica-oab";
import { VadeMecumText } from "@/components/VadeMecumText";
import type { SecaoLegislacao } from "@/data/legislacoes/types";

interface GrupoLegislacao {
  nome: string;
  icone: typeof ScrollText;
  descricao: string;
  secoes: SecaoLegislacao[];
}

import { regulamentoGeralOabSections } from "@/data/legislacoes/regulamento-geral-oab";
import { lei6817Sections } from "@/data/legislacoes/lei-6817-2025";

const grupos: GrupoLegislacao[] = [
  {
    nome: "Constituição Federal",
    icone: Gavel,
    descricao: "Constituição da República Federativa do Brasil de 1988 — texto compilado com todas as emendas constitucionais.",
    secoes: constituicaoSections,
  },
  {
    nome: "Legislação Profissional",
    icone: Scale,
    descricao: "Estatuto da Advocacia, Código de Ética e Disciplina da OAB, Regulamento Geral e Lei de Regência da PGM Canoas.",
    secoes: [
      ...lei8906Sections.map((s) => ({
        ...s,
        subtitulo: s.subtitulo || "Estatuto da Advocacia e a OAB",
      })),
      ...codigoEticaSections,
      ...regulamentoGeralOabSections,
      ...lei6817Sections,
    ],
  },
];

export default function Legislacoes() {
  const [searchQuery, setSearchQuery] = useState("");

  const allSections = useMemo(
    () => grupos.flatMap((g) => g.secoes),
    []
  );

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return allSections;
    const q = searchQuery.toLowerCase();
    return allSections.filter(
      (s) =>
        s.titulo.toLowerCase().includes(q) ||
        s.subtitulo.toLowerCase().includes(q) ||
        s.texto.toLowerCase().includes(q)
    );
  }, [searchQuery, allSections]);

  const totalChars = allSections.reduce((acc, s) => acc + s.texto.length, 0);

  const getSectionGroup = (sectionId: string) => {
    if (sectionId.startsWith("preambulo") || sectionId.startsWith("titulo-") || sectionId === "adct")
      return grupos[0];
    return grupos[1];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="text-sm font-medium tracking-tight text-foreground">
            Legislações e Normas
          </span>
        </div>
      </header>

      {/* Intro */}
      <section className="pt-12 pb-6 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ScrollText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                  Legislações e Normas
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Acervo completo de legislações aplicáveis ao concurso da PGM Canoas — 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <BookOpen className="w-3 h-3" />
                {allSections.length} normas
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <FileText className="w-3 h-3" />
                {(totalChars / 1000).toFixed(0)}K caracteres
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <Building2 className="w-3 h-3" />
                {grupos.length} categorias
              </Badge>
            </div>

            {/* Search */}
            <div className="relative mt-5 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar em todas as normas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {grupos.map((grupo, gi) => {
            const GrupoIcon = grupo.icone;
            const grupoSections = filteredSections.filter((s) => {
              const grupoAtual = getSectionGroup(s.id);
              return grupoAtual.nome === grupo.nome;
            });

            if (grupoSections.length === 0) return null;

            return (
              <div key={grupo.nome} className="mb-10 last:mb-0">
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-border/50" />
                  <div className="flex items-center gap-2 px-3">
                    <GrupoIcon className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-medium text-foreground">{grupo.nome}</h2>
                  </div>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                <p className="text-xs text-muted-foreground mb-4 px-1">
                  {grupo.descricao}
                </p>

                <Accordion type="multiple" className="space-y-2">
                  {grupoSections.map((section, i) => {
                    const isPendente = section.texto.startsWith("[Texto completo disponível");

                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                      >
                        <AccordionItem
                          value={section.id}
                          className="border border-border bg-card data-[state=open]:bg-muted/30 transition-colors rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-5 py-3.5 hover:no-underline hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPendente ? 'bg-amber-500/10' : 'bg-primary/10'}`}>
                                {isPendente ? (
                                  <ExternalLink className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <FileText className="w-4 h-4 text-primary" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-sm font-medium text-foreground block truncate">
                                  {section.titulo}
                                </span>
                                {section.subtitulo && (
                                  <span className="text-[11px] text-muted-foreground block truncate">
                                    {section.subtitulo}
                                  </span>
                                )}
                              </div>
                              {isPendente ? (
                                <Badge variant="outline" className="ml-auto shrink-0 text-[10px] py-0 h-5 border-amber-500/30 text-amber-600">
                                  PDF
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="ml-auto shrink-0 text-[10px] py-0 h-5">
                                  {(section.texto.length / 1000).toFixed(0)}K chars
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-5">
                            <div className="pt-3 border-t border-border/50">
                              {isPendente ? (
                                <div className="space-y-3">
                                  <p className="text-xs text-muted-foreground">
                                    O texto completo desta norma está disponível no PDF original.
                                    Faça o download clicando no link abaixo:
                                  </p>
                                  {section.texto.split("\n").filter(l => l.includes("drive.google.com")).map((link, li) => {
                                    const url = link.replace("🔗 ", "").trim();
                                    return (
                                      <a
                                        key={li}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm font-medium hover:bg-muted/80 transition-colors"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                        Abrir PDF Original
                                      </a>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="mt-4">
                                  <VadeMecumText content={section.texto} />
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    );
                  })}
                </Accordion>
              </div>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">
                Nenhum resultado encontrado para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Legislações aplicáveis ao concurso PGM Canoas — Edital nº 125/2026
          </p>
          <a
            href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Fonte: Planalto ›
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
