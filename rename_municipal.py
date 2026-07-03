import os
import glob

# Directory
doc_dir = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\public\documentos"

renames = [
    ("Canoas-RS - Decreto Municipal nº 110-2024 — Tratamento diferenciado e simplificado para ME e EPP.md", "decreto-canoas-110-2024.md"),
    ("Canoas-RS - Decreto Municipal nº 240-2025 — Decreto regulamentar regência PGM.md", "decreto-canoas-240-2025.md"),
    ("Canoas-RS - Decreto Municipal nº 549-2023 — Fase interna das licitações.md", "decreto-canoas-549-2023.md"),
    ("Canoas-RS - Decreto Municipal nº 59-2024 - Procedimento Administrativo Especial de Punição (PAEP).md", "decreto-canoas-59-2024.md"),
    ("Canoas-RS - Decreto Municipal nº 60-2024 - Diálogo Competitivo - Regula 32 da Lei nº 14.133.md", "decreto-canoas-60-2024.md"),
    ("Canoas-RS - Decreto Municipal nº 684-2003 -  Dispõe sobre parcelamento de créditos tributários e não tributários.md", "decreto-canoas-684-2003.md"),
    ("Canoas-RS - Decreto Municipal nº 88-2013 — Decreto sobre procedimentos administrativos.md", "decreto-canoas-88-2013.md"),
    ("Canoas-RS - Lei Complementar nº 14-2025 - Reestrutura o Regime Próprio de Previdência Social do Município de Canoas.md", "lc-canoas-14-2025.md"),
    ("Canoas-RS - Lei Complementar nº 6-2016 - Lei da Guarda Municipal.md", "lc-canoas-6-2016.md"),
    ("Canoas-RS - Lei Municipal nº 1.783-1977 - Código Tributário do Município de Canoas.md", "lei-canoas-1783-1977.md"),
    ("Canoas-RS - Lei Municipal nº 4.739-2003 — Cria o CANOASPREV.md", "lei-canoas-4739-2003.md"),
    ("Canoas-RS - Lei Municipal nº 4.818-2003 - ISSQN normas específicas, alíquotas e procedimentos do ISS.md", "lei-canoas-4818-2003.md"),
    ("Canoas-RS - Lei Municipal nº 5.503-2010 -  ITBI Imposto sobre a Transmissão Intervivos, por ato oneroso, de bens imóveis.md", "lei-canoas-5503-2010.md"),
    ("Canoas-RS -Decreto Municipal nº 45-2024 — Sistema de registro de preços.md", "decreto-canoas-45-2024.md"),
    ("Canoas-RS -Decreto Municipal nº 462-2016 - PAD.md", "decreto-canoas-462-2016.md"),
    ("Canoas-RS- CÓDIGO MUNICIPAL DE MEIO AMBIENTE - Lei 4328-1998.md", "lei-canoas-4328-1998.md"),
    ("Decreto Municipal nº 701-2009 - política permanente de financiamento e refinanciamento de créditos tributários e não tributários.md", "decreto-canoas-701-2009.md")
]

for old, new in renames:
    old_path = os.path.join(doc_dir, old)
    new_path = os.path.join(doc_dir, new)
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed: {old} -> {new}")
    else:
        print(f"File not found: {old}")

# Special case with wildcard for 1943
for old_path in glob.glob(os.path.join(doc_dir, "Canoas-RS - Lei Municipal nº 1.943-1979*.md")):
    new_path = os.path.join(doc_dir, "lei-canoas-1943-1979.md")
    os.rename(old_path, new_path)
    print(f"Renamed: {os.path.basename(old_path)} -> lei-canoas-1943-1979.md")
