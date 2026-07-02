import re

with open('public/documentos/codigo-etica-oab.md', 'r', encoding='utf-8') as f:
    text = f.read()

# First, replace ` \- ` with ` - `
text = text.replace(r' \- ', ' - ')

# Split `** **` that are on the same line
text = re.sub(r'\*\*\s+\*\*', '**\n**', text)

def fix_titulo_cap(match):
    prefix = match.group(1) # TÍTULO or CAPÍTULO
    num = match.group(2)
    desc = match.group(3)
    return f"**{prefix} {num}**\n**{desc}**"

text = re.sub(r'\*\*(TÍTULO|CAPÍTULO)\s+([IVXLCDM]+|ÚNICO)\s+-\s+(.+?)\*\*', fix_titulo_cap, text, flags=re.IGNORECASE)

def fix_secao(match):
    num = match.group(1)
    desc = match.group(2)
    return f"**SEÇÃO {num} - {desc}**"

text = re.sub(r'\*\*SEÇÃO\s+([IVXLCDM]+)\s+-\s+(.+?)\*\*', fix_secao, text, flags=re.IGNORECASE)

with open('public/documentos/codigo-etica-oab.md', 'w', encoding='utf-8') as f:
    f.write(text)

print("Formatting applied.")
