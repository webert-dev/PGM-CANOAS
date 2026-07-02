with open('public/documentos/regulamento-geral-oab.md', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'Ãµ': 'õ',
    'Âº': 'º',
    'Âª': 'ª',
    'Ã§': 'ç',
    'Ã£': 'ã',
    'Ã³': 'ó',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã¡': 'á',
    'Ãº': 'ú',
    'Ãª': 'ê',
    'Â§': '§',
    'Ã¢': 'â',
    'Ã ': 'Í',
    'Ã‡': 'Ç',
    'Ãƒ': 'Ã',
    'Ã‰': 'É',
    'Ã“': 'Ó',
    'Ã‚': 'Â',
    'Ãš': 'Ú',
    'Ã€': 'À',
    'TÃ TULO': 'TÍTULO',
    'CAPÃ TULO': 'CAPÍTULO',
    'SEÃ‡ÃƒO': 'SEÇÃO'
}

for k, v in replacements.items():
    text = text.replace(k, v)

with open('public/documentos/regulamento-geral-oab.md', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed text')
