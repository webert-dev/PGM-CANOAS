export interface SecaoLegislacao {
  id: string;
  titulo: string;
  subtitulo: string;
  texto: string;
}

export interface GrupoLegislacao {
  nome: string;
  itens: SecaoLegislacao[];
}
