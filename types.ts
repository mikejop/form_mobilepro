export interface TrackingData {
  device: {
    vendor?: string;
    model?: string;
    type?: string | null;
  };
  os: {
    name?: string;
    version?: string;
  };
  browser: {
    name?: string;
    version?: string;
  };
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  referrerInfo: {
    fullReferrer: string;
    hostname: string;
  };
  location: {
    ip?: string | null;
    city?: string | null;
    region?: string | null;
    country_name?: string | null;
    [key: string]: any;
  };
}

export interface ConditionalStates {
  // Step 2
  showParentalAuth: boolean;
  // Step 3
  showTriedLearningDetails: boolean;
  // Step 4
  showBusinessOwnerDetails: boolean;
  showEmployedDetails: boolean;
  showStudentDetails: boolean;
  showUnemployedDetails: boolean;
  showCEP: boolean;
  // Step 5
  showSocialMediaDetails: boolean;
  showExtraIncomeDetails: boolean;
  showCareerChangeDetails: boolean;
  showBusinessContentDetails: boolean;
  // Step 6
  showNewbieDetails: boolean;
  showBeginnerIntermediateDetails: boolean;
  showAdvancedDetails: boolean;
  showOldPhoneWarning: boolean;
  // Step 7
  showInvestedBeforeDetails: boolean;
  showHighInvestmentDetails: boolean;
  showLowInvestmentDetails: boolean;
  showObjectionMoney: boolean;
  showObjectionFear: boolean;
  showObjectionTriedBefore: boolean;
  showObjectionTime: boolean;
  // Step 8
  showMotivationHigh: boolean;
  showMotivationMedium: boolean;
  showMotivationLow: boolean;
  showMotivationFinancial: boolean;
  showMotivationJobHate: boolean;
  showMotivationFastResults: boolean;
  showWantsFreebies: boolean;
  showContactAllowed: boolean;
  showContactMaybe: boolean;
}

export interface FormData {
  // ETAPA 2: DADOS BÁSICOS
  firstName: string;
  lastName: string;
  email: string;
  phoneDDI?: string;
  phone?: string;
  gender: string;
  ageRange: string;
  parentalAuth?: 'Sim' | 'Não';

  // ETAPA 3: DORES E DESAFIOS
  biggestDifficulty?: string[];
  biggestFrustration?: string;
  triedLearning?: 'Sim, várias vezes' | 'Sim, uma vez' | 'Não, nunca tentei';
  whyFailed?: string[];
  whereTried?: string[];

  // ETAPA 4: TRABALHO E RENDA
  occupation?: string;
  income?: string;
  country?: string;
  otherCountry?: string;
  useCEP?: boolean;
  cep?: string;
  city?: string;
  state?: string;
  businessNiche?: string;
  businessDuration?: string;
  useVideoInBusiness?: 'Sim, regularmente' | 'Sim, às vezes' | 'Não, mas quero começar' | 'Não tenho interesse';
  relatedToContent?: 'Sim, trabalho com isso' | 'Não, mas quero migrar' | 'Não, é só interesse paralelo';
  studyArea?: 'Comunicação/Marketing/Publicidade' | 'Design/Artes' | 'Tecnologia/TI' | 'Outra área' | 'Ensino médio';
  seekingNewIncome?: 'Sim, urgentemente' | 'Sim, mas sem pressa' | 'Não, é só interesse pessoal';
  dailyAvailability?: '1-2 horas' | '3-4 horas' | '5-6 horas' | 'Dedicação integral';

  // ETAPA 5: DESEJOS E OBJETIVOS
  mainGoal?: string;
  interestedNiches?: string[];
  sixMonthGoal?: string;
  timePerWeek?: 'Menos de 3 horas' | '3-5 horas' | '5-10 horas' | 'Mais de 10 horas' | 'Dedicação integral (20h+)';
  inspirations?: string;
  audienceSize?: 'Sim, mais de 10k seguidores' | 'Sim, entre 1k-10k seguidores' | 'Sim, menos de 1k seguidores' | 'Não, vou começar do zero';
  priorityPlatform?: 'Instagram (Reels/Stories)' | 'TikTok' | 'YouTube (Shorts/Vídeos longos)' | 'LinkedIn' | 'Facebook' | 'Múltiplas plataformas';
  socialMediaGoal?: 'Crescer audiência/viralizar' | 'Vender produtos/serviços' | 'Educar/ensinar' | 'Entreter' | 'Construir autoridade';
  extraIncomeGoal?: 'R$ 500 - R$ 1.500' | 'R$ 1.500 - R$ 3.000' | 'R$ 3.000 - R$ 5.000' | 'Acima de R$ 5.000';
  monetizationMethods?: string[];
  careerChangeTimeframe?: 'Nos próximos 3 meses (urgente)' | '3-6 meses' | '6-12 meses' | 'Mais de 1 ano (sem pressa)';
  transitionReserve?: 'Sim, tenho reserva confortável' | 'Tenho um pouco' | 'Não tenho, preciso gerar renda logo';
  careerChangeWorry?: 'Instabilidade financeira' | 'Medo de não conseguir clientes' | 'Família/pessoas próximas não apoiam' | 'Idade (achar que é tarde demais)' | 'Falta de experiência' | 'Outro';
  currentMarketingSpend?: 'Não gasto nada' | 'Até R$ 500/mês' | 'R$ 500 - R$ 2.000/mês' | 'Acima de R$ 2.000/mês';
  videoCreationBenefit?: 'Economizaria dinheiro' | 'Teria mais controle criativo' | 'Produziria com mais frequência' | 'Todas as opções acima';

