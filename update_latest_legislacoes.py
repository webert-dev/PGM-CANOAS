import os
import glob
import re

doc_dir = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\public\documentos"
file_path = r"c:\Users\fcout\SISTEMA_FAMILIA\04_NEGOCIOS_E_CARREIRAS\04.4_Tecnologia_e_Programacao\PGM CANOAS\src\pages\Legislacoes.tsx"

renames = [
    ("*6485 2021*.md", "lei-canoas-6485-2021.md", "Fundo Saúde Servidor (Lei 6.485/21)"),
    ("*6817-2025*.md", "lei-canoas-6817-2025.md", "Regência PGM Canoas (Lei 6.817/25)")
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

# Update Legislacoes.tsx
print("Updating Legislacoes.tsx...")
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Unions
if new_ids:
    union_additions = ' | "' + '" | "'.join(new_ids) + '"'
    text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"lei-organica-canoas")(?=\s*;)', r'\1' + union_additions, text)
    text = re.sub(r'(useState<"intro" \| "cf88"[\s\S]*?"lei-organica-canoas")(?=>\("intro"\))', r'\1' + union_additions, text)
    text = re.sub(r'(normaId:\s*"cf88"[\s\S]*?"lei-organica-canoas")(?=, sectionId:)', r'\1' + union_additions, text)

    # 2. Update If block
    text = re.sub(r'(else if \(selectedNorma === "lei-organica-canoas"\) fileName = "lei-organica-canoas\.md";)', r'\1\n' + new_if_code.strip('\n'), text)

    # 3. Update DISCIPLINAS municipal section (find PAD Canoas and insert right after it)
    pad_line = '{ label: "Lei Orgânica do Município", normaId: "lei-organica-canoas", sectionId: "art-1", artigos: "Inteiro teor" },'
    text = text.replace(pad_line, pad_line + '\n' + new_items_code.rstrip('\n'))

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("TypeScript file updated successfully.")
else:
    print("No new files found to add.")
