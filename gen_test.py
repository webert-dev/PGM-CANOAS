content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

lines = content.split('\n')
out = []
in_interface = False
for line in lines:
    if 'export interface Question' in line:
        in_interface = True
        continue
    if in_interface and line.strip() == '}':
        in_interface = False
        continue
    if in_interface:
        continue
    out.append(line.replace('export const questionsData: Question[] =', 'const questionsData =').replace('export const questionsData =', 'const questionsData ='))

open('test.js', 'w', encoding='utf-8').write('\n'.join(out))
