import { motion } from "framer-motion";
import { ArrowLeft, FileText, BookOpen, ChevronDown, Search, ScrollText } from "lucide-react";
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

export default function Legislacoes() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return constituicaoSections;
    const q = searchQuery.toLowerCase();
    return constituicaoSections.filter(
      (s) =>
        s.titulo.toLowerCase().includes(q) ||
        s.subtitulo.toLowerCase().includes(q) ||
        s.texto.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalChars = constituicaoSections.reduce((acc, s) => acc + s.texto.length, 0);

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
                {constituicaoSections.length} seções
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <FileText className="w-3 h-3" />
                {(totalChars / 1000).toFixed(0)}K caracteres
              </Badge>
            </div>

            {/* Search */}
            <div className="relative mt-5 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar na Constituição..."
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
          <Accordion type="multiple" className="space-y-3">
            {filteredSections.map((section, i) => (
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
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
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
                      <Badge
                        variant="outline"
                        className="ml-auto shrink-0 text-[10px] py-0 h-5"
                      >
                        {(section.texto.length / 1000).toFixed(0)}K chars
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="pt-3 border-t border-border/50">
                      <pre className="text-xs text-foreground/80 leading-relaxed font-sans whitespace-pre-wrap">
                        {section.texto}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

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
            Constituição da República Federativa do Brasil de 1988 — Texto compilado
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
