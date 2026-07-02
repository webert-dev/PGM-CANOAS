import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

content = re.sub(r'id:\s*(\d+)\s*\n', r'id: \1,\n', content)
content = re.sub(r'qid:\s*(".*?")\s*\n', r'qid: \1,\n', content)
content = re.sub(r'topic:\s*(".*?")\s*\n', r'topic: \1,\n', content)
content = re.sub(r'year:\s*(\d+),?\s*\n', r'year: \1,\n', content)
content = re.sub(r'text:\s*(".*?")\s*\n', r'text: \1,\n', content)
content = re.sub(r'correctAnswer:\s*(".*?")\s*\n', r'correctAnswer: \1,\n', content)
content = re.sub(r'}\s+{', r'},\n{', content)

open('src/data/legislacao-municipal-questions.ts', 'w', encoding='utf-8').write(content)
