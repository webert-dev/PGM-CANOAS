import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

print('Missing comma after options array:', len(re.findall(r'\]\s*\n\s*correctAnswer', content)))
print('Missing comma after text:', len(re.findall(r'text: ".*?"\s*\n\s*options:', content)))

content = re.sub(r'\]\s*\n\s*correctAnswer', r'],\n    correctAnswer', content)
content = re.sub(r'text: (".*?")\s*\n\s*options:', r'text: \1,\n    options:', content)

open('src/data/legislacao-municipal-questions.ts', 'w', encoding='utf-8').write(content)
print("Commas fixed!")
