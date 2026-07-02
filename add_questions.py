import re
import json

# Parse extracted_questions.txt
text = open('extracted_questions.txt', 'r', encoding='utf-8').read()

# We need to extract all questions that look like:
# QUESTÃO <number>. <text>
# A) <opt> B) <opt> C) <opt> D) <opt>
# And their gabaritos:
# QUESTÃO <number>\nAlternativa Correta: <let>\nExplicação: <exp>\nReferências: <ref>

questions = {}

q_matches = re.finditer(r'QUESTÃO (\d{3})\.\s*(.*?)\nA\)\s*(.*?)\s*B\)\s*(.*?)\s*C\)\s*(.*?)\s*D\)\s*(.*?)(?=\nQUESTÃO|\nGABARITO)', text, re.DOTALL)
for m in q_matches:
    num, qtext, a, b, c, d = m.groups()
    questions[num] = {
        'text': qtext.strip(),
        'options': [
            {'label': 'A', 'text': a.strip()},
            {'label': 'B', 'text': b.strip()},
            {'label': 'C', 'text': c.strip()},
            {'label': 'D', 'text': d.strip()},
        ]
    }

# There are also questions formatted slightly differently in other parts, let's check
q_matches_2 = re.finditer(r'QUESTÃO (\d{2})\.\s*(.*?)\nA\)\s*(.*?)\n B\)\s*(.*?)\n C\)\s*(.*?)\n D\)\s*(.*?)(?=\nQUESTÃO|\nGABARITO)', text, re.DOTALL)
for m in q_matches_2:
    num, qtext, a, b, c, d = m.groups()
    questions[num] = {
        'text': qtext.strip(),
        'options': [
            {'label': 'A', 'text': a.strip()},
            {'label': 'B', 'text': b.strip()},
            {'label': 'C', 'text': c.strip()},
            {'label': 'D', 'text': d.strip()},
        ]
    }

g_matches = re.finditer(r'QUESTÃO (\d+)\s*\nAlternativa Correta: ([A-D])\s*\nExplicação:\s*(.*?)\s*Referências:\s*(.*?)(?=\nQUESTÃO|\nCADERNO)', text, re.DOTALL)
for m in g_matches:
    num, ans, exp, ref = m.groups()
    if num in questions:
        questions[num]['correctAnswer'] = ans
        questions[num]['explanation'] = exp.strip() + " Referências: " + ref.strip()

# Now load existing ts file to avoid duplicates based on text
ts_content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()

last_id_match = re.findall(r'id:\s*(\d+)', ts_content)
next_id = int(last_id_match[-1]) + 1 if last_id_match else 1

new_items = []
for num, q in questions.items():
    if q['text'][:50] not in ts_content: # avoid duplicates
        item = f"""  {{
    id: {next_id},
    qid: "PGM-C{next_id:03d}",
    topic: "Legislação Municipal",
    year: 2025,
    text: "{q['text'].replace('"', '\\"')}",
    options: [
      {{ label: "A", text: "{q['options'][0]['text'].replace('"', '\\"')}" }},
      {{ label: "B", text: "{q['options'][1]['text'].replace('"', '\\"')}" }},
      {{ label: "C", text: "{q['options'][2]['text'].replace('"', '\\"')}" }},
      {{ label: "D", text: "{q['options'][3]['text'].replace('"', '\\"')}" }},
    ],
    correctAnswer: "{q.get('correctAnswer', 'A')}",
    explanation: "{q.get('explanation', '').replace('"', '\\"').replace(chr(10), ' ')}",
  }},
"""
        new_items.append(item)
        next_id += 1

if new_items:
    # insert before the last bracket
    idx = ts_content.rfind('];')
    if idx != -1:
        ts_content = ts_content[:idx] + "".join(new_items) + ts_content[idx:]
        open('src/data/legislacao-municipal-questions.ts', 'w', encoding='utf-8').write(ts_content)
        print(f"Added {len(new_items)} questions!")
else:
    print("No new questions to add.")
