import re

file_path = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\src\pages\Legislacoes.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update the union type
union_additions = ' | "lei-canoas-1943-1979" | "lei-canoas-1783-1977" | "lei-canoas-4818-2003" | "lei-canoas-5503-2010" | "decreto-canoas-701-2009" | "decreto-canoas-684-2003" | "lei-canoas-4328-1998" | "lei-canoas-4739-2003" | "lc-canoas-14-2025" | "lc-canoas-6-2016" | "decreto-canoas-88-2013" | "decreto-canoas-110-2024" | "decreto-canoas-549-2023" | "decreto-canoas-45-2024" | "decreto-canoas-60-2024" | "decreto-canoas-240-2025" | "decreto-canoas-59-2024" | "decreto-canoas-462-2016"'

# Find the union types (there are 3 places: interface DiscItem, useState, useCallback)
# In interface DiscItem:
text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"lei-13709")(?=\s*;)', r'\1' + union_additions, text)
# In useState:
text = re.sub(r'(useState<"intro" \| "cf88"[\s\S]*?"lei-13709")(?=>\("intro"\))', r'\1' + union_additions, text)
# In navigateToDisc useCallback:
text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"lei-13709")(?=, sectionId:)', r'\1' + union_additions, text)

# 2. Add the if/else if block
if_additions = """
    else if (selectedNorma === "lei-canoas-1943-1979") fileName = "lei-canoas-1943-1979.md";
    else if (selectedNorma === "lei-canoas-1783-1977") fileName = "lei-canoas-1783-1977.md";
    else if (selectedNorma === "lei-canoas-4818-2003") fileName = "lei-canoas-4818-2003.md";
    else if (selectedNorma === "lei-canoas-5503-2010") fileName = "lei-canoas-5503-2010.md";
    else if (selectedNorma === "decreto-canoas-701-2009") fileName = "decreto-canoas-701-2009.md";
    else if (selectedNorma === "decreto-canoas-684-2003") fileName = "decreto-canoas-684-2003.md";
    else if (selectedNorma === "lei-canoas-4328-1998") fileName = "lei-canoas-4328-1998.md";
    else if (selectedNorma === "lei-canoas-4739-2003") fileName = "lei-canoas-4739-2003.md";
    else if (selectedNorma === "lc-canoas-14-2025") fileName = "lc-canoas-14-2025.md";
    else if (selectedNorma === "lc-canoas-6-2016") fileName = "lc-canoas-6-2016.md";
    else if (selectedNorma === "decreto-canoas-88-2013") fileName = "decreto-canoas-88-2013.md";
    else if (selectedNorma === "decreto-canoas-110-2024") fileName = "decreto-canoas-110-2024.md";
    else if (selectedNorma === "decreto-canoas-549-2023") fileName = "decreto-canoas-549-2023.md";
    else if (selectedNorma === "decreto-canoas-45-2024") fileName = "decreto-canoas-45-2024.md";
    else if (selectedNorma === "decreto-canoas-60-2024") fileName = "decreto-canoas-60-2024.md";
    else if (selectedNorma === "decreto-canoas-240-2025") fileName = "decreto-canoas-240-2025.md";
    else if (selectedNorma === "decreto-canoas-59-2024") fileName = "decreto-canoas-59-2024.md";
    else if (selectedNorma === "decreto-canoas-462-2016") fileName = "decreto-canoas-462-2016.md";
"""
text = re.sub(r'(else if \(selectedNorma === "lei-13709"\) fileName = "lei-13709\.md";)', r'\1' + if_additions, text)

# 3. Add the municipal section to DISCIPLINAS
municipal_section = """
  {
    id: "municipal", label: "Legislação Municipal", icon: Landmark, color: "text-emerald-500",
    items: [
      { label: "CTM Canoas (Lei 1.943/79)", normaId: "lei-canoas-1943-1979", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "CTM Antigo (Lei 1.783/77)", normaId: "lei-canoas-1783-1977", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "ISSQN Canoas (Lei 4.818/03)", normaId: "lei-canoas-4818-2003", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "ITBI Canoas (Lei 5.503/10)", normaId: "lei-canoas-5503-2010", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Refis/Parcelamento (Dec. 701/09)", normaId: "decreto-canoas-701-2009", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Parcelamento Créditos (Dec. 684/03)", normaId: "decreto-canoas-684-2003", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Código Ambiental (Lei 4.328/98)", normaId: "lei-canoas-4328-1998", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "CANOASPREV (Lei 4.739/03)", normaId: "lei-canoas-4739-2003", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Reestruturação RPPS (LC 14/25)", normaId: "lc-canoas-14-2025", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Guarda Municipal (LC 6/16)", normaId: "lc-canoas-6-2016", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Procedimentos Administrativos (Dec. 88/13)", normaId: "decreto-canoas-88-2013", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Tratamento ME e EPP (Dec. 110/24)", normaId: "decreto-canoas-110-2024", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Fase Interna Licitações (Dec. 549/23)", normaId: "decreto-canoas-549-2023", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Sistema Registro Preços (Dec. 45/24)", normaId: "decreto-canoas-45-2024", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Diálogo Competitivo (Dec. 60/24)", normaId: "decreto-canoas-60-2024", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "Regulamento PGM (Dec. 240/25)", normaId: "decreto-canoas-240-2025", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "PAEP Punição (Dec. 59/24)", normaId: "decreto-canoas-59-2024", sectionId: "art-1", artigos: "Inteiro teor" },
      { label: "PAD Canoas (Dec. 462/16)", normaId: "decreto-canoas-462-2016", sectionId: "art-1", artigos: "Inteiro teor" },
    ],
  },
"""

text = re.sub(r'(const DISCIPLINAS: Disc\[\] = \[)', r'\1' + municipal_section, text)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Update complete")
