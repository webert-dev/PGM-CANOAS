import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

# Fix nested array start
content = content.replace('export const questionsData: Question[] = [\n    [\n    {', 'export const questionsData: Question[] = [\n    {')

# Fix nested array end (if exists, like ]; ];)
content = content.replace('    ]\n];', '];')

# Fix missing commas in options
content = re.sub(r'label:\s*("[A-D]")\s*\n\s*text:', r'label: \1, text:', content)
# Sometimes it's label: "A"\ntext:
# So let's be more generic
content = re.sub(r'label:\s*("[A-D]"),?\s*\n\s*text:', r'label: \1, text:', content)

# Also check for any missing commas after text string in options if they are on separate lines, but usually it's { label: "A", text: "..." }
# Make sure the end of the file is correctly closed
if not content.strip().endswith('];'):
    content = content.strip()
    if content.endswith(']'):
        content += ';'
    elif content.endswith('}'):
        content += '\n];'
    elif content.endswith(','):
        content = content[:-1] + '\n];'

open('src/data/legislacao-municipal-questions.ts', 'w', encoding='utf-8').write(content)
print("Fix applied.")
