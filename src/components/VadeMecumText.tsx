import React, { useMemo } from "react";

interface VadeMecumTextProps {
  content: string;
}

export function VadeMecumText({ content }: VadeMecumTextProps) {
  const formattedContent = useMemo(() => {
    if (!content) return [];

    const lines = content.split("\n");
    return lines.map((line, index) => {
      let trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-2" />; // Spacing

      // Check for Titles, Chapters, Sections
      const isTitle = /^TÍTULO\s+[IVXLCDM]+/i.test(trimmed);
      const isChapter = /^CAPÍTULO\s+[IVXLCDM]+/i.test(trimmed);
      const isSection = /^Seção\s+[IVXLCDM]+/i.test(trimmed);
      const isArticle = /^Art\.\s*\d+/i.test(trimmed);
      
      // Make "Art. XX." bold inside text as well
      const renderWithBoldArticles = (text: string) => {
        const parts = text.split(/(Art\.\s*\d+[a-z-]*\.?|Parágrafo único\.?|§\s*\d+º?)/i);
        return parts.map((part, i) => {
          if (/^(Art\.\s*\d+|Parágrafo único|§\s*\d+)/i.test(part)) {
            return <strong key={i} className="font-semibold text-foreground">{part}</strong>;
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        });
      };

      if (isTitle) {
        return <h2 key={index} className="text-xl font-bold mt-8 mb-4 text-center uppercase text-primary">{trimmed}</h2>;
      }
      if (isChapter) {
        return <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-center uppercase text-foreground">{trimmed}</h3>;
      }
      if (isSection) {
        return <h4 key={index} className="text-base font-semibold mt-5 mb-2 text-center text-foreground">{trimmed}</h4>;
      }
      
      return (
        <p key={index} className={`mb-2 leading-relaxed text-muted-foreground ${isArticle ? 'mt-4' : 'ml-4'}`}>
          {renderWithBoldArticles(line)}
        </p>
      );
    });
  }, [content]);

  return (
    <div className="font-serif text-[15px] sm:text-base max-w-[800px] mx-auto bg-card rounded-lg border border-border p-6 shadow-sm overflow-x-hidden text-justify">
      {formattedContent}
    </div>
  );
}
