// src/lib/cfParser.ts
// Parser for the Constituição Federal 1988 Markdown document

export type BlockType =
  | "parte"
  | "preambulo-header"
  | "livro"
  | "livro-sub"
  | "titulo"
  | "titulo-sub"
  | "capitulo"
  | "cap-sub"
  | "secao"
  | "subsecao"
  | "adct-header"
  | "artigo"
  | "inciso"
  | "paragrafo-unico"
  | "paragrafo"
  | "alinea"
  | "text";

export interface ECRef {
  description: string;
}

export interface DocBlock {
  id: string;
  type: BlockType;
  text: string;
  ecRefs: ECRef[];
  artNum?: number;
}

export interface TOCEntry {
  id: string;
  type: "parte" | "livro" | "titulo" | "capitulo" | "secao" | "preambulo" | "adct";
  label: string;
  subtitle?: string;
  level: 1 | 2 | 3 | 4;
}

export interface ParseResult {
  blocks: DocBlock[];
  toc: TOCEntry[];
}

// Matches [(description)](url) — EC references embedded in text
const EC_PATTERN = /\s*\[(\([^\]]+\))\]\(https?:\/\/[^)]+\)/g;

function extractECRefs(rawText: string): { clean: string; refs: ECRef[] } {
  const refs: ECRef[] = [];
  const clean = rawText
    .replace(EC_PATTERN, (_, bracket: string) => {
      const desc = bracket
        .replace(/^\(|\)$/g, "") // remove outer parens
        .replace(/\\\)/g, "")   // remove markdown-escaped parens
        .trim();
      if (desc) refs.push({ description: desc });
      return "";
    })
    .trim();
  return { clean, refs };
}

// Returns index of next non-empty line after `from`
function nextNonEmpty(lines: string[], from: number): number {
  let j = from;
  while (j < lines.length && !lines[j].trim()) j++;
  return j;
}

