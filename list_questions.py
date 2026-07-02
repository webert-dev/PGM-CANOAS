import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()
matches = re.findall(r'id:\s*(12[1-9]|13[0-9]),.*?text:\s*"(.*?)"', content, re.DOTALL)
for m in matches:
    print(f'{m[0]}: {m[1][:100]}')
