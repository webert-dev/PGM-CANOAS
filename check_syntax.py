import re

content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

print('Missing comma in ID:', len(re.findall(r'id: \d+\s*\n\s*qid', content)))
print('Missing comma in qid:', len(re.findall(r'qid: ".*?"\s*\n\s*topic', content)))
print('Missing comma in topic:', len(re.findall(r'topic: ".*?"\s*\n\s*year', content)))
print('Missing comma in options array:', len(re.findall(r'label: "[A-D]"\s*\n\s*text:', content)))
print('Missing comma before { in array:', len(re.findall(r'}\s+{', content)))
print('Double array start:', '[ [' in content)
