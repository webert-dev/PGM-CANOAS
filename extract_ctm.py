import json
transcript_path = r"C:\Users\fcout\.gemini\antigravity-ide\brain\603eb404-88cc-46cc-a06c-7c448f0be42c\.system_generated\logs\transcript_full.jsonl"
with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT':
            content = data.get('content', '')
            if len(content) > 10000:
                print(f"Line {i}: Length {len(content)}")
                import re
                pages = re.findall(r'==Start of OCR for page \d+==\n(.*?)\n==End of OCR for page \d+==', content, re.DOTALL)
                print(f"Found {len(pages)} pages!")
                
                if pages:
                    full_text = ""
                    for p in pages:
                        cleaned = re.sub(r'\d+/237\nLeisMunicipais\.com\.br.*?Gerado em:.*?\n?', '', p, flags=re.DOTALL)
                        full_text += cleaned + "\n"
                    
                    full_text = re.sub(r'^(Art\.\s+\d+.*?)\s*-', r'**\1** -', full_text, flags=re.MULTILINE)
                    full_text = re.sub(r'^(Art\.\s+\d+.*?)\n', r'**\1**\n', full_text, flags=re.MULTILINE)
                    full_text = re.sub(r'^(CAP[IÍ]TULO\s+[IVXLCDM]+)', r'**\1**', full_text, flags=re.MULTILINE | re.IGNORECASE)
                    full_text = re.sub(r'^(T[IÍ]TULO\s+[IVXLCDM]+)', r'**\1**', full_text, flags=re.MULTILINE | re.IGNORECASE)
                    
                    output_path = r"public\documentos\ctm-canoas.md"
                    with open(output_path, 'w', encoding='utf-8') as f_out:
                        f_out.write("# CÓDIGO TRIBUTÁRIO MUNICIPAL DE CANOAS\n\n")
                        f_out.write("## LEI Nº 1943/79\n\n")
                        f_out.write(full_text)
                    print("Successfully written to", output_path)
                    break