  // ETAPA 6: EXPERIÊNCIA E EQUIPAMENTO
  experienceLevel?: 'Nunca filmei nada' | 'Iniciante (filmo casualmente)' | 'Intermediário (já produzi alguns vídeos)' | 'Avançado (filmo regularmente)';
  interestDuration?: 'Menos de 1 mês' | '1-6 meses' | '6 meses - 1 ano' | 'Mais de 1 ano';
  phoneModel?: string;
  createdVideosBefore?: 'Sim, vários' | 'Sim, alguns' | 'Não, nunca';
  biggestTechnicalDifficulty?: 'Iluminação' | 'Áudio/som' | 'Estabilização/movimento de câmera' | 'Edição' | 'Composição/enquadramento' | 'Todas são difíceis' | 'Nenhuma, domino o básico';
  additionalEquipment?: string[];
  whatStopsYouNow?: string[];
  fearOfAppearing?: 'Sim, muita vergonha' | 'Um pouco' | 'Não, não me importo' | 'Prefiro filmar sem aparecer';
  techIntimidation?: number;
  pastVideoTypes?: string[];
  editingSoftware?: 'Nenhum' | 'InShot' | 'CapCut' | 'Adobe Premiere (mobile ou desktop)' | 'iMovie' | 'DaVinci Resolve' | 'Outro';
  whatToImproveInVideos?: 'Qualidade visual (imagem)' | 'Qualidade de áudio' | 'Edição/cortes/transições' | 'Storytelling/narrativa' | 'Engajamento/views' | 'Tudo';
  monetizedBefore?: 'Sim, é minha principal renda' | 'Sim, é renda extra' | 'Não, mas quero' | 'Não tenho interesse';
  videosPerMonth?: '1-5 vídeos' | '6-15 vídeos' | '16-30 vídeos' | 'Mais de 30 vídeos';
  evolutionBottleneck?: 'Falta de conhecimento técnico avançado' | 'Equipamento limitado' | 'Falta de criatividade/ideias' | 'Gestão de tempo/produtividade' | 'Conseguir clientes' | 'Precificação/vendas';
  specializeOrGeneralize?: 'Especializar em um nicho' | 'Ser generalista (fazer de tudo)' | 'Ainda não sei';
  willChangePhone?: 'Sim, nos próximos meses' | 'Talvez' | 'Não, vou usar o que tenho';

