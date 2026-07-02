content = open('src/data/legislacao-municipal-questions.ts', 'r', encoding='utf-8').read()
lines = content.split('\n')
out = []
i = 0
while i < len(lines):
    line = lines[i]
    # count unescaped quotes
    import re
    quotes = len(re.findall(r'(?<!\\)"', line))
    if quotes % 2 != 0:
        # join with next line with a space
        if i + 1 < len(lines):
            line = line + ' ' + lines[i+1].lstrip()
            # check if it's closed now
            quotes = len(re.findall(r'(?<!\\)"', line))
            if quotes % 2 != 0: # still unclosed, keep joining
                line = line + ' ' + lines[i+2].lstrip()
                i += 2
            else:
                i += 1
        out.append(line)
    else:
        out.append(line)
    i += 1

open('src/data/legislacao-municipal-questions.ts', 'w', encoding='utf-8').write('\n'.join(out))
print("Unclosed strings fixed!")
