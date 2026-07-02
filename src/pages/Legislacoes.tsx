import {
  useState, useEffect, useRef, useCallback, useMemo, memo,
  type ElementType,
} from "react";
import { motion } from "framer-motion";
import {
  Search, ArrowLeft, BookOpen, Eye, EyeOff,
  Scale, Building2, Gavel, Landmark, Briefcase, Heart,
  PiggyBank, ScrollText, Shield, Menu, ChevronRight, Loader2, FileText,
} from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  parseDocument,
  type DocBlock,
  type ECRef,
  type TOCEntry,
  type ParseResult,
} from "@/lib/normParser";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ViewMode = "clean" | "rich";
type SidebarTab = "estrutura" | "disciplinas";

// ─────────────────────────────────────────────────────────────────────────────
// Discipline navigation data
// ─────────────────────────────────────────────────────────────────────────────

interface DiscItem {
  label: string;
  normaId: "cf88" | "ctn" | "cpc" | "pgm-canoas" | "oab" | "regulamento-oab" | "codigo-etica-oab";
  sectionId: string;
  artigos?: string;
}

interface Disc {
  id: string;
  label: string;
  icon: ElementType;
  color: string;
  items: DiscItem[];
}

const DISCIPLINAS: Disc[] = [
  {
    id: "constitucional", label: "Direito Constitucional", icon: Gavel, color: "text-blue-500",
    items: [
      { label: "CF88 > Título I — Princípios Fund.", normaId: "cf88", sectionId: "titulo-i", artigos: "Arts. 1–4" },
      { label: "CF88 > Título II — Direitos e Garantias", normaId: "cf88", sectionId: "titulo-ii", artigos: "Arts. 5–17" },
      { label: "CF88 > Título III — Org. do Estado", normaId: "cf88", sectionId: "titulo-iii", artigos: "Arts. 18–43" },
      { label: "CF88 > Título IV — Org. dos Poderes", normaId: "cf88", sectionId: "titulo-iv", artigos: "Arts. 44–135" },
      { label: "CF88 > Título V — Defesa do Estado", normaId: "cf88", sectionId: "titulo-v", artigos: "Arts. 136–144" },
      { label: "CF88 > Título IX — Disposições Gerais", normaId: "cf88", sectionId: "titulo-ix", artigos: "Arts. 235–246" },
    ],
  },
  {
    id: "administrativo", label: "Direito Administrativo", icon: Building2, color: "text-slate-500",
    items: [
      { label: "CF88 > Da Administração Pública", normaId: "cf88", sectionId: "art-37", artigos: "Arts. 37–43" },
      { label: "CF88 > Fiscalização Financeira e Orçam.", normaId: "cf88", sectionId: "art-70", artigos: "Arts. 70–75" },
      { label: "PGM > Competência, Estrutura e Organização", normaId: "pgm-canoas", sectionId: "livro-i", artigos: "Livro I" },
      { label: "PGM > Das Carreiras", normaId: "pgm-canoas", sectionId: "livro-ii", artigos: "Livro II" },
      { label: "PGM > Disposições Finais e Transitórias", normaId: "pgm-canoas", sectionId: "livro-iii", artigos: "Livro III" },
    ],
  },
  {
    id: "tributario", label: "Direito Tributário e Financeiro", icon: PiggyBank, color: "text-emerald-500",
    items: [
      { label: "CF88 > Título VI — Tributação e Orçamento", normaId: "cf88", sectionId: "titulo-vi", artigos: "Arts. 145–169" },
      { label: "CTN > Código Tributário Nacional (Inteiro)", normaId: "ctn", sectionId: "livro-primeiro", artigos: "Lei nº 5.172/1966" },
    ],
  },
  {
    id: "ambiental", label: "Dir. Ambiental e Urbanístico", icon: Landmark, color: "text-green-500",
    items: [
      { label: "CF88 > Da Política Urbana", normaId: "cf88", sectionId: "art-182", artigos: "Arts. 182–183" },
      { label: "CF88 > Do Meio Ambiente", normaId: "cf88", sectionId: "art-225", artigos: "Art. 225" },
    ],
  },
  {
    id: "trabalho", label: "Direito do Trabalho", icon: Briefcase, color: "text-orange-500",
    items: [
      { label: "CF88 > Dos Direitos Sociais", normaId: "cf88", sectionId: "art-6", artigos: "Arts. 6–11" },
    ],
  },
  {
    id: "previdenciario", label: "Direito Previdenciário", icon: Heart, color: "text-rose-500",
    items: [
      { label: "CF88 > Da Seguridade Social", normaId: "cf88", sectionId: "art-194", artigos: "Arts. 194–204" },
    ],
  },
  {
    id: "processual", label: "Direito Processual Civil", icon: Shield, color: "text-violet-500",
    items: [
      { label: "CF88 > Remédios Const. (Art. 5º)", normaId: "cf88", sectionId: "art-5", artigos: "§§ LXVIII–LXXXIII" },
      { label: "CF88 > Do Poder Judiciário", normaId: "cf88", sectionId: "titulo-iv", artigos: "Arts. 92–135" },
      { label: "CF88 > Das Funções Essenciais à Justiça", normaId: "cf88", sectionId: "art-127", artigos: "Arts. 127–135" },
      
      { label: "CPC > Função jurisdicional", normaId: "cpc", sectionId: "parte-geral-livro-ii", artigos: "Livro II (Geral)" },
      { label: "CPC > Ação: conceito, natureza e cond.", normaId: "cpc", sectionId: "parte-geral-livro-ii-titulo-i", artigos: "Título I" },
      { label: "CPC > Preclusão", normaId: "cpc", sectionId: "parte-geral-livro-iv", artigos: "Atos e Prazos" },
      { label: "CPC > Sujeitos, Litisconsórcio, Interv.", normaId: "cpc", sectionId: "parte-geral-livro-iii", artigos: "Livro III" },
      { label: "CPC > Poderes/Deveres Juiz. MP, Adv. Publ.", normaId: "cpc", sectionId: "parte-geral-livro-iii", artigos: "Títulos IV a VII" },
      { label: "CPC > Atos processuais, prazos, nulidades", normaId: "cpc", sectionId: "parte-geral-livro-iv", artigos: "Livro IV" },
      { label: "CPC > Tutela Provisória (Urgência/Evidência)", normaId: "cpc", sectionId: "parte-geral-livro-v", artigos: "Livro V" },
      { label: "CPC > Formação, suspensão, extinção proc.", normaId: "cpc", sectionId: "parte-geral-livro-vi", artigos: "Livro VI" },
      { label: "CPC > Processo Conhecimento/Cump. Sentença", normaId: "cpc", sectionId: "parte-especial-livro-i", artigos: "Livro I (Esp)" },
      { label: "CPC > Procedimento comum, PI, Improc liminar", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i", artigos: "Tít I, Caps I-III" },
      { label: "CPC > Audiência de conciliação ou mediação", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-v", artigos: "Cap V" },
      { label: "CPC > Contestação, reconvenção, revelia", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-vi", artigos: "Caps VI-VIII" },
      { label: "CPC > Providências preliminares e saneamento", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-ix", artigos: "Cap IX" },
      { label: "CPC > Julgamento conforme estado do processo", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-x", artigos: "Cap X" },
      { label: "CPC > Audiência de instrução e julgamento", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-xi", artigos: "Cap XI" },
      { label: "CPC > Provas", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-xii", artigos: "Cap XII" },
      { label: "CPC > Sentença e coisa julgada", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-i-cap-xiii", artigos: "Cap XIII" },
      { label: "CPC > Cumprimento da sentença", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-ii", artigos: "Título II" },
      { label: "CPC > Procedimentos especiais", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-iii", artigos: "Título III" },
      { label: "CPC > Jurisdição voluntária", normaId: "cpc", sectionId: "parte-especial-livro-i-titulo-iii-cap-xv", artigos: "Cap XV" },
      { label: "CPC > Processos de execução", normaId: "cpc", sectionId: "parte-especial-livro-ii", artigos: "Livro II (Esp)" },
      { label: "CPC > Processos nos tribunais e recursos", normaId: "cpc", sectionId: "parte-especial-livro-iii", artigos: "Livro III (Esp)" },
      { label: "CPC > Disposições finais e transitórias", normaId: "cpc", sectionId: "parte-especial-livro-complementar", artigos: "Livro Comp." },
    ],
  },
  {
    id: "civil", label: "Direito Civil", icon: Scale, color: "text-amber-500",
    items: [
      { label: "CF88 > Da Família", normaId: "cf88", sectionId: "art-226", artigos: "Arts. 226–230" },
    ],
  },
  {
    id: "legislacao", label: "Legislação Profissional", icon: ScrollText, color: "text-indigo-500",
    items: [
      { label: "CF88 > Das Funções Essenciais à Justiça", normaId: "cf88", sectionId: "art-127", artigos: "Arts. 127–135" },
      { label: "OAB > Da Advocacia", normaId: "oab", sectionId: "titulo-i", artigos: "Título I" },
      { label: "OAB > Da Ordem dos Advogados do Brasil", normaId: "oab", sectionId: "titulo-ii", artigos: "Título II" },
      { label: "OAB > Do Processo na OAB", normaId: "oab", sectionId: "titulo-iii", artigos: "Título III" },
      { label: "OAB > Regulamento Geral", normaId: "regulamento-oab", sectionId: "titulo-i", artigos: "Regulamento" },
      { label: "OAB > Código de Ética e Disciplina", normaId: "codigo-etica-oab", sectionId: "titulo-i", artigos: "CED" },
      { label: "PGM > Competência, Estrutura e Organização", normaId: "pgm-canoas", sectionId: "livro-i", artigos: "Livro I" },
      { label: "PGM > Das Carreiras", normaId: "pgm-canoas", sectionId: "livro-ii", artigos: "Livro II" },
      { label: "PGM > Disposições Finais e Transitórias", normaId: "pgm-canoas", sectionId: "livro-iii", artigos: "Livro III" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EC Badge (rich mode)
// ─────────────────────────────────────────────────────────────────────────────

const ECBadge = memo(function ECBadge({ ecRef }: { ecRef: ECRef }) {
  const m = ecRef.description.match(/nº\s*(\d+)/);
  const num = m?.[1];
  let label = num ? `EC ${num}` : "EC";

  const d = ecRef.description.toLowerCase();
  if (d.includes("redação")) label = num ? `↺EC ${num}` : "↺EC";
  else if (d.includes("incluí")) label = num ? `+EC ${num}` : "+EC";
  else if (d.includes("vigência")) label = "Vig.";
  else if (d.includes("vide")) label = "Vide";
  else if (d.includes("regulamento")) label = "Reg.";

  return (
    <span
      title={ecRef.description}
      className="ml-1 cursor-help inline-flex items-center text-[9px] font-mono font-medium
        text-sky-500/70 bg-sky-50 dark:bg-sky-950/20
        border border-sky-200/60 dark:border-sky-800/30
        px-1.5 py-px rounded-sm align-middle select-none leading-none"
    >
      {label}
    </span>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Highlighted text
// ─────────────────────────────────────────────────────────────────────────────

function HL({ text, q }: { text: string; q: string }) {
  if (!q || q.length < 2) return <>{text}</>;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${esc})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/60 text-inherit rounded-sm px-px not-italic">
            {p}
          </mark>
        ) : <span key={i}>{p}</span>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Block renderer
// ─────────────────────────────────────────────────────────────────────────────

const BlockEl = memo(function BlockEl({
  block, q, mode,
}: {
  block: DocBlock; q: string; mode: ViewMode;
}) {
  const ecBadges = mode === "rich" && block.ecRefs.length > 0 ? (
    <span className="inline-flex flex-wrap gap-px">
      {block.ecRefs.map((r, i) => <ECBadge key={i} ecRef={r} />)}
    </span>
  ) : null;

  const txt = <HL text={block.text} q={q} />;

  switch (block.type) {
    case "parte":
      return (
        <div id={block.id} className="mt-20 mb-2 scroll-mt-16 text-center">
          <span className="text-[28px] font-bold uppercase text-foreground" style={{ fontFamily: "Georgia, serif" }}>
            {txt}
          </span>
        </div>
      );

    case "preambulo-header":
      return (
        <div id={block.id} className="mt-6 mb-5 scroll-mt-16">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-muted-foreground/60">
            {txt}
          </span>
        </div>
      );

    case "livro":
      return (
        <div id={block.id} className="mt-16 mb-0.5 scroll-mt-16">
          <span className="text-[10.5px] font-bold tracking-[0.3em] uppercase text-muted-foreground/40">
            {txt}
          </span>
        </div>
      );

    case "livro-sub":
      return (
        <div className="mb-10">
          <span className="text-[24px] font-semibold leading-tight text-foreground">
            {txt}
          </span>
        </div>
      );

    case "titulo":
      return (
        <div id={block.id} className="mt-16 mb-0.5 scroll-mt-16">
          <span className="text-[9.5px] font-bold tracking-[0.35em] uppercase text-muted-foreground/40">
            {txt}
          </span>
        </div>
      );

    case "titulo-sub":
      return (
        <div className="mb-8">
          <span className="text-[21px] font-semibold leading-tight text-foreground">
            {txt}
          </span>
        </div>
      );

    case "capitulo":
      return (
        <div id={block.id} className="mt-12 mb-0.5 scroll-mt-16">
          <span className="text-[9.5px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/40">
            {txt}
          </span>
        </div>
      );

    case "cap-sub":
      return (
        <div className="mb-5">
          <span className="text-[11px] tracking-wider uppercase text-muted-foreground/50">
            {txt}
          </span>
        </div>
      );

    case "secao":
      return (
        <div id={block.id} className="mt-9 mb-3 scroll-mt-16 border-b border-dashed border-border pb-2">
          <span className="text-[13px] font-medium text-muted-foreground italic">
            {txt}
          </span>
        </div>
      );

    case "subsecao":
      return (
        <div className="mt-5 mb-2">
          <span className="text-[12px] font-medium text-muted-foreground/70 italic">
            {txt}{ecBadges}
          </span>
        </div>
      );

    case "adct-header":
      return (
        <div id={block.id} className="mt-20 mb-5 pt-8 border-t-2 border-amber-200 dark:border-amber-800/50 scroll-mt-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500 dark:text-amber-400">
            {txt}
          </span>
        </div>
      );

    case "artigo":
      return (
        <div id={block.id} className="mt-6 mb-1 scroll-mt-16">
          <p className="text-[15.5px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    case "inciso":
      return (
        <div id={block.id} className="ml-7 my-0.5">
          <p className="text-[15px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    case "paragrafo-unico":
      return (
        <div id={block.id} className="ml-7 mt-2 mb-0.5">
          <p className="text-[15px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    case "paragrafo":
      return (
        <div id={block.id} className="ml-7 my-0.5">
          <p className="text-[15px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    case "alinea":
      return (
        <div id={block.id} className="ml-14 my-0.5">
          <p className="text-[15px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    case "text":
      return (
        <div id={block.id} className="my-1.5">
          <p className="text-[15px] leading-[1.85] text-blue-950 dark:text-blue-100 text-justify">
            {txt}{ecBadges}
          </p>
        </div>
      );

    default:
      return null;
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Legislacoes() {
  const [selectedNorma, setSelectedNorma] = useState<"intro" | "cf88" | "ctn" | "cpc" | "pgm-canoas" | "oab" | "regulamento-oab" | "codigo-etica-oab">("intro");
  const [doc, setDoc] = useState<ParseResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("clean");
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("estrutura");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState("");
  const [openTocNodes, setOpenTocNodes] = useState<Set<string>>(new Set());
  const [openDiscs, setOpenDiscs] = useState<Set<string>>(new Set());
  
  // Pending navigation id (if user clicked a link for a different norm)
  const [pendingNavId, setPendingNavId] = useState<string | null>(null);

  const readerRef = useRef<HTMLDivElement>(null);

  // ── Load & parse document ───────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout>;
    
    if (selectedNorma === "intro") {
      setDoc(null);
      setLoading(false);
      setLoadError(null);
      return;
    }

    setLoading(true);
    setLoadError(null);

    let fileName = "";
    if (selectedNorma === "cf88") fileName = "cf1988.md";
    else if (selectedNorma === "ctn") fileName = "ctn.md";
    else if (selectedNorma === "cpc") fileName = "cpc.md";
    else if (selectedNorma === "pgm-canoas") fileName = "lei-pgm-canoas.md";
    else if (selectedNorma === "oab") fileName = "estatuto-oab.md";
    else if (selectedNorma === "regulamento-oab") fileName = "regulamento-geral-oab.md";
    else if (selectedNorma === "codigo-etica-oab") fileName = "codigo-etica-oab.md";

    fetch(`/documentos/${fileName}`)
      .then(r => {
        if (!r.ok) throw new Error(`Arquivo não encontrado (HTTP ${r.status})`);
        return r.text();
      })
      .then(text => {
        if (cancelled) return;
        timerId = setTimeout(() => {
          if (cancelled) return;
          const result = parseDocument(text);
          setDoc(result);
          setLoading(false);
          
          if (pendingNavId) {
            // Scroll to pending nav item
            setTimeout(() => {
              document.getElementById(pendingNavId)?.scrollIntoView({ behavior: "smooth", block: "start" });
              setPendingNavId(null);
            }, 50);
          } else if (result.toc.length > 0) {
            setActiveTocId(result.toc[0].id);
          }
        }, 10);
      })
      .catch(err => {
        if (!cancelled) { setLoadError(err.message); setLoading(false); }
      });

    return () => { cancelled = true; clearTimeout(timerId); };
  }, [selectedNorma, pendingNavId]);

  // ── Debounce search ─────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // ── Search results ──────────────────────────────────────────────────────
  const searchResults = useMemo(() => {
    if (!doc || debouncedQ.length < 2) return [];
    const q = debouncedQ.toLowerCase();
    return doc.blocks.filter(b => b.text.toLowerCase().includes(q));
  }, [doc, debouncedQ]);

  // Auto-scroll to first search result
  useEffect(() => {
    if (searchResults.length > 0) {
      document.getElementById(searchResults[0].id)?.scrollIntoView({
        behavior: "smooth", block: "center",
      });
    }
  }, [searchResults]);

  // ── TOC scroll tracking ─────────────────────────────────────────────────
  useEffect(() => {
    if (!doc || !readerRef.current) return;
    const root = readerRef.current;
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveTocId(e.target.id);
        }
      },
      { root, rootMargin: "-10% 0px -80% 0px" }
    );
    doc.toc.forEach(entry => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [doc]);

  // ── Navigate to section ─────────────────────────────────────────────────
  const navigateTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  }, []);

  const navigateToDisc = useCallback((normaId: "cf88" | "ctn" | "cpc" | "pgm-canoas" | "oab" | "regulamento-oab" | "codigo-etica-oab", sectionId: string) => {
    if (selectedNorma !== normaId) {
      setPendingNavId(sectionId);
      setSelectedNorma(normaId);
      setSidebarOpen(false);
    } else {
      navigateTo(sectionId);
    }
  }, [selectedNorma, navigateTo]);

  // ── Toggle helpers ──────────────────────────────────────────────────────
  const toggleToc = useCallback((id: string) => {
    setOpenTocNodes(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);
  const toggleDisc = useCallback((id: string) => {
    setOpenDiscs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  // ── TOC tree (level-1 with children) ───────────────────────────────────
  const tocTree = useMemo(() => {
    if (!doc) return [];
    type Node = { entry: TOCEntry; children: TOCEntry[] };
    const tree: Node[] = [];
    for (const e of doc.toc) {
      if (e.level === 1) tree.push({ entry: e, children: [] });
      else if (tree.length > 0) tree[tree.length - 1].children.push(e);
    }
    return tree;
  }, [doc]);

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left Sidebar ──────────────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-30 lg:z-auto",
          "flex flex-col w-[260px] flex-shrink-0 border-r border-border bg-card",
          "transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Início
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-foreground leading-tight">Vade Mecum</p>
              <p className="text-[10px] text-muted-foreground">PGM Canoas · 2026</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-2.5 pb-2 border-b border-border flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar no texto..."
              className="pl-8 h-8 text-xs bg-background"
            />
          </div>
          {debouncedQ.length >= 2 && (
            <p className="mt-1.5 text-[10px] text-muted-foreground px-0.5">
              {searchResults.length > 0
                ? `${searchResults.length} resultado${searchResults.length !== 1 ? "s" : ""}`
                : "Nenhum resultado"}
            </p>
          )}
        </div>

        {/* Norma selector */}
        <div className="px-3 py-2 border-b border-border flex-shrink-0 bg-muted/20">
          <select 
            value={selectedNorma}
            onChange={(e) => setSelectedNorma(e.target.value as any)}
            className="w-full text-[11px] font-medium bg-background border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground cursor-pointer"
          >
            <option value="intro">Selecione uma norma...</option>
            <option value="cf88">Constituição Federal (CF/88)</option>
            <option value="ctn">Código Tributário Nacional (CTN)</option>
            <option value="cpc">Código de Processo Civil (CPC)</option>
            <option value="pgm-canoas">Lei PGM Canoas (nº 6.817/2025)</option>
            <option value="oab">Estatuto da OAB</option>
            <option value="regulamento-oab">Regulamento Geral da OAB</option>
            <option value="codigo-etica-oab">Código de Ética da OAB</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-border flex-shrink-0">
          {(["estrutura", "disciplinas"] as SidebarTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setSidebarTab(tab)}
              className={cn(
                "py-2 text-[11px] font-medium transition-colors",
                sidebarTab === tab
                  ? "text-foreground border-b-2 border-foreground -mb-px"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {tab === "estrutura" ? "Estrutura" : "Disciplinas"}
            </button>
          ))}
        </div>

        {/* Nav content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : sidebarTab === "estrutura" ? (
            <nav className="py-2 px-2 space-y-px">
              {tocTree.length > 0 ? tocTree.map(({ entry, children }) => {
                const isOpen = openTocNodes.has(entry.id);
                const isActiveRoot = activeTocId === entry.id;
                const isActiveChild = children.some(c => c.id === activeTocId);
                const isActive = isActiveRoot || isActiveChild;

                return (
                  <div key={entry.id}>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => navigateTo(entry.id)}
                        className={cn(
                          "flex-1 text-left px-2 py-1.5 rounded text-[11px] font-medium transition-colors",
                          isActive
                            ? "text-foreground bg-primary/[0.08]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        )}
                      >
                        <span className="block truncate">{entry.label}</span>
                        {entry.subtitle && (
                          <span className="block text-[9.5px] font-normal text-muted-foreground/50 truncate">
                            {entry.subtitle.length > 34 ? entry.subtitle.slice(0, 34) + "…" : entry.subtitle}
                          </span>
                        )}
                      </button>
                      {children.length > 0 && (
                        <button
                          onClick={() => toggleToc(entry.id)}
                          className="p-1 rounded hover:bg-muted/50 text-muted-foreground shrink-0"
                        >
                          <ChevronRight className={cn("w-3 h-3 transition-transform", isOpen && "rotate-90")} />
                        </button>
                      )}
                    </div>

                    {isOpen && children.length > 0 && (
                      <div className="ml-3 border-l border-border pl-2 mt-px mb-1 space-y-px">
                        {children.map(child => (
                          <button
                            key={child.id}
                            onClick={() => navigateTo(child.id)}
                            className={cn(
                              "w-full text-left px-2 py-1 rounded text-[10.5px] transition-colors",
                              activeTocId === child.id
                                ? "text-foreground font-medium bg-primary/[0.08]"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                            )}
                          >
                            <span className="block truncate">{child.label}</span>
                            {child.subtitle && (
                              <span className="block text-[9px] opacity-40 truncate">
                                {child.subtitle.length > 30 ? child.subtitle.slice(0, 30) + "…" : child.subtitle}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }) : (
                <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                  Nenhuma norma selecionada.
                </div>
              )}
            </nav>
          ) : (
            <nav className="py-2 px-2 space-y-px">
              {DISCIPLINAS.map(disc => {
                const Icon = disc.icon;
                const isOpen = openDiscs.has(disc.id);
                return (
                  <div key={disc.id}>
                    <button
                      onClick={() => toggleDisc(disc.id)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium
                        text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", disc.color)} />
                      <span className="flex-1 text-left truncate">{disc.label}</span>
                      <ChevronRight className={cn("w-3 h-3 shrink-0 transition-transform", isOpen && "rotate-90")} />
                    </button>
                    {isOpen && (
                      <div className="ml-5 border-l border-border pl-2 mt-px mb-1 space-y-px">
                        {disc.items.map((item, idx) => (
                          <button
                            key={`${item.normaId}-${item.sectionId}-${idx}`}
                            onClick={() => navigateToDisc(item.normaId, item.sectionId)}
                            className="w-full text-left px-2 py-1 rounded text-[10.5px]
                              text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            <span className="block truncate">{item.label}</span>
                            {item.artigos && (
                              <span className="text-[9.5px] opacity-40">{item.artigos}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>
      </aside>

      {/* ── Center + Right ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 h-11 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3">
          <button
            className="lg:hidden p-1.5 -ml-1 rounded hover:bg-muted text-muted-foreground transition-colors"
            onClick={() => setSidebarOpen(s => !s)}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate leading-tight">
                {selectedNorma === "cf88" ? "Constituição da República Federativa do Brasil" : 
                 selectedNorma === "ctn" ? "Código Tributário Nacional" : 
                 selectedNorma === "cpc" ? "Código de Processo Civil" :
                 selectedNorma === "pgm-canoas" ? "Lei da PGM Canoas" :
                 selectedNorma === "oab" ? "Estatuto da Advocacia e da OAB" :
                 selectedNorma === "regulamento-oab" ? "Regulamento Geral do EAOAB" :
                 selectedNorma === "codigo-etica-oab" ? "Código de Ética e Disciplina da OAB" :
                 "Vade Mecum Digital"}
              </p>
              <p className="text-[10px] text-muted-foreground hidden md:block leading-tight">
                {selectedNorma === "cf88" ? "1988 · Compilada com todas as Emendas Constitucionais" : 
                 selectedNorma === "ctn" ? "Lei nº 5.172/1966" : 
                 selectedNorma === "cpc" ? "Lei nº 13.105/2015" :
                 selectedNorma === "pgm-canoas" ? "Lei Municipal nº 6.817/2025" :
                 selectedNorma === "oab" ? "Lei nº 8.906/1994" :
                 selectedNorma === "regulamento-oab" ? "Regulamento Geral do Estatuto da Advocacia e da OAB" :
                 selectedNorma === "codigo-etica-oab" ? "Resolução nº 02/2015" :
                 "PGM Canoas"}
              </p>
            </div>
          </div>

          {/* View mode toggle */}
          {selectedNorma !== "intro" && (
            <div
              className="flex items-center bg-muted rounded-md p-0.5 gap-0.5 flex-shrink-0"
              title="Alternar entre texto limpo e texto com indicadores de Emendas Constitucionais"
            >
              <button
                onClick={() => setViewMode("clean")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all",
                  viewMode === "clean"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <EyeOff className="w-3 h-3 shrink-0" />
                <span className="hidden sm:inline">Limpo</span>
              </button>
              <button
                onClick={() => setViewMode("rich")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all",
                  viewMode === "rich"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Eye className="w-3 h-3 shrink-0" />
                <span className="hidden sm:inline">Com EC</span>
              </button>
            </div>
          )}
        </header>

        <div className="flex-1 flex overflow-hidden">

          {/* ── Reader ────────────────────────────────────────────── */}
          <main ref={readerRef} className="flex-1 overflow-y-auto scroll-smooth">
            {selectedNorma === "intro" ? (
              <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">Vade Mecum Digital</h1>
                <p className="text-muted-foreground text-[15px] mb-10 max-w-lg">
                  Bem-vindo ao seu ambiente de estudos otimizado. Navegue pela estrutura das normas ou pelos tópicos do edital na barra lateral.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                  <button
                    onClick={() => setSelectedNorma("cf88")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Constituição Federal</h3>
                    <p className="text-xs text-muted-foreground">CF/88 completa e atualizada.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("ctn")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                      <PiggyBank className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Código Tributário</h3>
                    <p className="text-xs text-muted-foreground">Lei nº 5.172/1966 atualizada.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("cpc")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Processo Civil</h3>
                    <p className="text-xs text-muted-foreground">Lei nº 13.105/2015 atualizada.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("pgm-canoas")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Lei da PGM</h3>
                    <p className="text-xs text-muted-foreground">Lei Municipal nº 6.817/2025.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("oab")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                      <ScrollText className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Estatuto da OAB</h3>
                    <p className="text-xs text-muted-foreground">Lei nº 8.906/1994 atualizada.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("regulamento-oab")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <ScrollText className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Regulamento OAB</h3>
                    <p className="text-xs text-muted-foreground">Regulamento Geral do EAOAB.</p>
                  </button>
                  <button
                    onClick={() => setSelectedNorma("codigo-etica-oab")}
                    className="flex flex-col items-start p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <Heart className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">Código Ética OAB</h3>
                    <p className="text-xs text-muted-foreground">Código de Ética e Disciplina.</p>
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p className="text-sm">Carregando norma...</p>
              </div>
            ) : loadError ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
                <p className="text-sm font-medium text-destructive">Erro ao carregar o documento</p>
                <p className="text-xs text-muted-foreground">{loadError}</p>
              </div>
            ) : doc ? (
              <div
                className="mx-auto px-6 sm:px-10 lg:px-16 py-10 pb-40"
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
                  maxWidth: "98ch",
                }}
              >
                {/* Document header */}
                <div className="mb-10 pb-8 border-b border-border">
                  <span className="text-[9.5px] font-bold tracking-[0.3em] uppercase text-muted-foreground/40 block mb-3">
                    {selectedNorma === "cf88" ? "Vade Mecum · Direito Constitucional" :
                     selectedNorma === "ctn" ? "Vade Mecum · Direito Tributário" :
                     selectedNorma === "cpc" ? "Vade Mecum · Direito Processual Civil" :
                     (selectedNorma === "oab" || selectedNorma === "regulamento-oab" || selectedNorma === "codigo-etica-oab") ? "Vade Mecum · Legislação Profissional" :
                     "Vade Mecum · Legislação Municipal"}
                  </span>
                  <h1
                    className="text-[22px] font-semibold text-foreground leading-snug mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {selectedNorma === "cf88" ? (
                      <>Constituição da República<br />Federativa do Brasil</>
                    ) : selectedNorma === "ctn" ? (
                      <>Código Tributário<br />Nacional</>
                    ) : selectedNorma === "cpc" ? (
                      <>Código de Processo<br />Civil</>
                    ) : selectedNorma === "oab" ? (
                      <>Estatuto da Advocacia<br />e da OAB</>
                    ) : selectedNorma === "regulamento-oab" ? (
                      <>Regulamento Geral<br />da OAB</>
                    ) : selectedNorma === "codigo-etica-oab" ? (
                      <>Código de Ética e<br />Disciplina da OAB</>
                    ) : (
                      <>Lei de Regência da PGM<br />Canoas</>
                    )}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedNorma === "cf88"
                      ? "5 de outubro de 1988 · Texto compilado · Planalto.gov.br"
                      : selectedNorma === "ctn" 
                      ? "Lei nº 5.172, de 25 de outubro de 1966 · Planalto.gov.br"
                      : selectedNorma === "cpc"
                      ? "Lei nº 13.105, de 16 de março de 2015 · Planalto.gov.br"
                      : selectedNorma === "oab"
                      ? "Lei nº 8.906, de 4 de julho de 1994 · Planalto.gov.br"
                      : selectedNorma === "regulamento-oab"
                      ? "Regulamento Geral do Estatuto da Advocacia e da OAB"
                      : selectedNorma === "codigo-etica-oab"
                      ? "Resolução n. 02/2015 do Conselho Federal da OAB"
                      : "Lei Municipal nº 6.817, de 16 de junho de 2025 · Canoas/RS"}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 text-[10px] text-muted-foreground/60">
                    <span>{doc.blocks.length} elementos</span>
                    <span>·</span>
                    {selectedNorma === "ctn" && (
                      <>
                        <span>{doc.toc.filter(t => t.type === "livro").length} Livros</span>
                        <span>·</span>
                      </>
                    )}
                    <span>{doc.toc.filter(t => t.type === "titulo").length} Títulos</span>
                    <span>·</span>
                    <span>{doc.blocks.filter(b => b.type === "artigo").length} Artigos</span>
                    {viewMode === "rich" && (
                      <>
                        <span>·</span>
                        <span className="text-sky-500">Indicadores ativos</span>
                      </>
                    )}
                  </div>

                  {/* Search notice */}
                  {debouncedQ.length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 px-3.5 py-2.5 bg-yellow-50 dark:bg-yellow-950/20
                        border border-yellow-200/80 dark:border-yellow-700/40 rounded-md"
                    >
                      <p className="text-xs text-yellow-800 dark:text-yellow-300">
                        <span className="font-semibold">{searchResults.length}</span>{" "}
                        resultado{searchResults.length !== 1 ? "s" : ""} para{" "}
                        <span className="font-mono">&ldquo;{debouncedQ}&rdquo;</span>
                        {searchResults.length > 0 && " — primeiro resultado destacado"}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* All blocks */}
                {doc.blocks.map(block => (
                  <BlockEl key={block.id} block={block} q={debouncedQ} mode={viewMode} />
                ))}
              </div>
            ) : null}
          </main>

          {/* ── TOC Panel (right) ──────────────────────────────────── */}
          {doc && (
            <aside className="hidden xl:flex flex-col w-52 flex-shrink-0 border-l border-border overflow-hidden">
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50">
                  Índice
                </p>
              </div>
              <div className="flex-1 overflow-y-auto py-2 px-2 space-y-px">
                {tocTree.map(({ entry, children }) => {
                  const isActiveRoot = activeTocId === entry.id;
                  const isActiveChild = children.some(c => c.id === activeTocId);
                  const isActive = isActiveRoot || isActiveChild;

                  return (
                    <div key={entry.id}>
                      <button
                        onClick={() => navigateTo(entry.id)}
                        className={cn(
                          "w-full text-left px-1.5 py-1 rounded text-[10.5px] leading-snug transition-colors",
                          isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {entry.label}
                        {entry.subtitle && (
                          <span className="block text-[9px] opacity-40 truncate mt-0.5">
                            {entry.subtitle.length > 30 ? entry.subtitle.slice(0, 30) + "…" : entry.subtitle}
                          </span>
                        )}
                      </button>

                      {isActive && children.length > 0 && (
                        <div className="ml-2.5 border-l border-border/60 pl-2 mt-px space-y-px">
                          {children.slice(0, 14).map(child => (
                            <button
                              key={child.id}
                              onClick={() => navigateTo(child.id)}
                              className={cn(
                                "w-full text-left px-1.5 py-0.5 rounded text-[10px] leading-snug transition-colors",
                                activeTocId === child.id
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground/70 hover:text-foreground",
                              )}
                            >
                              <span className="block truncate">{child.label}</span>
                              {child.subtitle && (
                                <span className="block text-[8.5px] opacity-40 truncate">
                                  {child.subtitle.length > 25 ? child.subtitle.slice(0, 25) + "…" : child.subtitle}
                                </span>
                              )}
                            </button>
                          ))}
                          {children.length > 14 && (
                            <p className="text-[9px] text-muted-foreground/30 px-1.5 py-0.5">
                              +{children.length - 14} seções…
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
