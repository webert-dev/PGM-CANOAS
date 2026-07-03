import os
import glob
import re

doc_dir = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\public\documentos"
file_path = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\src\pages\Legislacoes.tsx"

renames = [
    ("*6883-2025*.md", "lei-canoas-6883-2025.md", "Limite RPV (Lei 6.883/25)"),
    ("*2214 1984*.md", "lei-canoas-2214-1984.md", "Estatuto dos Servidores (Lei 2.214/84)"),
    ("*5565 2010*.md", "lei-canoas-5565-2010.md", "Fundação Municipal de Saúde (Lei 5.565/10)"),
    ("*5777 2013*.md", "lei-canoas-5777-2013.md", "Quadro Especial de Servidores (Lei 5.777/13)"),
    ("*5878 2014*.md", "lei-canoas-5878-2014.md", "Plano Carreira Educação - PEB (Lei 5.878/14)"),
    ("*5909 2015*.md", "lei-canoas-5909-2015.md", "Regime Subsídios Optantes (Lei 5.909/15)"),
    ("*5910 2015*.md", "lei-canoas-5910-2015.md", "Regime Subsídios Magistério (Lei 5.910/15)"),
    ("*5912 2015*.md", "lei-canoas-5912-2015.md", "Gratificação de Resolutividade (Lei 5.912/15)"),
    ("*5961 2015*.md", "lei-canoas-5961-2015.md", "Plano Diretor - PDUA (Lei 5.961/15)"),
    ("*ORGÂNICA DO MUNICÍPIO*.md", "lei-organica-canoas.md", "Lei Orgânica do Município")
]

new_ids = []
new_items_code = ""
new_if_code = ""

print("Renaming files...")
for pattern, new_name, label in renames:
    matches = glob.glob(os.path.join(doc_dir, pattern))
    if matches:
        old_path = matches[0]
        new_path = os.path.join(doc_dir, new_name)
        if old_path != new_path:
            if os.path.exists(new_path):
                os.remove(new_path)
            os.rename(old_path, new_path)
            print(f"Renamed {os.path.basename(old_path)} -> {new_name}")
        
        # Prepare TSX strings
        normaId = new_name.replace(".md", "")
        new_ids.append(normaId)
        new_items_code += f'      {{ label: "{label}", normaId: "{normaId}", sectionId: "art-1", artigos: "Inteiro teor" }},\n'
        new_if_code += f'    else if (selectedNorma === "{normaId}") fileName = "{new_name}";\n'

# Additionally handle the duplicate 4328 if it exists and remove it to keep it clean
dup = glob.glob(os.path.join(doc_dir, "*4328 1998*.md"))
if dup:
    print(f"Removing duplicate {dup[0]}")
    os.remove(dup[0])

# Update Legislacoes.tsx
print("Updating Legislacoes.tsx...")
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Unions
if new_ids:
    union_additions = ' | "' + '" | "'.join(new_ids) + '"'
    text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"decreto-canoas-462-2016")(?=\s*;)', r'\1' + union_additions, text)
    text = re.sub(r'(useState<"intro" \| "cf88"[\s\S]*?"decreto-canoas-462-2016")(?=>\("intro"\))', r'\1' + union_additions, text)
    text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"decreto-canoas-462-2016")(?=, sectionId:)', r'\1' + union_additions, text)

    # 2. Update If block
    text = re.sub(r'(else if \(selectedNorma === "decreto-canoas-462-2016"\) fileName = "decreto-canoas-462-2016\.md";)', r'\1\n' + new_if_code.strip('\n'), text)

    # 3. Update DISCIPLINAS municipal section (find PAD Canoas and insert right after it)
    pad_line = '{ label: "PAD Canoas (Dec. 462/16)", normaId: "decreto-canoas-462-2016", sectionId: "art-1", artigos: "Inteiro teor" },'
    text = text.replace(pad_line, pad_line + '\n' + new_items_code.rstrip('\n'))

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("TypeScript file updated successfully.")
else:
    print("No new files found to add.")
