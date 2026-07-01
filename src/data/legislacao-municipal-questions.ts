// Questões de Legislação Municipal de Canoas
// Inspiradas em 547 modelos de questões da Banca Objetiva para cargos jurídicos
// Adaptadas à legislação municipal de Canoas/RS conforme edital

export interface Question {
  id: number;
  qid: string;
  topic: string;
  year: number;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export const questionsData: Question[] = [
  {
    id: 1, qid: "PGM-C01", topic: "Direito Tributário Municipal", year: 2025,
    text: "Segundo o Código Tributário Municipal (Lei nº 1.783/1977) e a Lei nº 1.943/1979, sobre o Imposto sobre a Propriedade Predial e Territorial Urbana (IPTU), analise as assertivas abaixo:\n\nI. O fato gerador do IPTU repete-se anualmente, considerando-se ocorrido no dia 1º de janeiro de cada ano civil.\nII. Para fins fiscais e de ordenamento do solo, todo o território do Município de Canoas é considerado urbano.\nIII. A base de cálculo do imposto é o valor venal do imóvel, sendo que o lançamento será feito em nome do proprietário, do titular do domínio útil ou do possuidor.\n\nEstá(ão) CORRETA(S):",
    options: [
      { label: "A", text: "Apenas o item I." },
      { label: "B", text: "Apenas os itens I e II." },
      { label: "C", text: "Apenas os itens II e III." },
      { label: "D", text: "Todos os itens." },
    ],
    correctAnswer: "D",
    explanation: "Todos os itens estão corretos. I: O fato gerador do IPTU ocorre em 1º de janeiro (literalidade da lei). II: Conforme o PDUA e a legislação tributária, há a ficção jurídica de que todo o território de Canoas é urbano para fins fiscais. III: A base de cálculo é o valor venal, lançado em nome do proprietário, titular do domínio útil ou possuidor. Referências: Lei nº 1.943/79, Art. 2º; Lei nº 5.961/15, Art. 133; Lei nº 1.783/77, Arts. 109 e 110.",
  },
  {
    id: 2, qid: "PGM-C02", topic: "Legislação Profissional / Administrativo", year: 2025,
    text: "Com base na Lei de Regência da PGM (Lei nº 6.817/2025), assinale a alternativa que apresenta uma função exclusiva da Procuradoria-Geral do Município:",
    options: [
      { label: "A", text: "Realizar a fiscalização contábil, financeira e orçamentária do Município." },
      { label: "B", text: "A consultoria jurídica da Administração Municipal Direta, vinculada ao Poder Executivo." },
      { label: "C", text: "Aplicar penalidades disciplinares de demissão a todos os servidores públicos municipais." },
      { label: "D", text: "Fixar o subsídio do Prefeito, do Vice-Prefeito e dos Secretários Municipais." },
    ],
    correctAnswer: "B",
    explanation: "A Lei de Regência da PGM Canoas estabelece como função exclusiva a consultoria jurídica e representação da Administração Direta. A alternativa A refere-se ao controle externo (Câmara/TCE). A C é competência do Prefeito/Presidente da Câmara. A D é competência exclusiva da Câmara. Referências: Lei nº 6.817/2025, Art. 4º, I; LOM, Arts. 18 e 149.",
  },
  {
    id: 3, qid: "PGM-C03", topic: "Direito Previdenciário Municipal", year: 2025,
    text: "Conforme a Lei Complementar nº 14/2025, que reestrutura o Regime Próprio de Previdência Social (RPPS) de Canoas, a taxa de administração destinada ao custeio das despesas da entidade gestora (CANOASPREV) é de:",
    options: [
      { label: "A", text: "1,0% sobre o somatório da remuneração bruta dos servidores ativos." },
      { label: "B", text: "1,7% calculados sobre o somatório da remuneração bruta de todos os servidores ativos, inativos e pensionistas do exercício anterior." },
      { label: "C", text: "2,0% incidentes exclusivamente sobre a contribuição patronal básica." },
      { label: "D", text: "14% incidente sobre o total da remuneração de contribuição." },
    ],
    correctAnswer: "B",
    explanation: "O Art. 17 da LC 14/2025 fixa a Taxa de Administração em exatamente 1,7% sobre o somatório das remunerações e proventos brutos. A alternativa D cita a alíquota de contribuição do servidor (14%), que não se confunde com a taxa de administração. Referências: LC nº 14/2025, Arts. 17 e 22.",
  },
  {
    id: 4, qid: "PGM-C04", topic: "Direito Ambiental e Urbanístico", year: 2025,
    text: "De acordo com o Plano Diretor Urbano Ambiental (Lei nº 5.961/2015), o estudo que tem por objetivo avaliar os impactos de um empreendimento quanto à qualidade de vida da população vizinha, abordando aspectos como adensamento populacional e paisagem urbana, denomina-se:",
    options: [
      { label: "A", text: "Estudo de Viabilidade Urbanística (EVU)." },
      { label: "B", text: "Relatório de Impacto Ambiental (RIMA)." },
      { label: "C", text: "Estudo de Impacto de Vizinhança (EIV)." },
      { label: "D", text: "Plano de Gerenciamento de Riscos Urbanos." },
    ],
    correctAnswer: "C",
    explanation: "O EIV é definido no PDUA como o instrumento específico para avaliar o impacto na vizinhança e na qualidade de vida local. O EVU foca na viabilidade técnica da ocupação do solo. O RIMA é focado em impactos ambientais mais amplos conforme legislação federal/estadual. Referências: Lei nº 5.961/2015, Arts. 191 e 192.",
  },
  {
    id: 5, qid: "PGM-C05", topic: "Direito Administrativo (Estatuto)", year: 2025,
    text: "Segundo o Estatuto dos Funcionários Públicos (Lei nº 2.214/1984), a posse em cargo público de provimento efetivo deverá ocorrer no prazo de:",
    options: [
      { label: "A", text: "15 dias, prorrogáveis por igual prazo." },
      { label: "B", text: "30 dias, contados da data de publicação do ato de provimento, admitindo prorrogação por mais 30 dias." },
      { label: "C", text: "10 dias úteis, improrrogáveis." },
      { label: "D", text: "45 dias, a contar da homologação do concurso público." },
    ],
    correctAnswer: "B",
    explanation: "O Estatuto de Canoas prevê o prazo de 30 dias para a posse, permitindo uma única prorrogação por mais 30 dias mediante requerimento. Prazos são temas recorrentes na banca Objetiva para induzir o candidato ao erro com números similares (15 ou 45 dias). Referências: Lei nº 2.214/1984, Art. 65 e § 1º.",
  },
  {
    id: 6, qid: "PGM-C06", topic: "Direito Administrativo (Estatuto)", year: 2025,
    text: "De acordo com a Lei Municipal nº 2.214/1984 (Estatuto dos Funcionários), a interrupção das férias de um servidor público municipal, por estrito interesse da Administração, é admitida, mas depende obrigatoriamente de:",
    options: [
      { label: "A", text: "Acordo verbal entre a chefia imediata e o servidor." },
      { label: "B", text: "Autorização expressa do Prefeito Municipal." },
      { label: "C", text: "Comunicação ao Ministério Público do Trabalho." },
      { label: "D", text: "Decisão fundamentada do Conselho Superior da PGM." },
    ],
    correctAnswer: "B",
    explanation: "O Estatuto prevê expressamente que a interrupção de férias, quando houver interesse público, é ato de competência do Chefe do Executivo. Referências: Lei nº 2.214/1984, Art. 81, parágrafo único.",
  },
  {
    id: 7, qid: "PGM-C07", topic: "Direito Tributário Municipal", year: 2025,
    text: "Segundo a Lei Municipal nº 5.503/2010, o Imposto de Transmissão Inter Vivos de Bens Imóveis (ITBI) tem como fato gerador a transmissão inter vivos, a qualquer título, por ato oneroso, de:\n\nI. Bens imóveis, por natureza ou acessão física.\nII. Direitos reais sobre imóveis, inclusive os de garantia.\nIII. Cessão de direitos à aquisição de bens imóveis.\n\nEstá(ão) CORRETO(S):",
    options: [
      { label: "A", text: "Apenas o item I." },
      { label: "B", text: "Apenas os itens I e III." },
      { label: "C", text: "Apenas os itens II e III." },
      { label: "D", text: "Todos os itens." },
    ],
    correctAnswer: "B",
    explanation: "I (Correto): Previsto como hipótese de incidência no caput do Art. 2º. II (Incorreto): O imposto incide sobre direitos reais, exceto os de garantia. III (Correto): A cessão de direitos à aquisição é expressamente tributada. Referências: Lei nº 5.503/2010, Art. 2º.",
  },
  {
    id: 8, qid: "PGM-C08", topic: "Direito Administrativo (Licitações)", year: 2025,
    text: "Conforme o Decreto Municipal nº 59/2024, que regulamenta o Procedimento Administrativo Especial de Punição (PAEP), a aplicação da sanção de impedimento para contratar com a Administração Pública Municipal compete ao:",
    options: [
      { label: "A", text: "Prefeito Municipal." },
      { label: "B", text: "Procurador-Geral do Município." },
      { label: "C", text: "Secretário da pasta interessada." },
      { label: "D", text: "Controlador-Geral do Município." },
    ],
    correctAnswer: "C",
    explanation: "De acordo com a graduação de competências do PAEP, o Secretário da pasta (ou autoridade equiparada na indireta) aplica advertência, multa, suspensão e impedimento de contratar. A declaração de inidoneidade, por ser mais grave, fica com o Prefeito. Referências: Decreto nº 59/2024, Art. 8º, III.",
  },
  {
    id: 9, qid: "PGM-C09", topic: "Direito Previdenciário Municipal", year: 2025,
    text: "Com base na Lei Complementar nº 14/2025 (Regime Próprio de Previdência - RPPS), para a concessão de aposentadoria voluntária ao servidor efetivo (regra geral), exige-se, cumulativamente, as seguintes idades para mulheres e homens, respectivamente:",
    options: [
      { label: "A", text: "60 anos e 65 anos." },
      { label: "B", text: "62 anos e 65 anos." },
      { label: "C", text: "55 anos e 60 anos." },
      { label: "D", text: "62 anos e 67 anos." },
    ],
    correctAnswer: "B",
    explanation: "A nova lei previdenciária de Canoas fixou a idade de 62 anos para mulheres e 65 anos para homens como requisito para a aposentadoria voluntária. Referências: LC nº 14/2025, Art. 42, I, 'a'.",
  },
  {
    id: 10, qid: "PGM-C10", topic: "Legislação da PGM", year: 2025,
    text: "No que tange à estrutura da Procuradoria-Geral, conforme a Lei de Regência da PGM (Lei nº 6.817/2025), o Conselho Superior da PGM é composto, entre outros membros, pelo:",
    options: [
      { label: "A", text: "Controlador-Geral do Município." },
      { label: "B", text: "Presidente da Associação dos Procuradores do Município de Canoas." },
      { label: "C", text: "Secretário Municipal da Fazenda." },
      { label: "D", text: "Presidente da Câmara Municipal de Vereadores." },
    ],
    correctAnswer: "B",
    explanation: "O Conselho Superior é presidido pelo Procurador-Geral e conta com a participação nata do Presidente da Associação dos Procuradores (APMC). Referências: Lei nº 6.817/2025, Art. 11, II.",
  },
  {
    id: 11, qid: "PGM-C11", topic: "Direito Ambiental Municipal", year: 2025,
    text: "O Código Municipal de Meio Ambiente (Lei nº 4.328/1998) estabelece circunstâncias que agravam as infrações ambientais. Assinale a alternativa que NÃO apresenta uma circunstância agravante prevista no referido código:",
    options: [
      { label: "A", text: "Ser o infrator reincidente." },
      { label: "B", text: "Ter o agente cometido a infração para obter vantagem pecuniária." },
      { label: "C", text: "O infrator coagir outrem para a execução material da infração." },
      { label: "D", text: "O arrependimento eficaz do infrator, manifestado pela espontânea reparação do dano." },
    ],
    correctAnswer: "D",
    explanation: "O arrependimento eficaz e a reparação espontânea do dano são classificados como circunstâncias atenuantes, não agravantes. As demais opções (reincidência, vantagem pecuniária e coação) são agravantes. Referências: Lei nº 4.328/1998, Art. 102 (agravantes) e Art. 101 (atenuantes).",
  },
  {
    id: 12, qid: "PGM-C12", topic: "Direito Urbanístico", year: 2025,
    text: "Segundo o Plano Diretor Urbano Ambiental (Lei nº 5.961/2015), quando uma área atingida por traçado viário ou por equipamentos públicos comunitários for repassada ao Município, a Quota Ideal de Terreno por Economia (QI) será aplicada sobre:",
    options: [
      { label: "A", text: "Apenas a área remanescente do terreno." },
      { label: "B", text: "A metade da área original do lote." },
      { label: "C", text: "A totalidade do terreno original." },
      { label: "D", text: "O dobro da área de preservação permanente existente no local." },
    ],
    correctAnswer: "C",
    explanation: "Trata-se de um incentivo urbanístico: se o proprietário cede área para vias ou equipamentos públicos previstos no plano, a prefeitura permite que ele utilize o índice de construção (QI) calculado sobre a área total original, 'compensando' a perda de terreno. Referências: Lei nº 5.961/2015, Art. 202, § 5º.",
  },
  {
    id: 13, qid: "PGM-C13", topic: "Direito Tributário Municipal", year: 2025,
    text: "Conforme a Tabela de Incidência da Lei nº 4.818/2003 (com redação da Lei nº 6.824/2025), os serviços prestados por sociedade, mediante aplicação de valor vinculado à URM por profissional habilitado (sócio ou não), terá o valor anual de:",
    options: [
      { label: "A", text: "100 URM." },
      { label: "B", text: "150 URM." },
      { label: "C", text: "300 URM." },
      { label: "D", text: "500 URM." },
    ],
    correctAnswer: "C",
    explanation: "A legislação de regência do ISSQN atualizada estabelece o valor de 300 URM por profissional habilitado para a tributação fixa de sociedades. Referências: Lei nº 4.818/2003, Anexo I 'B', item 5.",
  },
  {
    id: 14, qid: "PGM-C14", topic: "Direito Financeiro Municipal", year: 2025,
    text: "De acordo com a Lei Municipal nº 6.883/2025, o limite para as obrigações consideradas como Requisições de Pequeno Valor (RPV) devidas pela Fazenda Pública Municipal de Canoas é de:",
    options: [
      { label: "A", text: "05 salários mínimos." },
      { label: "B", text: "07 salários mínimos." },
      { label: "C", text: "10 salários mínimos." },
      { label: "D", text: "30 salários mínimos." },
    ],
    correctAnswer: "B",
    explanation: "A lei sancionada em dezembro de 2025 definiu o novo teto de 7 salários mínimos para o pagamento via RPV no Município de Canoas. Referências: Lei nº 6.883/2025, Art. 1º.",
  },
  {
    id: 15, qid: "PGM-C15", topic: "Direito Administrativo (Estatuto)", year: 2025,
    text: "Considerando as alterações recentes nos prazos do Estatuto dos Funcionários de Canoas (Lei nº 2.214/1984), a posse em cargo público e o início do exercício deverão ocorrer, respectivamente, nos seguintes prazos:",
    options: [
      { label: "A", text: "10 dias úteis e 05 dias úteis." },
      { label: "B", text: "05 dias úteis e no primeiro dia útil após a posse." },
      { label: "C", text: "30 dias corridos e 30 dias corridos." },
      { label: "D", text: "15 dias úteis e 10 dias úteis." },
    ],
    correctAnswer: "B",
    explanation: "Com a redação dada pela Lei 6.484/2021, o prazo de posse foi reduzido para 5 dias úteis e o início do exercício deve ocorrer no primeiro dia útil da data da posse. Referências: Lei nº 2.214/1984, Arts. 65 e 69.",
  },
  {
    id: 16, qid: "PGM-C16", topic: "Direito Administrativo (PAD)", year: 2025,
    text: "No que se refere ao processo administrativo disciplinar (PAD) para apuração de infrações de servidores, o Decreto Municipal nº 462/2016 estabelece prazos prescricionais específicos. Segundo a norma, as faltas sujeitas à pena de REPREENSÃO prescrevem em:",
    options: [
      { label: "A", text: "180 dias." },
      { label: "B", text: "01 ano." },
      { label: "C", text: "02 anos." },
      { label: "D", text: "04 anos." },
    ],
    correctAnswer: "C",
    explanation: "O Decreto regulamentar do PAD em Canoas estabelece que faltas puníveis com repreensão, multa, suspensão ou destituição de função prescrevem em 02 anos. A prescrição de 4 anos aplica-se à demissão e cassação de aposentadoria. Referências: Decreto Municipal nº 462/2016, Art. 8º, § 4º, I.",
  },
  {
    id: 17, qid: "PGM-C17", topic: "Legislação da PGM", year: 2025,
    text: "Conforme a Lei de Regência da PGM (Lei nº 6.817/2025), o estágio probatório do Procurador Municipal possui regras próprias de avaliação. Sobre o Boletim de Desempenho nesse período, é correto afirmar que ele será submetido à avaliação de:",
    options: [
      { label: "A", text: "03 servidores estáveis da carreira de Procuradores e do Corregedor-Geral." },
      { label: "B", text: "02 servidores estáveis da carreira de Procuradores e do Procurador-Geral." },
      { label: "C", text: "01 Procurador estável, o Controlador-Geral e o Prefeito Municipal." },
      { label: "D", text: "Uma comissão paritária composta por 2 membros do Executivo e 2 do Legislativo." },
    ],
    correctAnswer: "B",
    explanation: "Diferente de outras carreiras que utilizam comissões maiores, a lei específica dos Procuradores define que a avaliação do estágio probatório será feita por 02 procuradores estáveis e o Procurador-Geral. Referências: Lei Municipal nº 6.817/2025, Art. 19.",
  },
  {
    id: 18, qid: "PGM-C18", topic: "Direito Previdenciário Municipal", year: 2025,
    text: "De acordo com a Lei Complementar nº 14/2025 (Previdência), o valor dos benefícios de aposentadoria será calculado utilizando-se a média aritmética simples correspondente a:",
    options: [
      { label: "A", text: "80% das maiores remunerações desde julho de 1994." },
      { label: "B", text: "90% das maiores remunerações desde julho de 1994 ou desde o início da contribuição, se posterior." },
      { label: "C", text: "100% de todo o período contributivo, sem exclusões." },
      { label: "D", text: "70% das menores remunerações, visando o equilíbrio atuarial." },
    ],
    correctAnswer: "B",
    explanation: "A reestruturação do RPPS de Canoas em 2025 definiu que a base de cálculo dos proventos será a média aritmética de 90% das maiores remunerações utilizadas como base para contribuições. Referências: LC nº 14/2025, Art. 44.",
  },
  {
    id: 19, qid: "PGM-C19", topic: "Direito Urbanístico", year: 2025,
    text: "Segundo o Plano Diretor Urbano Ambiental de Canoas (Lei nº 5.961/2015), o Município poderá exercer o Direito de Preempção. A lei municipal que delimitará as áreas de incidência deste direito fixará um prazo de vigência não superior a:",
    options: [
      { label: "A", text: "02 anos, vedada a renovação." },
      { label: "B", text: "05 anos, renovável a partir de um ano após o decurso do prazo inicial." },
      { label: "C", text: "10 anos, renovável por igual período." },
      { label: "D", text: "03 anos, podendo ser prorrogado apenas se houver interesse social." },
    ],
    correctAnswer: "B",
    explanation: "O PDUA estabelece o prazo de 05 anos para a vigência do direito de preempção em áreas delimitadas, permitindo a renovação após um ano do fim do prazo inicial. Referências: Lei nº 5.961/2015, Art. 116, § 2º.",
  },
  {
    id: 20, qid: "PGM-C20", topic: "Direito Tributário Municipal", year: 2025,
    text: "Conforme a Lei Municipal nº 4.818/2003, que disciplina o ISSQN em Canoas, a liberação do Certificado de 'Habite-se' está juridicamente condicionada ao:",
    options: [
      { label: "A", text: "Prévio pagamento do IPTU do exercício corrente." },
      { label: "B", text: "Efetivo pagamento do ISSQN relativo aos serviços prestados na obra." },
      { label: "C", text: "Protocolo do pedido de averbação no Registro de Imóveis." },
      { label: "D", text: "Pagamento antecipado de 50% da Contribuição de Melhoria prevista para o bairro." },
    ],
    correctAnswer: "B",
    explanation: "É uma regra clássica de fiscalização em Canoas: a autoridade só libera o 'Habite-se' (conclusão da obra) se houver prova do pagamento do ISSQN incidente sobre a construção. Referências: Lei nº 4.818/2003, Art. 6º, § 3º.",
  },
  {
    id: 21, qid: "PGM-C21", topic: "Direito Tributário Municipal", year: 2025,
    text: "A Lei Municipal nº 1.783/1977 (Código Tributário) institui o Conselho Municipal de Contribuintes. Sobre a composição deste órgão, assinale a alternativa CORRETA:",
    options: [
      { label: "A", text: "É constituído por 5 membros, todos representando a Fazenda Municipal." },
      { label: "B", text: "É constituído por 7 conselheiros, sendo 3 da Fazenda Municipal e 4 indicados pela Câmara." },
      { label: "C", text: "É constituído por 7 conselheiros, sendo 3 representantes da Fazenda, 3 dos contribuintes e 1 Presidente." },
      { label: "D", text: "É constituído por 9 membros, com mandato vitalício após aprovação pela OAB." },
    ],
    correctAnswer: "C",
    explanation: "O conselho é um órgão paritário entre Fisco e Contribuintes, composto por 07 membros (3 da fazenda, 3 dos contribuintes e 1 presidente). Referências: Lei nº 1.783/1977, Art. 90.",
  },
  {
    id: 22, qid: "PGM-C22", topic: "Legislação da PGM", year: 2025,
    text: "Segundo a Lei de Regência da PGM (Lei nº 6.817/2025), o Conselho Superior da Procuradoria deve apreciar e opinar sobre propostas de acordo em processos judiciais ou extrajudiciais sempre que o proveito econômico envolvido for superior a:",
    options: [
      { label: "A", text: "100 salários mínimos." },
      { label: "B", text: "500 salários mínimos." },
      { label: "C", text: "1000 (mil) salários mínimos." },
      { label: "D", text: "5000 salários mínimos." },
    ],
    correctAnswer: "C",
    explanation: "Compete ao Conselho Superior da PGM opinar sobre acordos que envolvam valores elevados, fixados pela lei em montante superior a 1000 salários mínimos. Referências: Lei nº 6.817/2025, Art. 12, II.",
  },
  {
    id: 23, qid: "PGM-C23", topic: "Legislação da PGM", year: 2025,
    text: "De acordo com a Lei Municipal nº 6.817/2025, o Procurador Municipal poderá, excepcionalmente, realizar o trabalho de forma remota (total ou parcial). Para que isso ocorra, é necessário observar:",
    options: [
      { label: "A", text: "A autorização individual e exclusiva do Prefeito Municipal por meio de Decreto." },
      { label: "B", text: "As metas e condições previamente definidas pela chefia imediata." },
      { label: "C", text: "A comprovação de que o servidor reside a mais de 50km da Prefeitura." },
      { label: "D", text: "O registro biométrico obrigatório feito por meio de aplicativo governamental." },
    ],
    correctAnswer: "B",
    explanation: "A lei autoriza o teletrabalho (preponderante) para Procuradores, desde que observadas as metas e condições definidas pela chefia imediata. Referências: Lei nº 6.817/2025, Art. 20, § 2º.",
  },
  {
    id: 24, qid: "PGM-C24", topic: "Direito Ambiental Municipal", year: 2025,
    text: "Conforme o Código Municipal de Meio Ambiente (Lei nº 4.328/1998), após a notificação da infração ambiental, o autuado poderá apresentar defesa por escrito no prazo de:",
    options: [
      { label: "A", text: "05 dias." },
      { label: "B", text: "07 dias." },
      { label: "C", text: "15 dias." },
      { label: "D", text: "10 dias úteis." },
    ],
    correctAnswer: "B",
    explanation: "No rito administrativo ambiental de Canoas, o prazo para a defesa da autuação é de 07 dias, a contar da ciência da notificação. Referências: Lei nº 4.328/1998, Art. 118.",
  },
  {
    id: 25, qid: "PGM-C25", topic: "Legislação da PGM", year: 2025,
    text: "De acordo com a Lei Municipal nº 6.817/2025 (Lei de Regência da PGM), com as alterações introduzidas pela Lei nº 6.833/2025, é considerada função EXCLUSIVA da Procuradoria-Geral do Município:",
    options: [
      { label: "A", text: "A fiscalização direta das contas de todas as entidades que recebem subvenção do Município." },
      { label: "B", text: "A representação judicial, extrajudicial e a consultoria da autarquia CANOASPREV." },
      { label: "C", text: "A instauração de ofício de inquéritos policiais para apuração de crimes tributários." },
      { label: "D", text: "A nomeação de interventores em hospitais privados que prestam serviços ao SUS." },
    ],
    correctAnswer: "B",
    explanation: "A Lei nº 6.833/2025 alterou a Lei de Regência da PGM para incluir expressamente a representação judicial, extrajudicial e a consultoria da autarquia CANOASPREV como função exclusiva da Procuradoria-Geral. Referências: Lei nº 6.817/2025, Art. 4º, IV; Art. 5º, § 4º.",
  },
  {
    id: 26, qid: "PGM-C26", topic: "Direito Tributário Municipal", year: 2025,
    text: "No âmbito do Direito Tributário, conforme o Código Tributário do Município de Canoas (Lei nº 1.783/1977, com redação atualizada), o contribuinte que iniciar atividade sujeita à licença antes da concessão desta ficará sujeito à multa de:",
    options: [
      { label: "A", text: "25 URM." },
      { label: "B", text: "50 URM." },
      { label: "C", text: "65 URM." },
      { label: "D", text: "500 URM." },
    ],
    correctAnswer: "C",
    explanation: "O Código Tributário de Canoas estabelece valores fixos em URM para infrações de obrigações acessórias. Iniciar atividade sem licença prévia enseja a aplicação de multa de exatas 65 URM. Referências: Lei nº 1.783/1977, Art. 65, I.",
  },
  {
    id: 27, qid: "PGM-C27", topic: "Direito Administrativo (PAD)", year: 2025,
    text: "Segundo o Decreto Municipal nº 462/2016, que regulamenta o Processo Administrativo Disciplinar (PAD), nos casos em que a penalidade inicialmente prevista NÃO for a de demissão, o processo poderá ser instaurado pelas seguintes autoridades, EXCETO:",
    options: [
      { label: "A", text: "Pelo Procurador-Geral do Município." },
      { label: "B", text: "Pelo Controlador-Geral do Município." },
      { label: "C", text: "Pelo Secretário Municipal, mediante delegação específica do Prefeito." },
      { label: "D", text: "Pelo Presidente da Associação dos Procuradores do Município de Canoas." },
    ],
    correctAnswer: "D",
    explanation: "O Decreto nº 462/2016 elenca as autoridades com competência para instaurar o PAD (Prefeito, PGM, Controlador e Secretários delegados). A Associação dos Procuradores, por ser entidade de classe e não órgão da estrutura administrativa, não possui poder hierárquico para instaurar procedimentos disciplinares. Referências: Decreto Municipal nº 462/2016, Art. 11-B, § 1º.",
  },
  {
    id: 28, qid: "PGM-C28", topic: "Direito Previdenciário Municipal", year: 2025,
    text: "Conforme a Lei Complementar nº 14/2025 (Previdência de Canoas), sobre o benefício de pensão por morte concedido aos dependentes de servidores falecidos após a vigência da lei, assinale a regra de cálculo CORRETA:",
    options: [
      { label: "A", text: "Será sempre equivalente a 100% da remuneração do servidor na data do óbito." },
      { label: "B", text: "Corresponderá a uma cota familiar de 60%, acrescida de cotas de 10 pontos percentuais por dependente, até o limite de 100%." },
      { label: "C", text: "Corresponderá a 80% do valor da média aritmética das contribuições de todo o período contributivo." },
      { label: "D", text: "Será vitalícia para todos os dependentes, independentemente da idade do beneficiário." },
    ],
    correctAnswer: "B",
    explanation: "Seguindo a tendência da Reforma da Previdência Federal, a nova lei de Canoas (LC 14/2025) adotou o sistema de cotas: uma cota familiar de 60% mais 10% por dependente, não podendo ultrapassar 100%. Referências: LC nº 14/2025, Art. 55.",
  },
  {
    id: 29, qid: "PGM-C29", topic: "Direito Administrativo (Estatuto)", year: 2025,
    text: "De acordo com o Estatuto dos Funcionários Públicos (Lei nº 2.214/1984, atualizada pela Lei nº 6.698/2023), o período de afastamento do servidor em virtude de luto pelo falecimento de tios, padrasto ou madrasta, considerado como de efetivo exercício, é de:",
    options: [
      { label: "A", text: "01 dia." },
      { label: "B", text: "02 dias." },
      { label: "C", text: "05 dias." },
      { label: "D", text: "08 dias." },
    ],
    correctAnswer: "B",
    explanation: "A alteração recente promovida pela Lei nº 6.698/2023 inseriu expressamente no rol de períodos considerados como de efetivo exercício o luto de até 02 dias para os casos de falecimento de tios, padrasto e madrasta. Referências: Lei nº 2.214/1984, Art. 75, V.",
  },
  {
    id: 30, qid: "PGM-C30", topic: "Legislação da PGM", year: 2025,
    text: "De acordo com a Lei Municipal nº 6.817/2025 (Lei de Regência da PGM), nas ausências e nos impedimentos do Procurador-Geral do Município, este será substituído pelo:",
    options: [
      { label: "A", text: "Procurador Municipal mais antigo na carreira." },
      { label: "B", text: "Corregedor-Geral do Município." },
      { label: "C", text: "Procurador-Geral Adjunto." },
      { label: "D", text: "Secretário Municipal de Governo." },
    ],
    correctAnswer: "C",
    explanation: "A Lei de Regência da PGM estabelece explicitamente que o Procurador-Geral Adjunto é o substituto natural do titular nas suas ausências. Referências: Lei nº 6.817/2025, Art. 6º, § 1º.",
  },
];