export function parseDocument(rawMd: string): ParseResult {
  const lines = rawMd.split("\n");
  const blocks: DocBlock[] = [];
  const toc: TOCEntry[] = [];

  let counter = 0;
  let currentParte = "";
  let currentLivro = "";
  let currentTitulo = "";
  let inAdct = false;
  let inSignature = false;

  function uid(prefix: string) {
    return `${prefix}-${++counter}`;
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();

    if (!t) continue;
    // Skip table rows and image data
    if (t.startsWith("|") || t.startsWith("[image")) continue;
    // Detect and skip signature block
    if (/^Brasília,\s*\d+\s*de\s/i.test(t)) { inSignature = true; }
    if (inSignature) continue;

    const { clean, refs } = extractECRefs(t);

    // ── PREÂMBULO ─────────────────────────────────────────────────
    if (/^\*\*PREÂMBULO\*\*$/i.test(t)) {
      const sid = "preambulo";
      blocks.push({ id: sid, type: "preambulo-header", text: "PREÂMBULO", ecRefs: [] });
      toc.push({ id: sid, type: "preambulo", label: "PREÂMBULO", level: 1 });
      currentTitulo = sid;
      continue;
    }

    // ── PARTE ─────────────────────────────────────────────────────
    const mParte = t.match(/^(?:\*\*)?PARTE\s+(GERAL|ESPECIAL)(?:\*\*)?$/i);
    if (mParte) {
      const num = mParte[1].toUpperCase();
      const sid = `parte-${num.toLowerCase()}`;
      currentParte = sid;
      currentLivro = ""; // reset livro
      currentTitulo = ""; // reset titulo
      blocks.push({ id: sid, type: "parte", text: `PARTE ${num}`, ecRefs: [] });
      toc.push({ id: sid, type: "parte", label: `PARTE ${num}`, level: 1 });
      continue;
    }

    // ── LIVRO ─────────────────────────────────────────────────────
    const mLivro = t.match(/^(?:\*\*)?LIVRO\s+([A-Z]+|PRIMEIRO|SEGUNDO|TERCEIRO|QUARTO|QUINTO|SEXTO|SÉTIMO|OITAVO|NONO|DÉCIMO)(?:\*\*)?$/i);
    if (mLivro) {
      const num = mLivro[1].toUpperCase();
      const sid = currentParte ? `${currentParte}-livro-${num.toLowerCase()}` : `livro-${num.toLowerCase()}`;
      currentLivro = sid;
      currentTitulo = sid; // reset current title
      let subtitle = "";
      const j = nextNonEmpty(lines, i + 1);
      if (j < lines.length) {
        const nx = lines[j].trim();
        if (nx && !/^LIVRO|^TÍTULO/i.test(nx)) {
          subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim(); 
          i = j;
        }
      }
      blocks.push({ id: sid, type: "livro", text: `LIVRO ${num}`, ecRefs: [] });
      if (subtitle) blocks.push({ id: `${sid}-sub`, type: "livro-sub", text: subtitle, ecRefs: [] });
      toc.push({ id: sid, type: "livro", label: `LIVRO ${num}`, subtitle, level: currentParte ? 2 : 1 });
      continue;
    }

    // ── TÍTULO ────────────────────────────────────────────────────
    const mTitulo = t.match(/^(?:\*\*)?TÍTULO\s+([IVXLCDM]+|ÚNICO)(?:\*\*)?$/i);
    if (mTitulo) {
      const num = mTitulo[1].toUpperCase();
      let sid = `titulo-${num.toLowerCase()}`;
      if (currentLivro) sid = `${currentLivro}-${sid}`;
      else if (currentParte) sid = `${currentParte}-${sid}`;
      
      currentTitulo = sid;
      let subtitle = "";
      const j = nextNonEmpty(lines, i + 1);
      if (j < lines.length) {
        const nx = lines[j].trim();
        if (nx && !/^TÍTULO|^CAPÍTULO/i.test(nx)) {
          subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim();
          i = j;
        }
      }
      blocks.push({ id: sid, type: "titulo", text: `TÍTULO ${num}`, ecRefs: [] });
      if (subtitle) blocks.push({ id: `${sid}-sub`, type: "titulo-sub", text: subtitle, ecRefs: [] });
      
      let level: any = 1;
      if (currentParte && currentLivro) level = 3;
      else if (currentParte || currentLivro) level = 2;
      
      toc.push({ id: sid, type: "titulo", label: `TÍTULO ${num}`, subtitle, level });
      continue;
    }

    // ── CAPÍTULO ──────────────────────────────────────────────────
    const mCap = t.match(/^(?:\*\*)?CAPÍTULO\s+([IVXLCDM]+)(?:\*\*)?$/i);
    if (mCap) {
      const num = mCap[1].toUpperCase();
      const sid = currentTitulo ? `${currentTitulo}-cap-${num.toLowerCase()}` : `cap-${num.toLowerCase()}`;
      let subtitle = "";
      const j = nextNonEmpty(lines, i + 1);
      if (j < lines.length) {
        const nx = lines[j].trim();
        if (nx && nx === nx.toUpperCase() &&
            !/^(CAPÍTULO|Seção|Art\.|Subseção)/i.test(nx) &&
            !nx.startsWith("|") && nx.length < 150) {
          subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim(); 
          i = j;
        } else if (nx && !/^(CAPÍTULO|Seção|Art\.|Subseção)/i.test(nx) && nx.length < 150) {
          // CTN has title case for chapter subtitles
          subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim(); 
          i = j;
        }
      }
      blocks.push({ id: sid, type: "capitulo", text: `CAPÍTULO ${num}`, ecRefs: [] });
      if (subtitle) blocks.push({ id: `${sid}-sub`, type: "cap-sub", text: subtitle, ecRefs: [] });
      toc.push({ id: sid, type: "capitulo", label: `CAPÍTULO ${num}`, subtitle, level: currentLivro ? 3 : 2 });
      continue;
    }

    // ── Seção ─────────────────────────────────────────────────────
    const mSec = t.match(/^(?:\*\*)?Seção\s+([IVXLCDM]+)(?:\*\*)?\s*(?:[–-]\s*(.+))?$/i);
    if (mSec) {
      const num = mSec[1].toUpperCase();
      const sid = currentTitulo ? `${currentTitulo}-sec-${num.toLowerCase()}` : `sec-${num.toLowerCase()}`;
      let subtitle = mSec[2] ? mSec[2].replace(/^\*\*|\*\*$/g, "").trim() : "";
      if (!subtitle) {
        const j = nextNonEmpty(lines, i + 1);
        if (j < lines.length) {
          const nx = lines[j].trim();
          if (nx && nx === nx.toUpperCase() &&
              !/^(CAPÍTULO|Seção|Art\.)/i.test(nx) && nx.length < 120) {
            subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim(); 
            i = j;
          } else if (nx && !/^(CAPÍTULO|Seção|Art\.)/i.test(nx) && nx.length < 120) {
            subtitle = nx.replace(/^\*\*|\*\*$/g, "").trim(); 
            i = j;
          }
        }
      }
      const display = subtitle ? `Seção ${num} — ${subtitle}` : `Seção ${num}`;
      blocks.push({ id: sid, type: "secao", text: display, ecRefs: [] });
      toc.push({ id: sid, type: "secao", label: `Seção ${num}`, subtitle, level: currentLivro ? 4 : 3 });
      continue;
    }

    // ── Subseção ──────────────────────────────────────────────────
    if (/^(?:\*\*)?Subseção\s+/i.test(t)) {
      blocks.push({ id: uid("subsec"), type: "subsecao", text: clean.replace(/^\*\*|\*\*$/g, ""), ecRefs: refs });
      continue;
    }

    // ── ADCT ──────────────────────────────────────────────────────
    if (/^Ato das Disposições Constitucionais Transitórias$/i.test(t) ||
        /^\*\*Ato das Disposições/i.test(t) ||
        /^ATO DAS DISPOSIÇÕES CONSTITUCIONAIS TRANSITÓRIAS$/i.test(t)) {
      const sid = "adct";
      currentTitulo = sid;
      inAdct = true;
      blocks.push({ id: sid, type: "adct-header",
        text: "ADCT — Ato das Disposições Constitucionais Transitórias", ecRefs: [] });
      toc.push({ id: sid, type: "adct", label: "ADCT",
        subtitle: "Ato das Disposições Constitucionais Transitórias", level: 1 });
      continue;
    }

    // ── Artigo ────────────────────────────────────────────────────
    const mArt = raw.match(/^\s*Art\.\s*(\d+[a-záàâã-]*)[\s°º.\\–-]/i);
    if (mArt) {
      const numStr = mArt[1];
      const artNum = parseInt(numStr, 10);
      const prefix = inAdct ? "adct-art" : "art";
      const sid = `${prefix}-${numStr}`;
      blocks.push({ id: sid, type: "artigo", text: clean, ecRefs: refs,
        artNum: isNaN(artNum) ? 0 : artNum });
      continue;
    }

    // ── Parágrafo único ───────────────────────────────────────────
    if (/^Parágrafo único/i.test(t)) {
      blocks.push({ id: uid("par-u"), type: "paragrafo-unico", text: clean, ecRefs: refs });
      continue;
    }

    // ── Parágrafo § ───────────────────────────────────────────────
    if (/^§\s*\d+/.test(t)) {
      blocks.push({ id: uid("par"), type: "paragrafo", text: clean, ecRefs: refs });
      continue;
    }

    // ── Inciso (Roman numerals + \- or –) ─────────────────────────
    if (/^[IVXLCDM]+\s*(?:\\-|[-–])\s/.test(t)) {
      const cleanInc = clean.replace(/\\-/g, "–");
      blocks.push({ id: uid("inc"), type: "inciso", text: cleanInc, ecRefs: refs });
      continue;
    }

    // ── Alínea ────────────────────────────────────────────────────
    if (/^[a-záàâãéêíóôõúç]\)\s/i.test(t)) {
      blocks.push({ id: uid("alinea"), type: "alinea", text: clean, ecRefs: refs });
      continue;
    }

    // ── Plain text ────────────────────────────────────────────────
    if (clean) {
      blocks.push({ id: uid("txt"), type: "text", text: clean, ecRefs: refs });
    }
  }

  return { blocks, toc };
}