  // ETAPA 7: INVESTIMENTO E OBJEÇÕES
  hasInvestedBefore?: 'Sim, várias vezes' | 'Sim, uma vez' | 'Não, nunca';
  investmentWillingness?: 'Prefiro começar com gratuito' | 'Até R$ 200' | 'R$ 201 - R$ 500' | 'R$ 501 - R$ 1.000' | 'R$ 1.001 - R$ 2.000' | 'Acima de R$ 2.000' | 'Depende do que oferece';
  paymentPreference?: 'À vista (com desconto)' | 'Parcelado em até 12x' | 'Tanto faz';
  mainObjection?: 'Falta de dinheiro' | 'Falta de tempo' | 'Medo de não conseguir' | 'Não sei se vai funcionar para mim' | 'Meu celular não é bom o suficiente' | 'Já tentei antes e não deu certo' | 'Não é prioridade no momento' | 'Outra';
  learningFormat?: string[];
  courseDuration?: '4 semanas (intensivo)' | '8 semanas' | '12 semanas (3 meses)' | '6 meses' | 'Acesso vitalício no meu ritmo';
  investmentSecurity?: string[];
  totalInvested?: 'Menos de R$ 500' | 'R$ 500 - R$ 1.500' | 'R$ 1.500 - R$ 3.000' | 'R$ 3.000 - R$ 5.000' | 'Acima de R$ 5.000';
  investmentSatisfaction?: 'Sim, valeram muito a pena' | 'Parcialmente' | 'Não, me arrependo' | 'Alguns sim, outros não';
  whatLackedInCourses?: string;
  canPayInInstallments?: 'Sim, facilmente' | 'Sim, com planejamento' | 'Não, mesmo assim está difícil';
  investmentOrExpense?: 'Investimento que pode me dar retorno' | 'Gasto que talvez valha a pena' | 'Não tenho certeza';
  selfBeliefScale?: number;
  learnedDifficultThing?: 'Sim, várias coisas' | 'Sim, algumas coisas' | 'Não, sempre desisto';
  wouldTryWithSupport?: 'Sim, com certeza' | 'Provavelmente sim' | 'Ainda teria receio';
  whatWentWrong?: string;
  hadAdequateSupport?: 'Sim, tive' | 'Não, faltou suporte' | 'Tinha mas não usei';
  tryDifferentMethod?: 'Sim, daria outra chance' | 'Talvez, dependendo' | 'Não, já desisti';
  canDo15minMethod?: 'Sim, isso eu consigo' | 'Talvez, mas seria apertado' | 'Não, nem isso tenho';
  premiumValue?: 'Acompanhamento próximo e personalizado' | 'Muito conteúdo/materiais' | 'Resultados rápidos garantidos' | 'Exclusividade e acesso VIP';
  mentorshipInterest?: 'Sim, é o que procuro' | 'Talvez, depende' | 'Não, prefiro em grupo';
  freeLimitationReason?: string;

  // ETAPA 8: MOTIVAÇÃO E FECHAMENTO
  motivationScale: number;
  mainMotivationReason?: string;
  successMeaning?: string;
  resultsTimeframe?: 'Nos próximos 30 dias' | 'Em 2-3 meses' | 'Em 6 meses' | 'Em 1 ano' | 'Não tenho pressa';
  wouldStartToday?: 'Sim, começaria hoje mesmo' | 'Talvez, preciso saber mais' | 'Não, ainda não é o momento';
  biggestFear?: string;
  wantsFreeMaterials?: 'Sim, quero tudo que puder me ajudar' | 'Sim, mas sem spam' | 'Não, obrigado';
  allowContact?: 'Sim, pode entrar em contato' | 'Talvez, dependendo da proposta' | 'Não, prefiro só o material gratuito';
  contactMethod?: 'WhatsApp' | 'Ligação telefônica' | 'E-mail' | 'Instagram Direct';
  contactTime?: 'Manhã (8h-12h)' | 'Tarde (12h-18h)' | 'Noite (18h-22h)' | 'Qualquer horário';
  proposalPreference?: 'Ver proposta por mensagem primeiro' | 'Ter uma conversa rápida (15 min)' | 'Agendar reunião mais longa (30-45 min)';
  investmentLikelihood?: number;
  whatWouldMakeItYes?: 'Ver cases de sucesso' | 'Entender melhor a proposta' | 'Saber o preço exato' | 'Ter garantia de resultado' | 'Conhecer o instrutor' | 'Outro';
  preferredFreebie?: string;
  hateJobScale?: number;
  exitTimeframe?: 'Sim, quero sair em até 6 meses' | 'Sim, até 1 ano' | 'Não tenho prazo, quando der' | 'Não vou sair, só complementar renda';
  idealIncome?: 'R$ 2.000 - R$ 5.000' | 'R$ 5.000 - R$ 10.000' | 'R$ 10.000 - R$ 20.000' | 'Acima de R$ 20.000';
  incomeTimeframe?: '3-6 meses' | '6-12 meses' | '1-2 anos' | 'Sem prazo definido';
  intensiveAvailability?: 'Sim, posso me dedicar full' | 'Sim, algumas horas por dia' | 'Não muito, mas vou tentar';
  finalComments?: string;
}

export interface SurveyResponse extends Partial<FormData> {
  id: string;
  leadScore: number;
  leadType: 'hot' | 'warm' | 'cold';
  submissionDate?: Date;
  tracking?: TrackingData;
}

export interface StepProps {
  data: Partial<FormData> | Partial<SurveyResponse>;
  updateData: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onPrev?: () => void;
  errors?: Record<string, string> | null;
  conditionalStates: ConditionalStates;
  onSecretAccess?: () => void;
  onReset?: () => void;
  onApplyTemplate?: () => void;
}