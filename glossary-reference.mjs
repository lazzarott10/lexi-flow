// Termos de referência importados dos PDFs enviados em 13/11/2026.
// Cada linha: [Termo, Tratamento, Contexto].
export const referenceGlossary=[
 {
  "id": "geral",
  "title": "PT → EN (inglês corporativo)",
  "description": "Termos de referência para tradução PT → EN em SoftExpert, RH e contratos.",
  "sections": [
   {
    "title": "Regras gerais e decisões desta conversa",
    "notes": [],
    "rows": [
     [
      "Idioma / registro",
      "Traduzir tudo para inglês corporativo",
      "Pedido inicial. Base: histórico de traduções anexado (PDF: SoftExpert Suite, PLR, indicadores departamentais, aprovações, cadastros no DW)."
     ],
     [
      "Rótulos, campos e etapas de workflow",
      "Title Case, curto e direto",
      "Ex.: Approve Indicators, Verify Completion, Notify Requester."
     ],
     [
      "Frases e instruções",
      "Sentença completa, tom formal, ponto final",
      "Ex.: Complete only if the indicator will use a different target for PLR purposes."
     ],
     [
      "PLR / PLRCONTROL / PE029 / WF / DW / PMM / SoftExpert Suite",
      "Preservar siglas e nomes",
      "Também preservados nesta conversa: SAP, CRM, Pipedrive, OpenMeter, DHO, GSE, R&S, COO, BU, Senior, nomes de tabelas e campos (dyncttemptype, cttypename, idabreviation)."
     ],
     [
      "Nomes de campos entre aspas",
      "Preservar",
      "Ex.: \"PLR Target\", \"Change Details\", \"Target\"."
     ],
     [
      "Nomes próprios e marcas",
      "Não traduzir",
      "Silver Park, Uniparking, Green Park, GreenCar, Cesar, Tijucas, Brasil Cacau, Decacau, Cacau Show, Omunga, Prodent, GNC Cinemas, #CelebrateExpert."
     ],
     [
      "Registro / Indicador / Responsável",
      "Record / Indicator / Responsible",
      "Terminologia padrão do histórico."
     ],
     [
      "Reprovar / Desaprovar",
      "Reject",
      "Terminologia padrão do histórico."
     ],
     [
      "Executor / Diretoria",
      "Executor / Directorate (ou Board of Directors)",
      "Escolher conforme o contexto."
     ],
     [
      "Erros de digitação no original",
      "Corrigir silenciosamente",
      "Ex.: \"dietor\", \"nome da soluçã\"."
     ],
     [
      "Termo ambíguo",
      "Escolher a opção mais provável pelo contexto",
      "Avisar se houver alternativa relevante."
     ],
     [
      "Termo já em inglês",
      "Avisar que já está em inglês e pedir reenvio em português",
      "Caso: Description of Actions Performed, Identity document, Head of Human Resources, Celebrate Expert."
     ],
     [
      "Termo misto (PT + EN)",
      "Traduzir por completo para inglês",
      "Ex.: More info (receber) → More Info (Receive); Job request auxiliar → Auxiliary Job Request."
     ],
     [
      "Nomes de campos pedidos em PT",
      "Manter exatamente como no original",
      "Título (PT-BR), Descrição (PT-BR); seções \"Padrão para os termos\", \"Caracteres a serem evitados\", \"Padrão para a descrição\"."
     ],
     [
      "Linguagem inclusiva",
      "Evitar \"he\" / \"ele\" em perguntas de formulário",
      "Ex.: Does this person have team members?; Eligible for Rehire?"
     ],
     [
      "Lista de eventos de desconto",
      "Sem dois-pontos nas traduções; formato \"<Item> Discount\"",
      "Pedido do usuário: remover o \":\" (antes: \"Discount: X\")."
     ],
     [
      "Valores em reais",
      "R$ 80,00 → R$ 80.00",
      "Separador decimal em ponto no inglês."
     ],
     [
      "Nomes de processos",
      "Verbo primeiro, Title Case",
      "Request Purchase; Request Travel and Submit Expense Report; Request Personnel Department Service."
     ],
     [
      "Ocorrência",
      "Occurrence",
      "Usuário trocou \"Incident\" por \"Occurrence\"."
     ]
    ]
   },
   {
    "title": "Formulário de cadastro de Addon (OpenMeter)",
    "notes": [],
    "rows": [
     [
      "Chave técnica usada pelo OpenMeter para identificar a feature consumível. É a key consultada quando o front pergunta \"quanto desse addon o tenant X já consumiu?\".",
      "Traduzir → Technical key used by OpenMeter to identify the consumable feature. It is the key queried when the front end asks, \"How much of this add-on has tenant X already consumed?\"",
      ""
     ],
     [
      "Sempre true. Mudar para false esconde o addon da tela e impede novos provisionamentos no sync. Útil para descontinuar um addon sem deletar o registro (preserva histórico).",
      "Traduzir → Always true. Changing it to false hides the add-on from the screen and prevents new provisioning during sync. Useful for discontinuing an add-on without deleting the record (preserves history).",
      ""
     ],
     [
      "Nome interno/comercial do addon, aparece em logs e relatórios do OpenMeter, mas não é o que o cliente vê na tela.",
      "Traduzir → Internal/commercial name of the add-on. It appears in OpenMeter logs and reports, but it is not what the customer sees on the screen.",
      ""
     ],
     [
      "Componente do addon.",
      "Traduzir → Add-on component.",
      ""
     ],
     [
      "Os campos Título (PT-BR) e Descrição (PT-BR) correspondem a termos distintos. (mantenha o nome dos campos assim)",
      "Traduzir → The fields Título (PT-BR) and Descrição (PT-BR) correspond to distinct terms.",
      "Nomes dos campos mantidos em PT."
     ],
     [
      "Leia as seções \"Padrão para os termos\", \"Caracteres a serem evitados\" e \"Padrão para a descrição\" para garantir o correto preenchimento dos campos a seguir.",
      "Traduzir → Read the sections \"Padrão para os termos,\" \"Caracteres a serem evitados,\" and \"Padrão para a descrição\" to ensure the following fields are completed correctly.",
      "Nomes das seções mantidos em PT."
     ],
     [
      "Orientações sobre Termos",
      "Traduzir → Guidelines on Terms",
      ""
     ],
     [
      "Texto que aparece em destaque no card do addon.",
      "Traduzir → Text displayed prominently on the add-on card.",
      ""
     ],
     [
      "Descrição para a criação de Termo:",
      "Traduzir → Description for Term Creation:",
      ""
     ],
     [
      "Texto secundário no card que explica o addon ao cliente.",
      "Traduzir → Secondary text on the card that explains the add-on to the customer.",
      ""
     ],
     [
      "Identificador do meter no OpenMeter, pode ser derivado automaticamente do feature_key ou informado manualmente para reutilizar um meter já existente.",
      "Traduzir → Meter identifier in OpenMeter. It can be derived automatically from the feature_key or entered manually to reuse an existing meter.",
      ""
     ],
     [
      "Tipo de evento enviado pelo produto ao OpenMeter; pode ser derivado do feature_key ou informado manualmente quando o produto utiliza um tipo diferente.",
      "Traduzir → Type of event sent by the product to OpenMeter; it can be derived from the feature_key or entered manually when the product uses a different type.",
      ""
     ],
     [
      "Define como os eventos serão consolidados para calcular o consumo: COUNT para contar eventos ou SUM para somar valores de uma propriedade do evento.",
      "Traduzir → Defines how events will be consolidated to calculate consumption: COUNT to count events or SUM to add up values of an event property.",
      ""
     ],
     [
      "Caminho JSON da propriedade do evento que contém o valor numérico a ser somado no cálculo do consumo.",
      "Traduzir → JSON path of the event property that contains the numeric value to be summed in the consumption calculation.",
      ""
     ],
     [
      "Define o ciclo de renovação dos créditos: MONTH para renovação mensal ou YEAR para renovação anual.",
      "Traduzir → Defines the credit renewal cycle: MONTH for monthly renewal or YEAR for annual renewal.",
      ""
     ],
     [
      "Define de quanto em quanto a quantidade do addon pode ser comprada, usando um número inteiro maior ou igual a 1.",
      "Traduzir → Defines the increment in which the add-on quantity can be purchased, using a whole number greater than or equal to 1.",
      ""
     ],
     [
      "Quantidade mínima de créditos que pode ser comprada para o addon.",
      "Traduzir → Minimum quantity of credits that can be purchased for the add-on.",
      ""
     ],
     [
      "Anexe, no final do formulário, documentos contendo os detalhes da precificação.",
      "Traduzir → Attach, at the end of the form, documents containing the pricing details.",
      ""
     ],
     [
      "Versão mínima da Suite a partir da qual o addon fica disponível.",
      "Traduzir → Minimum Suite version from which the add-on becomes available.",
      ""
     ],
     [
      "Componentes da Suite necessários para que o cliente tenha acesso ao addon.",
      "Traduzir → Suite components required for the customer to have access to the add-on.",
      ""
     ],
     [
      "Apresentação (Request)",
      "Traduzir → Presentation (Request)",
      ""
     ],
     [
      "Sync com OpenMeter",
      "Traduzir → Sync with OpenMeter",
      ""
     ],
     [
      "Compra",
      "Traduzir → Purchase",
      ""
     ],
     [
      "Versionamento",
      "Traduzir → Versioning",
      ""
     ],
     [
      "Módulos Relacionados",
      "Traduzir → Related Modules",
      ""
     ],
     [
      "Detalhes da precificação",
      "Traduzir → Pricing Details",
      ""
     ],
     [
      "Documentação auxiliar",
      "Traduzir → Supporting Documentation",
      ""
     ],
     [
      "Ícone exibido no card do addon.",
      "Traduzir → Icon displayed on the add-on card.",
      ""
     ],
     [
      "Módulo relacionado",
      "Traduzir → Related Module",
      ""
     ],
     [
      "Lista dos ícones",
      "Traduzir → List of Icons",
      ""
     ]
    ]
   },
   {
    "title": "Workflows, etapas e rótulos gerais",
    "notes": [],
    "rows": [
     [
      "contas a pagar / Contas a pagar",
      "Traduzir → Accounts Payable",
      ""
     ],
     [
      "aprovador",
      "Traduzir → Approver",
      ""
     ],
     [
      "Descrição das ações realizadas",
      "Traduzir → Description of Actions Performed",
      "Já estava em inglês quando reenviado."
     ],
     [
      "Workflow de Oferta Finalizado",
      "Traduzir → Offer Workflow Finalized",
      "Primeira versão \"Workflow Offer Finalized\" corrigida (modificador antes do substantivo). Alternativa: Offer Workflow Completed."
     ],
     [
      "conclusão",
      "Traduzir → Conclusion",
      "Usuário pediu só a palavra."
     ],
     [
      "WF Reprovado",
      "Traduzir → WF Rejected",
      ""
     ],
     [
      "WF aberto pelo Diretor Comercial",
      "Traduzir → WF Opened by the Commercial Director",
      ""
     ],
     [
      "Processos cancelados",
      "Traduzir → Cancelled Processes",
      ""
     ],
     [
      "cancelados por mês",
      "Traduzir → Cancelled per Month",
      ""
     ],
     [
      "faz parte da cadeia de valor?",
      "Traduzir → Is it part of the value chain?",
      ""
     ],
     [
      "Não instanciavel",
      "Traduzir → Not Instantiable",
      ""
     ],
     [
      "Analise o material de marketing - PMC",
      "Traduzir → Analyze the Marketing Material - PMC",
      ""
     ],
     [
      "Define Atributo",
      "Traduzir → Define Attribute",
      ""
     ],
     [
      "Automação da instância do processo de PLR",
      "Traduzir → Automation of the PLR Process Instance",
      ""
     ],
     [
      "Selecionar indicadores da área para PLR",
      "Traduzir → Select Area Indicators for PLR",
      ""
     ],
     [
      "Sistema",
      "Traduzir → System",
      ""
     ],
     [
      "Cancelar",
      "Traduzir → Cancel",
      ""
     ],
     [
      "Inclusivo (OR)",
      "Traduzir → Inclusive (OR)",
      ""
     ],
     [
      "Exclusivo (XOR)",
      "Traduzir → Exclusive (XOR)",
      ""
     ],
     [
      "timerdebito",
      "Traduzir → Debit Timer",
      ""
     ],
     [
      "Temporizador",
      "Traduzir → Timer",
      ""
     ],
     [
      "Titulo02",
      "Traduzir → Title02",
      ""
     ],
     [
      "Líder",
      "Traduzir → Leader",
      ""
     ],
     [
      "Analista de comunicação",
      "Traduzir → Communications Analyst",
      ""
     ],
     [
      "Jurídico",
      "Traduzir → Legal",
      ""
     ],
     [
      "Iniciador",
      "Traduzir → Initiator",
      ""
     ],
     [
      "Recrutador",
      "Traduzir → Recruiter",
      ""
     ],
     [
      "Analista de DHO",
      "Traduzir → DHO Analyst",
      ""
     ],
     [
      "Diretor financeiro",
      "Traduzir → Chief Financial Officer",
      ""
     ],
     [
      "Head of Human Resources",
      "Já está em inglês",
      ""
     ],
     [
      "Responsável pelo centro de custos",
      "Traduzir → Cost Center Manager",
      ""
     ],
     [
      "Coordenador Administrativo",
      "Traduzir → Administrative Coordinator",
      ""
     ],
     [
      "More info (receber) 2",
      "Traduzir → More Info (Receive) 2",
      "Termo misto PT/EN."
     ],
     [
      "More info (receber)",
      "Traduzir → More Info (Receive)",
      ""
     ],
     [
      "Retornar para o iniciante (dados inconsistentes)",
      "Traduzir → Return to Initiator (Inconsistent Data)",
      ""
     ],
     [
      "Término",
      "Traduzir → End",
      ""
     ],
     [
      "Retornar",
      "Traduzir → Return",
      ""
     ],
     [
      "Seguir",
      "Traduzir → Continue",
      ""
     ],
     [
      "Prosseguir",
      "Traduzir → Proceed",
      ""
     ],
     [
      "Finalizador",
      "Traduzir → Finalizer",
      ""
     ],
     [
      "Receber",
      "Traduzir → Receive",
      ""
     ],
     [
      "Complexo",
      "Traduzir → Complex",
      ""
     ],
     [
      "verificaretorno",
      "Traduzir → Verify Return",
      ""
     ],
     [
      "Retorno (A)",
      "Traduzir → Return (A)",
      ""
     ],
     [
      "Notificar (B)",
      "Traduzir → Notify (B)",
      ""
     ],
     [
      "Link (enviar)",
      "Traduzir → Link (Send)",
      ""
     ],
     [
      "Link (receber)",
      "Traduzir → Link (Receive)",
      ""
     ],
     [
      "Arquivo",
      "Traduzir → File",
      ""
     ],
     [
      "critico",
      "Traduzir → Critical",
      ""
     ],
     [
      "Texto",
      "Traduzir → Text",
      ""
     ],
     [
      "Quantidade",
      "Traduzir → Quantity",
      ""
     ],
     [
      "Empresa",
      "Traduzir → Company",
      ""
     ],
     [
      "Alterar empresa",
      "Traduzir → Change Company",
      ""
     ],
     [
      "Horas totais",
      "Traduzir → Total Hours",
      ""
     ],
     [
      "Solicitação sem subprocesso",
      "Traduzir → Request Without Subprocess",
      ""
     ],
     [
      "Solicitação com subprocesso",
      "Traduzir → Request With Subprocess",
      ""
     ],
     [
      "Demanda realizada",
      "Traduzir → Request Completed",
      ""
     ],
     [
      "Reprovar",
      "Traduzir → Reject",
      ""
     ]
    ]
   },
   {
    "title": "Expert: desligamento, vínculo, cadastro e acessos",
    "notes": [],
    "rows": [
     [
      "Alterar dados do expert (receber)",
      "Traduzir → Change Expert Data (Receive)",
      ""
     ],
     [
      "Efetivação / troca de vínculo",
      "Traduzir → Effectuation / Relationship Change",
      "Versão curta, a pedido (antes: ... Change of Employment Relationship)."
     ],
     [
      "Será para a efetivação ou troca de vínculo?",
      "Traduzir → Will this be for effectuation or change of employment relationship?",
      ""
     ],
     [
      "Pode ser recontratado futuramente?",
      "Traduzir → Eligible for Rehire?",
      "Rótulo do campo no formulário GPE00010; versão anterior \"Can he be rehired in the future?\" evitada (pronome). Variação curta: Rehire Eligibility."
     ],
     [
      "Comunicar R&S sobre desligamento de lider",
      "Traduzir → Notify R&S of Leader Termination",
      ""
     ],
     [
      "Desativar cadastro no senior",
      "Traduzir → Deactivate Registration in Senior",
      ""
     ],
     [
      "Enviar código",
      "Traduzir → Send Code",
      ""
     ],
     [
      "Enviar questionário",
      "Traduzir → Send Questionnaire",
      ""
     ],
     [
      "Enviar questionário EN",
      "Traduzir → Send Questionnaire EN",
      ""
     ],
     [
      "Atualizar site",
      "Traduzir → Update Website",
      ""
     ],
     [
      "Atualizar site (receber)",
      "Traduzir → Update Website (Receive)",
      ""
     ],
     [
      "Solicitar rescisão de contrato (receber)",
      "Traduzir → Request Contract Termination (Receive)",
      ""
     ],
     [
      "Atualizar crm e pipedrive (receber)",
      "Traduzir → Update CRM and Pipedrive (Receive)",
      ""
     ],
     [
      "ativos",
      "Traduzir → Assets",
      ""
     ],
     [
      "tesouraria",
      "Traduzir → Treasury",
      ""
     ],
     [
      "Iniciativa do desligamento",
      "Traduzir → Termination Initiative",
      ""
     ],
     [
      "Idioma para enviar o questionário",
      "Traduzir → Language to Send the Questionnaire",
      ""
     ],
     [
      "E-mail particular",
      "Traduzir → Personal Email",
      ""
     ],
     [
      "Comentários/Pendências",
      "Traduzir → Comments/Pending Items",
      ""
     ],
     [
      "Solicitar alteração de dados",
      "Traduzir → Request Data Change",
      ""
     ],
     [
      "He has team members? (\"precisa ficar sem que pareça ELE\")",
      "Traduzir → Does this person have team members?",
      "Alternativa de RH: Does this employee have direct reports?"
     ],
     [
      "Prazo para permanecer os acessos atuais",
      "Traduzir → Deadline for Current Access to Remain Active",
      ""
     ],
     [
      "Justificativa pelo acessos temporários",
      "Traduzir → Justification for Temporary Access",
      ""
     ],
     [
      "Justificativa pela continuação de acessos",
      "Traduzir → Justification for Continued Access",
      ""
     ],
     [
      "Nome novo?",
      "Traduzir → New Name?",
      ""
     ],
     [
      "Nome novo",
      "Traduzir → New Name",
      ""
     ],
     [
      "Criar / Alterar Centro de custos",
      "Traduzir → Create/Change Cost Center",
      ""
     ],
     [
      "Funções",
      "Traduzir → Functions",
      ""
     ],
     [
      "Alterações",
      "Traduzir → Changes",
      ""
     ],
     [
      "Função já existente",
      "Traduzir → Role Already Exists",
      ""
     ],
     [
      "Nova função",
      "Traduzir → New Role",
      ""
     ],
     [
      "Nova função?",
      "Traduzir → New Role?",
      ""
     ]
    ]
   },
   {
    "title": "Entrevista de saída (questionário)",
    "notes": [],
    "rows": [
     [
      "Entrevista",
      "Traduzir → Interview",
      ""
     ],
     [
      "Qual fator foi decisivo para motivar sua saída?",
      "Traduzir → What factor was decisive in motivating your departure?",
      ""
     ],
     [
      "A empresa poderia ter feito algo para evitar sua saída?",
      "Traduzir → Could the company have done something to prevent your departure?",
      ""
     ],
     [
      "Gostaria de comentar para qual empresa está indo?",
      "Traduzir → Would you like to share which company you're going to?",
      ""
     ],
     [
      "Detalhes da empresa",
      "Traduzir → Company Details",
      ""
     ],
     [
      "Em uma escala de 0 a 10, qual a nota você atribuiria para o ambiente organizacional da SoftExpert:",
      "Traduzir → On a scale of 0 to 10, what score would you give to SoftExpert's organizational environment:",
      ""
     ],
     [
      "Comente a nota da questão anterior",
      "Traduzir → Comment on the Score from the Previous Question",
      "Usado duas vezes (ambiente e desenvolvimento)."
     ],
     [
      "O que você pode nos contar de positivo sobre sua experiência conosco?",
      "Traduzir → What positive feedback can you share about your experience with us?",
      ""
     ],
     [
      "O que você pode nos contar sobre pontos acha que podem ser melhorados na empresa?",
      "Traduzir → What can you tell us about points you think could be improved in the company?",
      ""
     ],
     [
      "Em uma escala de 0 a 10, o quanto você acredita ter recebido oportunidades suficientes de desenvolvimento profissional na SoftExpert:",
      "Traduzir → On a scale of 0 to 10, how much do you believe you received sufficient opportunities for professional development at SoftExpert:",
      ""
     ],
     [
      "Na sua opinião, acredita que a empresa oferece reconhecimento profissional?",
      "Traduzir → In your opinion, do you believe the company offers professional recognition?",
      ""
     ],
     [
      "Detalhes - Na sua opinião, acredita que a empresa oferece reconhecimento profissional?",
      "Traduzir → Details - In Your Opinion, Do You Believe the Company Offers Professional Recognition?",
      ""
     ],
     [
      "Você recebia da sua liderança feedbacks sobre a sua evolução e desempenho?",
      "Traduzir → Did you receive feedback from your leadership about your evolution and performance?",
      ""
     ],
     [
      "Detalhes - Você recebia da sua liderança feedbacks sobre a sua evolução e desempenho?",
      "Traduzir → Details - Did You Receive Feedback from Your Leadership About Your Evolution and Performance?",
      ""
     ],
     [
      "Você recebia orientação e suporte necessário quanto as metas e objetivos atribuídos a você?",
      "Traduzir → Did you receive the necessary guidance and support regarding the goals and objectives assigned to you?",
      ""
     ],
     [
      "Detalhes - Você recebia orientação e suporte necessário quanto as metas e objetivos atribuídos a você? Comente",
      "Traduzir → Details - Did You Receive the Necessary Guidance and Support Regarding the Goals and Objectives Assigned to You? Please Comment",
      ""
     ],
     [
      "Qual é a probabilidade de você nos recomendar a um amigo ou a um colega?",
      "Traduzir → How likely are you to recommend us to a friend or colleague?",
      ""
     ],
     [
      "Resumo para liderança",
      "Traduzir → Summary for Leadership",
      ""
     ]
    ]
   },
   {
    "title": "Benefícios, onboarding e solicitações com desconto em folha",
    "notes": [],
    "rows": [
     [
      "Mochila Expert: R$ 80,00",
      "Traduzir → Expert Backpack: R$ 80.00",
      ""
     ],
     [
      "Uniforme Padrão Onboarding: R$ 13,00",
      "Traduzir → Standard Onboarding Uniform: R$ 13.00",
      ""
     ],
     [
      "Confirma entrega de itens/quantidade conforme chamado",
      "Traduzir → Confirms Delivery of Items/Quantity as per Ticket",
      ""
     ],
     [
      "Identity document",
      "Já está em inglês",
      ""
     ],
     [
      "Estacionamento",
      "Traduzir → Parking",
      ""
     ],
     [
      "O ingresso é digital e pode ser utilizado para compra online. | O ingresso é enviado pelo RH através do próprio workflow e você recebe no seu e-mail | Mais informações, consultar Portal do Expert Brasil - Convênios.",
      "Traduzir → The ticket is digital and can be used for online purchases. | The ticket is sent by HR through the workflow itself, and you will receive it by email. | For more information, check the Expert Brazil Portal - Partnerships.",
      ""
     ],
     [
      "Ingressos GNC Cinemas",
      "Traduzir → GNC Cinemas Tickets",
      ""
     ],
     [
      "Numeração digital do ingresso:",
      "Traduzir → Digital Ticket Number:",
      ""
     ],
     [
      "Vales de transporte",
      "Traduzir → Transportation Vouchers",
      ""
     ],
     [
      "Competência",
      "Depende do contexto → Reference Period (folha) ou Competency (habilidades)",
      "Reference Period: mês/período de competência em RH e folha. Competency: habilidades profissionais."
     ],
     [
      "Deseja abonar até 1/3 das suas férias?",
      "Traduzir → Would you like to sell up to 1/3 of your vacation days?",
      ""
     ],
     [
      "Deseja receber adiantamento de 13º salário?",
      "Traduzir → Would you like to receive an advance on your 13th salary?",
      ""
     ],
     [
      "Solicitações com desconto em folha",
      "Traduzir → Requests with Payroll Deduction",
      ""
     ],
     [
      "Envio de ingressos",
      "Traduzir → Ticket Delivery",
      ""
     ],
     [
      "Celebrate Expert",
      "Já está em inglês",
      ""
     ]
    ]
   },
   {
    "title": "Recrutamento, vagas e aprovações",
    "notes": [],
    "rows": [
     [
      "WF aberto por diretor?",
      "Traduzir → WF Opened by a Director?",
      ""
     ],
     [
      "WF aberto por diretor",
      "Traduzir → WF Opened by a Director",
      ""
     ],
     [
      "Define aprovador",
      "Traduzir → Define Approver",
      ""
     ],
     [
      "Aprovar COO - BU",
      "Traduzir → Approve COO - BU",
      ""
     ],
     [
      "Aprovar solicitação de emprego",
      "Traduzir → Approve Job Request",
      ""
     ],
     [
      "Substituição",
      "Traduzir → Replacement",
      ""
     ],
     [
      "Aprovar orçamento",
      "Traduzir → Approve Budget",
      "Orçamento: Budget (planejamento) / quote (proposta comercial), conforme contexto."
     ],
     [
      "Recrutar Expert",
      "Traduzir → Recruit Expert",
      ""
     ],
     [
      "Alteração de dados da vaga",
      "Traduzir → Job Opening Data Change",
      ""
     ],
     [
      "Selecionar vaga",
      "Traduzir → Select Job Opening",
      ""
     ],
     [
      "Nome do candidato",
      "Traduzir → Candidate Name",
      ""
     ],
     [
      "Data de inicío",
      "Traduzir → Start Date",
      ""
     ],
     [
      "Candidato iniciará de fato?",
      "Traduzir → Will the Candidate Actually Start?",
      ""
     ],
     [
      "Job request auxiliar",
      "Traduzir → Auxiliary Job Request",
      "Termo misto PT/EN."
     ]
    ]
   },
   {
    "title": "Tratar Denúncia: medidas disciplinares (processo CO003)",
    "notes": [],
    "rows": [
     [
      "Canal de Denúncias",
      "Traduzir → Whistleblower Channel",
      ""
     ],
     [
      "Não instaurar",
      "Traduzir → Do Not Establish",
      "Rótulo do ramo após \"Analyze and Treat Demand\" que leva direto ao Closure. Decisão do usuário."
     ],
     [
      "Preparar medida disciplinar",
      "Traduzir → Prepare Disciplinary Action",
      ""
     ],
     [
      "Notificar líder",
      "Traduzir → Notify Leader",
      ""
     ],
     [
      "Aplicar medida disciplinar",
      "Traduzir → Apply Disciplinary Action",
      ""
     ],
     [
      "Registrar medida na ficha do expert",
      "Traduzir → Record Action in the Expert's File",
      ""
     ],
     [
      "Ocorrência - Relação de Pessoas Sujeitas a Medidas Disciplinares",
      "Traduzir → Occurrence – List of Individuals Subject to Disciplinary Action",
      "\"Ocorrência\" = Occurrence (decisão do usuário)."
     ],
     [
      "Muy grave",
      "Traduzir → Very Serious",
      "Escala de gravidade (ES → EN)."
     ],
     [
      "Grave",
      "Traduzir → Serious",
      ""
     ],
     [
      "Poco grave",
      "Traduzir → Minor",
      ""
     ],
     [
      "Acidental",
      "Traduzir → Accidental",
      ""
     ],
     [
      "Intencional / Maliciosa",
      "Traduzir → Intentional / Malicious",
      ""
     ],
     [
      "Advertência Escrita",
      "Traduzir → Written Warning",
      ""
     ],
     [
      "Amonestación verbal",
      "Traduzir → Verbal Warning",
      "ES → EN."
     ],
     [
      "Suspensão Temporária",
      "Traduzir → Temporary Suspension",
      ""
     ],
     [
      "Rescisão de Contrato de Trabalho por Justa Causa",
      "Traduzir → Termination of Employment Contract for Cause",
      ""
     ],
     [
      "Data de aplicação da medida",
      "Traduzir → Date Action Was Applied",
      ""
     ],
     [
      "Describa cómo se aplicó la medida",
      "Traduzir → Describe How the Action Was Applied",
      "ES → EN."
     ]
    ]
   },
   {
    "title": "Departamento Pessoal, férias e nomes de processos",
    "notes": [],
    "rows": [
     [
      "Solicitar viagem e Prestar contas (nome de processo)",
      "Traduzir → Request Travel and Submit Expense Report",
      ""
     ],
     [
      "Solicitar compra (nome de processo)",
      "Traduzir → Request Purchase",
      ""
     ],
     [
      "Solicitar serviço de Departamento Pessoal",
      "Traduzir → Request Personnel Department Service",
      ""
     ],
     [
      "Outros serviços",
      "Traduzir → Other Services",
      ""
     ],
     [
      "Férias",
      "Traduzir → Vacation",
      ""
     ],
     [
      "Férias não aprovadas",
      "Traduzir → Vacation Not Approved",
      ""
     ],
     [
      "Ferias aprovadas?",
      "Traduzir → Vacation Approved?",
      ""
     ],
     [
      "Férias/ Solicitação reprovadas",
      "Traduzir → Vacation / Request Rejected",
      ""
     ],
     [
      "Notificar DP",
      "Traduzir → Notify Personnel Department",
      "DP = Departamento Pessoal (não mantida a sigla)."
     ],
     [
      "Solicitar análise jurídica",
      "Traduzir → Request Legal Review",
      ""
     ]
    ]
   },
   {
    "title": "Formulário de Contratos (checklist)",
    "notes": [],
    "rows": [
     [
      "FORMULÁRIO CONTRATOS",
      "Traduzir → CONTRACTS FORM",
      ""
     ],
     [
      "Existe workflow de venda (SSO)? Há formalização do aceite pelo cliente? Se não, descrever motivo.",
      "Traduzir → Is there a sales workflow (SSO)? Is there formal acceptance by the customer? If not, describe the reason.",
      ""
     ],
     [
      "Condição de Pagamento está de acordo com Proposta Comercial (Valores, produtos, parcelamentos)?",
      "Traduzir → Does the Payment Term comply with the Commercial Proposal (Amounts, Products, Installments)?",
      ""
     ],
     [
      "Contrato estabelece alguma obrigação acessória referente ao faturamento (retenções, prazos, necessidade de acessar portais)?",
      "Traduzir → Does the contract establish any ancillary obligations regarding invoicing (withholdings, deadlines, need to access portals)?",
      ""
     ],
     [
      "Se sim, foi alinhado com a área financeira?",
      "Traduzir → If so, was it aligned with the Finance department?",
      "Enviado duas vezes."
     ],
     [
      "Contrato estabelece obrigação de contratar seguro garantia?",
      "Traduzir → Does the contract establish an obligation to take out surety insurance?",
      ""
     ],
     [
      "Se sim, foi contratado?",
      "Traduzir → If so, has it been taken out?",
      ""
     ]
    ]
   },
   {
    "title": "Cadastro técnico (tabelas e SAP)",
    "notes": [],
    "rows": [
     [
      "Valor cadastrado na tabela dyncttemptype, campo cttypename. Valor utilizado para registrar o tipo de contrato no formulário Customer e afins.",
      "Traduzir → Value stored in the dyncttemptype table, field cttypename. Value used to record the contract type in the Customer form and similar forms.",
      "Tabela, campo e nome do formulário preservados."
     ],
     [
      "Valor cadastrado na tabela dyncttemptype, campo idabreviation. Valor utilizado para registrar o tipo de contrato no formulário Customer e afins.",
      "Traduzir → Value stored in the dyncttemptype table, field idabreviation. Value used to record the contract type in the Customer form and similar forms.",
      ""
     ],
     [
      "Valor cadastrado no SAP para registro e faturamento do produto.",
      "Traduzir → Value stored in SAP for product registration and billing.",
      ""
     ]
    ]
   },
   {
    "title": "Eventos de desconto (PT → EN / ES)",
    "notes": [],
    "rows": [
     [
      "Desconto compras Feiras Chocolate Brasil Cacau",
      "EN: Brasil Cacau Chocolate Fair Purchases Discount",
      "ES: Descuento Compras en Ferias de Chocolate Brasil Cacau"
     ],
     [
      "Desconto Pagamentos Indevidos",
      "EN: Improper Payments Discount",
      "ES: Descuento Pagos Indebidos"
     ],
     [
      "Mensalidade Estacionamento Silver Park",
      "EN: Silver Park Parking Monthly Fee",
      "ES: Cuota Mensual de Estacionamiento Silver Park"
     ],
     [
      "Mensalidade Estacionamento Uniparking",
      "EN: Uniparking Parking Monthly Fee",
      "ES: Cuota Mensual de Estacionamiento Uniparking"
     ],
     [
      "Mensalidade Estacionamento Green Park",
      "EN: Green Park Parking Monthly Fee",
      "ES: Cuota Mensual de Estacionamiento Green Park"
     ],
     [
      "Desconto Lavação GreenCar",
      "EN: GreenCar Car Wash Discount",
      "ES: Descuento Lavado GreenCar"
     ],
     [
      "Desconto Ligações Telefônicas",
      "EN: Phone Calls Discount",
      "ES: Descuento Llamadas Telefónicas"
     ],
     [
      "Desconto Eventos GSE (2)",
      "EN: GSE Events Discount (2)",
      "ES: Descuento Eventos GSE (2)"
     ],
     [
      "Desconto Compras Brindes",
      "EN: Promotional Items Purchases Discount",
      "ES: Descuento Compras de Artículos Promocionales"
     ],
     [
      "Desconto Outras Despesas Administrativas",
      "EN: Other Administrative Expenses Discount",
      "ES: Descuento Otros Gastos Administrativos"
     ],
     [
      "Desconto Eventos Softexpert",
      "EN: SoftExpert Events Discount",
      "ES: Descuento Eventos SoftExpert"
     ],
     [
      "Desc Reparo Equipamentos",
      "EN: Equipment Repair Discount",
      "ES: Descuento Reparación de Equipos"
     ],
     [
      "Desconto Eventos GSE (esportes)",
      "EN: GSE Events Discount (Sports)",
      "ES: Descuento Eventos GSE (Deportes)"
     ],
     [
      "Desconto Lavação Cesar",
      "EN: Cesar Car Wash Discount",
      "ES: Descuento Lavado Cesar"
     ],
     [
      "Desconto Dif #CelebrateExpert",
      "EN: #CelebrateExpert Difference Discount",
      "ES: Descuento Diferencia #CelebrateExpert"
     ],
     [
      "Desconto Ações Sociais",
      "EN: Social Actions Discount",
      "ES: Descuento Acciones Sociales"
     ],
     [
      "Desconto Eventos GSE Parcelados",
      "EN: GSE Events Discount (Installments)",
      "ES: Descuento Eventos GSE (Cuotas)"
     ],
     [
      "Desconto compras Feiras Chocolate Decacau",
      "EN: Decacau Chocolate Fair Purchases Discount",
      "ES: Descuento Compras en Ferias de Chocolate Decacau"
     ],
     [
      "Mensalidade GSE",
      "EN: GSE Monthly Fee",
      "ES: Cuota Mensual GSE"
     ],
     [
      "Desconto aquisições produtos Omunga",
      "EN: Omunga Product Purchases Discount",
      "ES: Descuento Compras de Productos Omunga"
     ],
     [
      "Desconto aquisição Uniformes/Mochila",
      "EN: Uniform/Backpack Purchase Discount",
      "ES: Descuento Compra de Uniformes/Mochila"
     ],
     [
      "Desconto aquisição Campanha Vacinação",
      "EN: Vaccination Campaign Purchase Discount",
      "ES: Descuento Compra Campaña de Vacunación"
     ],
     [
      "Desconto Aquisição Ingressos GNC Cinemas",
      "EN: GNC Cinemas Ticket Purchase Discount",
      "ES: Descuento Compra de Entradas GNC Cinemas"
     ],
     [
      "Desconto Treinamentos DHO (feiras/congressos/cursos)",
      "EN: DHO Training Discount (Fairs/Conferences/Courses)",
      "ES: Descuento Capacitaciones DHO (Ferias/Congresos/Cursos)"
     ],
     [
      "Desconto compras Encomendas Chocolate Brasil Cacau",
      "EN: Brasil Cacau Chocolate Orders Purchases Discount",
      "ES: Descuento Compras de Pedidos de Chocolate Brasil Cacau"
     ],
     [
      "Descontos Diversos",
      "EN: Miscellaneous Discounts",
      "ES: Descuentos Varios"
     ],
     [
      "Desconto compras Feiras Cacau Show",
      "EN: Cacau Show Fair Purchases Discount",
      "ES: Descuento Compras en Ferias Cacau Show"
     ],
     [
      "Mensalidade Plano Odontológico - Prodent",
      "EN: Prodent Dental Plan Monthly Fee",
      "ES: Cuota Mensual Plan Odontológico - Prodent"
     ],
     [
      "Desconto Despesas de viagem excedidas",
      "EN: Exceeded Travel Expenses Discount",
      "ES: Descuento Gastos de Viaje Excedidos"
     ],
     [
      "Desconto Multas de Transito",
      "EN: Traffic Fines Discount",
      "ES: Descuento Multas de Tránsito"
     ],
     [
      "Desconto Eventos SoftExpert",
      "EN: SoftExpert Events Discount",
      "ES: Descuento Eventos SoftExpert"
     ],
     [
      "Desconto Lavação Tijucas",
      "EN: Tijucas Car Wash Discount",
      "ES: Descuento Lavado Tijucas"
     ],
     [
      "Descontos Adiantamentos extras (avulsos)",
      "EN: Extra Advances Discount (One-Off)",
      "ES: Descuento Anticipos Extras (Puntuales)"
     ],
     [
      "Desconto Aquisição Imobilizado",
      "EN: Fixed Asset Acquisition Discount",
      "ES: Descuento Adquisición de Activo Fijo"
     ]
    ]
   },
   {
    "title": "Outros assuntos tratados",
    "notes": [],
    "rows": [
     [
      "Consulta SQL (campo de consulta SoftExpert) com :idioma",
      "Não é possível omitir a coluna nmeventtrad",
      "Query estática sempre devolve as mesmas colunas; o CASE já devolve NULL quando :idioma não é 1 nem 3. Para \"esconder\", usar regra de visibilidade no formulário/grid."
     ],
     [
      "Planilha de eventos de desconto",
      "Gerada em XLSX (34 itens, PT / English / Español)",
      "Arquivo: traducoes_eventos_desconto.xlsx."
     ]
    ]
   }
  ]
 },
 {
  "id": "es",
  "title": "PT/EN → ES (espanhol corporativo)",
  "description": "Termos de referência para tradução PT/EN → ES, neutro e adequado ao México.",
  "sections": [
   {
    "title": "Como responder",
    "notes": [
     "Responder só com a tradução em espanhol corporativo (neutro, adequado ao México; tratamento formal “usted” em questionários, “tú” em mensagens entre colegas).",
     "Dúvidas, ambiguidades e observações em português, em uma linha curta após a tradução, começando com “Dúvida:”.",
     "Quando o usuário decide um termo, aplicar sempre dali em diante. Se o texto já estiver em espanhol, repetir igual.",
     "Avisos entre ** ... ** mantêm os asteriscos e terminam com ponto final.",
     "Rótulos de botão/ação usam infinitivo (Agregar, Eliminar, Aprobar, Enviar). Sufixos “(Send)/(Receive)/(enviar)/(receber)” viram “(enviar)/(recibir)”.",
     "Identificadores com underscore ou tudo junto: traduzir só as palavras e manter o formato (ex.: director_approved? → director_aprobado?; requestanalysed → solicitudanalizada; verifyreturn → verificarretorno). Nome técnico claramente fixo fica sem tradução (OID Fake, dyncttemptype, cttypename, feature_key).",
     "Prefixos de campo: NM = Nombre, NR = Número, ID = Identificador, VL = Valor, TP = Tipo."
    ],
    "rows": []
   },
   {
    "title": "1. Preservar sem traduzir",
    "notes": [],
    "rows": [
     [
      "BU, PLR, DTM, PMC, DHO, CC, COO, CFO, CRM, SAP, OHD, R&S, WF, FI002",
      "Preservar sigla",
      "DHO = Desenvolvimento Humano e Organizacional (a empresa usa abreviado). WF = workflow (ex.: WF Rechazado, WF abierto por el Director Comercial). CFO e COO: ver pendências."
     ],
     [
      "OR, XOR, AUX, OID, PIX",
      "Preservar sigla",
      "Inclusivo (OR), Exclusivo (XOR); AUX em nomes de campo (Nombre tipo de gasto AUX); PIX é o sistema de pagamento brasileiro."
     ],
     [
      "workflow",
      "Preservar",
      "Todos usam o termo workflow."
     ],
     [
      "Store, Cloud, Expert, Job, Legal (setor), add-on",
      "Preservar",
      "Store = nome de setor. Cloud mantido. Expert = como a empresa chama o colaborador (Reclutar Expert, Mochila Expert, Portal del Expert Brasil). Job mantido (Abrir solicitud de Job). Add-on mantido."
     ],
     [
      "OpenMeter, front end, tenant, meter, feature_key, COUNT, SUM, MONTH, YEAR",
      "Preservar",
      "Termos técnicos e valores fixos de sistema (campos de seleção). Não traduzir valores fixos."
     ],
     [
      "SoftExpert, SE Suite, Teams, Pipedrive, Kanban, Customer (nome do formulário)",
      "Preservar nomes",
      "Customer só fica em inglês quando for o nome do formulário; em frase comum, usar “cliente” (Análisis del borrador del cliente)."
     ],
     [
      "Gateway, gtwy, end_xor",
      "Preservar",
      "Termos de modelagem de processo. Pendente confirmar end_xor."
     ],
     [
      "R$, BRL, USD, nomes de tabela/campo",
      "Preservar",
      "Manter valores no formato original (R$ 80,00)."
     ]
    ]
   },
   {
    "title": "2. Termos decididos pelo usuário",
    "notes": [],
    "rows": [
     [
      "Role",
      "Cargo",
      "Sempre refere-se ao cargo da pessoa."
     ],
     [
      "Receipt",
      "Recibo",
      "Não usar “Comprobante” para Receipt (Proof of reimbursement transfer = Comprobante de transferencia del reembolso)."
     ],
     [
      "Return",
      "Depende do sentido",
      "Retorno de viagem = Regreso; devolver solicitação/botão = Devolver (Devolver al solicitante); retorno técnico de etapa = retorno."
     ],
     [
      "Caixa (box no formulário)",
      "Recuadro",
      "Organização visual do formulário."
     ],
     [
      "Partner (parceria)",
      "aliado",
      "Datos de facturación del cliente / aliado."
     ],
     [
      "Payment slip",
      "boleta de pago",
      "Número de la boleta de pago. Boleto fica para passagens (Boleto de avión, de autobús)."
     ],
     [
      "Link (enviar) / Link (receber)",
      "Enlace (enviar) / Enlace (recibir)",
      "Ambos no infinitivo."
     ],
     [
      "Extract / Extract data from receipt",
      "Extracción / Extraer datos del recibo",
      "Extract como rótulo = Extracción."
     ],
     [
      "Data",
      "Datos / Fecha",
      "“Data (de dados)” = Datos; “Data (de date)” = Fecha."
     ],
     [
      "Justa causa",
      "causa justa",
      "Terminación del contrato de trabajo por causa justa."
     ],
     [
      "Agreement",
      "Contrato",
      "Contrato de licenciamiento y soporte; Contrato de confidencialidad."
     ],
     [
      "Parcelamento",
      "cuotas",
      "Forma mais natural."
     ],
     [
      "Notify desl",
      "Notificar desvinculación",
      "Sempre."
     ],
     [
      "Candidato iniciará de fato?",
      "¿El candidato ingresará efectivamente?",
      "Fixo."
     ],
     [
      "Título / Titulo / Title02",
      "Título / Título02",
      "Com acento; Title02 vira Título02."
     ],
     [
      "Reprovado (WF) / Reject / Reprovar",
      "WF Rechazado / Rechazar",
      "Para WF usar Rechazado."
     ],
     [
      "Approve / Aprovar; “Aprova” (rótulo)",
      "Aprobar; Aprueba",
      "Aprova como rótulo = Aprueba."
     ],
     [
      "Pricing Details",
      "Detalles de precios",
      "Fixo."
     ],
     [
      "Orientações sobre Termos / Guidelines on Terms",
      "Pautas sobre los términos",
      "Fixo."
     ],
     [
      "Add-on, Add",
      "Agregar (verbo)",
      "Também: Delete/Excluir = Eliminar."
     ]
    ]
   },
   {
    "title": "3. Glossário base (do histórico e da sessão)",
    "notes": [],
    "rows": [
     [
      "Scorecard",
      "cuadro de mando",
      "Meta, peso mínimo, plan de acción, plazo (deadline), Responsable principal."
     ],
     [
      "Compliance / Cumprimento",
      "Cumplimiento",
      "Canal de denuncias para Whistleblower Channel (pendente)."
     ],
     [
      "Feedback",
      "retroalimentación",
      "Calificación de la retroalimentación."
     ],
     [
      "Reimbursement / Advance payment",
      "Reembolso / Anticipo",
      "Monto solicitado, Monto total, Monto disponible, Monto convertido a BRL/USD."
     ],
     [
      "Exchange rate / Taxa de câmbio",
      "Tipo de cambio",
      "Fecha de cambio; Moneda de pago / Moneda utilizada."
     ],
     [
      "Traveler / Reservations / Supplier",
      "Viajero / Reservas / Proveedor",
      "Solicitud de viaje; Informe de gastos; Boletos (passagens) de avión, autobús, tren; Alquiler de vehículo."
     ],
     [
      "Termination / Rescisão",
      "terminación",
      "Iniciativa de terminación; Solicitar terminación del contrato."
     ],
     [
      "Advertência escrita / verbal",
      "Amonestación escrita / verbal",
      "Suspensión temporal; Muy grave / Grave / Poco grave."
     ],
     [
      "Urgência / High, Medium, Low",
      "Urgencia / Alta, Media, Baja",
      "Matriz GUT: Gravedad, Urgencia, Tendencia."
     ],
     [
      "Addendum / Service rendering",
      "Adenda / Prestación de servicios",
      "Contratos."
     ],
     [
      "Approver / Initiator / Recruiter",
      "Aprobador / Iniciador / Reclutador",
      "Cost Center Manager = Gerente de centro de costos; Project manager = Gerente de proyecto."
     ],
     [
      "Chief Financial / Operation Officer; Head of HR",
      "Director Financiero (CFO); Director de Operaciones (COO); Head de Recursos Humanos",
      "Depende do contexto (ver seção 4)."
     ],
     [
      "Ingresso (cinema)",
      "boleto",
      "Ingressos GNC Cinemas = Boletos de GNC Cinemas. Portal del Expert Brasil - Convenios."
     ],
     [
      "13º salário / abono de férias",
      "aguinaldo (13.º salario) / convertir en efectivo hasta 1/3 de vacaciones",
      "Depende do contexto (ver seção 4)."
     ]
    ]
   },
   {
    "title": "4. Termos que dependem do contexto",
    "notes": [],
    "rows": [
     [
      "Board",
      "Depende do contexto",
      "Junta pode soar como “reunião”; alternativas: Dirección, Directorio. Avaliar pelo uso no formulário."
     ],
     [
      "Gold / Platinum / Standard",
      "Depende do contexto",
      "Níveis de classificação: manter em inglês ou traduzir (Oro, Platino, Estándar), conforme o uso."
     ],
     [
      "Head of Human Resources",
      "Depende do contexto",
      "Head de Recursos Humanos, Jefe de Recursos Humanos ou Director de Recursos Humanos."
     ],
     [
      "CFO / COO",
      "Depende do contexto",
      "Director Financiero (CFO) / Director de Operaciones (COO), ou só a sigla (como em “Approve COO - BU”)."
     ],
     [
      "Whistleblower Channel",
      "Depende do contexto",
      "Canal de denuncias ou manter em inglês."
     ],
     [
      "Approve/Request Legal Analysis",
      "Depende do contexto",
      "análisis jurídico, ou análisis Legal se Legal for nome de setor."
     ],
     [
      "Start / End; Finalizador; Accidental; Sponsor; Registration; Boletos vs Entradas; end_xor",
      "Depende do contexto",
      "Start/End: Inicio/Fin (substantivo) ou Iniciar/Finalizar (botão). Registration: Matrícula (colaborador) ou Registro. Sponsor: Patrocinador ou manter. Boletos/Entradas para ingressos. end_xor: manter ou fin_xor."
     ],
     [
      "Abono de férias / 13º salário",
      "Depende do contexto",
      "convertir en efectivo hasta 1/3 de vacaciones; aguinaldo (13.º salario). Se houver dúvida, perguntar em português."
     ]
    ]
   }
  ]
 }
];
