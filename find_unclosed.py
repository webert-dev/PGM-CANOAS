import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

lines = content.split('\n')
for i, line in enumerate(lines):
    # count unescaped quotes in the line
    quotes = len(re.findall(r'(?<!\\)"', line))
    if quotes % 2 != 0:
        print(f"Line {i+1}: {line}")
