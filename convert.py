import json

def create_ts_file(txt_path, out_path, id_name, titulo, subtitulo):
    with open(txt_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # clean up the text a bit
    text = text.replace('`', '\\`')
    text = text.replace('${', '\\${')
    
    ts_content = f'''import type {{ SecaoLegislacao }} from "./types";

export const {id_name}Sections: SecaoLegislacao[] = [
  {{
    id: "{id_name}",
    titulo: "{titulo}",
    subtitulo: "{subtitulo}",
    texto: `{text}`
  }}
];
'''
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)

create_ts_file(
    'C:/tmp/gdrive/LEGISLAÇÃO PROFISSIONAL/2026 REGULAMENTO GERAL DO ESTATUTO DA ADVOCACIA E DA OAB.pdf.txt',
    'src/data/legislacoes/regulamento-geral-oab.ts',
    'regulamentoGeralOab',
    'Regulamento Geral do Estatuto da Advocacia e da OAB',
    'Conselho Federal da OAB'
)

create_ts_file(
    'C:/tmp/gdrive/LEGISLAÇÃO PROFISSIONAL/Lei-ordinaria-6817-2025-Canoas-RS-consolidada-[07-01-2026] Lei de Regência da Procuradoria-Geral do Município de Canoas.pdf.txt',
    'src/data/legislacoes/lei-6817-2025.ts',
    'lei6817',
    'Lei Municipal nº 6.817/2025',
    'Lei de Regência da Procuradoria-Geral do Município de Canoas'
)
