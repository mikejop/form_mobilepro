
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, StepProps, ConditionalStates, SurveyResponse } from './types';
import { 
    AnimatedButton, NeumorphicContainer
} from './components';
import { ChevronLeftIcon, ChevronRightIcon, SpinnerIcon } from './components';
import {
    Step1_Welcome,
    Step2_BasicData,
    Step3_PainsAndChallenges,
    Step4_WorkAndIncome,
    Step5_GoalsAndDesires,
    Step6_ExperienceAndEquipment,
    Step7_InvestmentAndObjections,
    Step8_MotivationAndClosing,
    Step9_SummaryAndSubmit,
    SuccessScreen
} from './steps';
import { LoginModal, AdminDashboard } from './Admin';
import { db, auth, isFirebaseConfigIncomplete } from './firebase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { mapFormDataToLead } from './utils/dataStructure';
import { validateStep } from './utils/validation';
import { initializeGA, trackPageView } from './analytics';
import { getTrackingData } from './utils/tracking';
import { removeUndefined } from './utils/helpers';
import { NewPassword } from './auth/NewPassword';


// Helper for conditional class names
const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- TEMPLATE DATA ---
const templateData: Partial<FormData> = {
  // ETAPA 2: DADOS BÁSICOS
  firstName: 'Ana',
  lastName: 'Exemplo',
  email: 'ana.exemplo@teste.com',
  phoneDDI: '+55',
  phone: '(48) 99988-7766',
  gender: 'Feminino',
  ageRange: '25-34',
  
  // ETAPA 3: DORES E DESAFIOS
  biggestDifficulty: ['Não sei por onde começar', 'Vídeos ficam com qualidade ruim', 'Insegurança em mostrar meu trabalho'],
  biggestFrustration: 'Não consigo fazer meus vídeos parecerem profissionais como os que vejo online.',
  triedLearning: 'Sim, uma vez',
  whyFailed: ['Conteúdo muito técnico/complicado', 'Perdi a motivação no meio'],
  whereTried: ['YouTube gratuito', 'Sozinho (tentativa e erro)'],

  // ETAPA 4: TRABALHO E RENDA
  occupation: 'Freelancer/Autônomo',
  income: 'R$ 4.001 - R$ 7.000',
  country: 'Brasil',
  useCEP: true,
  cep: '88015-420',
  city: 'Florianópolis',
  state: 'SC',
  businessNiche: 'Social Media para pequenos negócios',
  businessDuration: '1-3 anos',
  useVideoInBusiness: 'Sim, às vezes',

  // ETAPA 5: DESEJOS E OBJETIVOS
  mainGoal: 'Gerar renda extra',
  interestedNiches: ['Marketing digital/Publicidade', 'Moda/Lifestyle'],
  sixMonthGoal: 'Conseguir 3 clientes fixos para gerenciamento de redes sociais com foco em vídeo.',
  timePerWeek: '5-10 horas',
  inspirations: 'Pedro Sobral, Ícaro de Carvalho',
  currentMarketingSpend: 'Até R$ 500/mês',
  videoCreationBenefit: 'Todas as opções acima',
  extraIncomeGoal: 'R$ 1.500 - R$ 3.000',
  monetizationMethods: ['Prestar serviço de filmagem (eventos, comerciais)'],

  // ETAPA 6: EXPERIÊNCIA E EQUIPAMENTO
  experienceLevel: 'Iniciante (filmo casualmente)',
  interestDuration: '1-6 meses',
  phoneModel: 'iPhone 12',
  createdVideosBefore: 'Sim, alguns',
  biggestTechnicalDifficulty: 'Iluminação',
  additionalEquipment: ['Tripé/suporte'],
  whatStopsYouNow: ['Vergonha/insegurança'],
  fearOfAppearing: 'Um pouco',
  techIntimidation: 4,
  pastVideoTypes: ['Conteúdo para redes sociais'],
  editingSoftware: 'CapCut',
  whatToImproveInVideos: 'Qualidade visual (imagem)',

  // ETAPA 7: INVESTIMENTO E OBJEÇÕES
  hasInvestedBefore: 'Não, nunca',
  investmentWillingness: 'R$ 501 - R$ 1.000',
  paymentPreference: 'Parcelado em até 12x',
  mainObjection: 'Falta de dinheiro',
  learningFormat: ['Vídeo-aulas gravadas (assisto quando quiser)', 'Comunidade/grupo de alunos'],
  courseDuration: '12 semanas (3 meses)',
  investmentSecurity: ['Garantia de satisfação (dinheiro de volta)', 'Ver resultados comprovados', 'Suporte direto do instrutor'],
  canPayInInstallments: 'Sim, com planejamento',
  investmentOrExpense: 'Investimento que pode me dar retorno',
  selfBeliefScale: 7,

  // ETAPA 8: MOTIVAÇÃO E FECHAMENTO
  motivationScale: 8,
  mainMotivationReason: 'Independência financeira',
  resultsTimeframe: 'Em 2-3 meses',
  wouldStartToday: 'Talvez, preciso saber mais',
  wantsFreeMaterials: 'Sim, quero tudo que puder me ajudar',
  allowContact: 'Sim, pode entrar em contato',
  contactMethod: 'WhatsApp',
  contactTime: 'Tarde (12h-18h)',
  proposalPreference: 'Ver proposta por mensagem primeiro',
  investmentLikelihood: 7,
  wouldTryWithSupport: 'Sim, com certeza'
};

// --- LEAD SCORE LOGIC ---
const calculateLeadScore = (data: Partial<FormData>): { score: number, leadType: 'hot' | 'warm' | 'cold' } => {
    let score = 0;
    // Motivação (0-30 pontos)
    if ((data.motivationScale || 0) >= 8) score += 30;
    else if ((data.motivationScale || 0) >= 5) score += 15;
    // Disposição para investir (0-25 pontos)
    if (data.investmentWillingness === 'Acima de R$ 2.000') score += 25;
    else if (data.investmentWillingness === 'R$ 1.001 - R$ 2.000') score += 20;
    else if (data.investmentWillingness === 'R$ 501 - R$ 1.000') score += 15;
    // Aceite de contato (0-20 pontos)
    if (data.allowContact === 'Sim, pode entrar em contato') score += 20;
    else if (data.allowContact === 'Talvez, dependendo da proposta') score += 10;
    // Urgência (0-15 pontos)
    if (data.resultsTimeframe === 'Nos próximos 30 dias') score += 15;
    else if (data.resultsTimeframe === 'Em 2-3 meses') score += 10;
    // Objetivo profissional (0-10 pontos)
    if (['Gerar renda extra', 'Mudar de profissão completamente'].includes(data.mainGoal || '')) {
      score += 10;
    }
  
    const leadType = score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold';
    return { score, leadType };
};


// --- CONDITIONAL LOGIC ---
const calculateConditionalStates = (data: Partial<FormData>): ConditionalStates => {
    const checkPhoneModel = (model: string | undefined) => {
        if (!model) return { isOld: false };
        const oldKeywords = ['antigo', 'velho', 'básico', 'j5', 'j7', 'g5', 'g6', 'moto g'];
        const lowerModel = model.toLowerCase();
        return { isOld: oldKeywords.some(kw => lowerModel.includes(kw)) };
    };

    return {
        // Step 2
        showParentalAuth: data.ageRange === 'Menos de 18',
        // Step 3
        showTriedLearningDetails: data.triedLearning === 'Sim, várias vezes' || data.triedLearning === 'Sim, uma vez',
        // Step 4
        showBusinessOwnerDetails: data.occupation === 'Empresário/Empreendedor' || data.occupation === 'Freelancer/Autônomo',
        showEmployedDetails: data.occupation === 'Empregado CLT',
        showStudentDetails: data.occupation === 'Estudante',
        showUnemployedDetails: data.occupation === 'Desempregado',
        showCEP: data.country === 'Brasil',
        // Step 5
        showSocialMediaDetails: data.mainGoal === 'Criar conteúdo para redes sociais',
        showExtraIncomeDetails: data.mainGoal === 'Gerar renda extra',
        showCareerChangeDetails: data.mainGoal === 'Mudar de profissão completamente',
        showBusinessContentDetails: data.mainGoal === 'Criar conteúdo para meu negócio',
        // Step 6
        showNewbieDetails: data.experienceLevel === 'Nunca filmei nada',
        showBeginnerIntermediateDetails: data.experienceLevel === 'Iniciante (filmo casualmente)' || data.experienceLevel === 'Intermediário (já produzi alguns vídeos)',
        showAdvancedDetails: data.experienceLevel === 'Avançado (filmo regularmente)',
        showOldPhoneWarning: checkPhoneModel(data.phoneModel).isOld,
        // Step 7
        showInvestedBeforeDetails: data.hasInvestedBefore === 'Sim, várias vezes' || data.hasInvestedBefore === 'Sim, uma vez',
        showHighInvestmentDetails: data.investmentWillingness === 'Acima de R$ 2.000',
        showLowInvestmentDetails: data.investmentWillingness === 'Prefiro começar com gratuito' || data.investmentWillingness === 'Até R$ 200',
        showObjectionMoney: data.mainObjection === 'Falta de dinheiro',
        showObjectionFear: data.mainObjection === 'Medo de não conseguir',
        showObjectionTriedBefore: data.mainObjection === 'Já tentei antes e não deu certo',
        showObjectionTime: data.mainObjection === 'Falta de tempo',
        // Step 8
        showMotivationHigh: (data.motivationScale || 0) >= 8,
        showMotivationMedium: (data.motivationScale || 0) >= 5 && (data.motivationScale || 0) <= 7,
        showMotivationLow: (data.motivationScale || 0) <= 4,
        showMotivationFinancial: data.mainMotivationReason === 'Independência financeira',
        showMotivationJobHate: data.mainMotivationReason === 'Sair do emprego atual',
        showMotivationFastResults: data.resultsTimeframe === 'Nos próximos 30 dias',
        showWantsFreebies: data.wantsFreeMaterials?.startsWith('Sim') ?? false,
        showContactAllowed: data.allowContact === 'Sim, pode entrar em contato',
        showContactMaybe: data.allowContact === 'Talvez, dependendo da proposta',
    };
};


// PROGRESS BAR
const ProgressBar: React.FC<{ currentStep: number, totalSteps: number, message: string }> = ({ currentStep, totalSteps, message }) => {
    const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
    return (
        <div className="mb-8">
            <div className="w-full rounded-full h-2.5 neumorphic-shadow-inset mb-2">
                <motion.div
                    className="h-2.5 rounded-full neumorphic-gradient-cta"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-500">Etapa {currentStep} de {totalSteps}</p>
                <p className="text-sm text-indigo-500 font-medium">{message}</p>
            </div>
        </div>
    );
};

// --- SURVEY COMPONENT ---
const Survey: React.FC<{onSecretAccess: () => void; adminEmail: string}> = ({ onSecretAccess, adminEmail }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [formData, setFormData] = useState<Partial<FormData>>({ motivationScale: 5, phoneDDI: '+55', country: 'Brasil', useCEP: false });
    const [conditionalStates, setConditionalStates] = useState<ConditionalStates>(() => calculateConditionalStates(formData));
    const [errors, setErrors] = useState<Record<string, string> | null>(null);
    const [direction, setDirection] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSubmittedResponse, setLastSubmittedResponse] = useState<Partial<SurveyResponse> | null>(null);

    const updateData = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData(prevData => {
          const newData = { ...prevData, [field]: value };
          setConditionalStates(calculateConditionalStates(newData));
          return newData;
      });
    }, []);
    
    const onApplyTemplate = () => {
        setFormData(templateData);
        setConditionalStates(calculateConditionalStates(templateData));
        alert('Template de lead ideal preenchido! Prossiga com o formulário.');
    };

    const allSteps = useMemo(() => [
      { id: 'welcome', component: Step1_Welcome, message: "Vamos começar!" },
      { id: 'basicData', component: Step2_BasicData, message: "Ótimo começo! Vamos conhecer seus desafios." },
      { id: 'pains', component: Step3_PainsAndChallenges, message: "Entendemos. Agora sobre sua situação atual." },
      { id: 'work', component: Step4_WorkAndIncome, message: "Perfeito! Vamos falar dos seus sonhos." },
      { id: 'goals', component: Step5_GoalsAndDesires, message: "Quase lá! Sua experiência técnica agora." },
      { id: 'experience', component: Step6_ExperienceAndEquipment, message: "Excelente! Vamos falar de investimento." },
      { id: 'investment', component: Step7_InvestmentAndObjections, message: "Última etapa! Motivação e próximos passos." },
      { id: 'motivation', component: Step8_MotivationAndClosing, message: "Revise seus dados para finalizar." },
      { id: 'summary', component: Step9_SummaryAndSubmit, message: "Tudo pronto!" },
      { id: 'success', component: SuccessScreen, message: "Sucesso!" },
    ], []);

    const CurrentStepComponent = allSteps[stepIndex].component;
    const isLastFormStep = stepIndex === allSteps.length - 2;
    const isWelcomeStep = stepIndex === 0;
    const isSuccessStep = stepIndex === allSteps.length - 1;
    const formSteps = allSteps.slice(1, -2);


    const handleNext = async () => {
        const currentStepId = allSteps[stepIndex].id;
        if (currentStepId !== 'welcome' && currentStepId !== 'success' && currentStepId !== 'summary') {
            const validationErrors = validateStep(currentStepId, formData, conditionalStates);
            if (validationErrors) {
                setErrors(validationErrors);
                alert('Por favor, preencha todos os campos obrigatórios destacados.');
                return;
            }
        }
        setErrors(null);

        if (isLastFormStep) {
            setIsLoading(true);

            // SECURITY FIX: Prevent form submission with the admin email.
            // This avoids a race condition where the admin dashboard could flash on screen
            // because createUserWithEmailAndPassword temporarily signs the user in.
            if (formData.email?.toLowerCase() === adminEmail.toLowerCase()) {
                alert('Este e-mail é reservado para administração. Por favor, use um e-mail diferente.');
                setIsLoading(false);
                return;
            }
            
            try {
                // Tarefa primária: Salvar os dados do lead
                const trackingData = await getTrackingData();
                const leadData = mapFormDataToLead(formData);
                const { score, leadType } = calculateLeadScore(formData);
                
                const finalPayload = removeUndefined({
                    ...leadData,
                    leadScore: score,
                    leadType,
                    status: "novo",
                    createdAt: serverTimestamp(),
                    tracking: trackingData,
                });

                await addDoc(collection(db, "leads"), finalPayload);

                // Tarefas secundárias (best-effort): criar usuário e enviar e-mail
                // A falha aqui não deve impedir a tela de sucesso.
                const userEmail = formData.email;
                if (userEmail) {
                    try {
                        const tempPassword = crypto.randomUUID() + "A1!";
                        await createUserWithEmailAndPassword(auth, userEmail, tempPassword);
                        // IMPORTANTE: Desconecta o usuário imediatamente para evitar acesso indevido ao admin.
                        await signOut(auth);
                    } catch (error: any) {
                        if (error.code !== 'auth/email-already-in-use') {
                            console.warn("Falha não-crítica ao criar conta de autenticação:", error);
                        }
                    }
                    
                    try {
                        const actionCodeSettings = {
                            url: `${window.location.origin}/newpassword`,
                            handleCodeInApp: true,
                        };
                        await sendPasswordResetEmail(auth, userEmail, actionCodeSettings);
                    } catch (error: any) {
                        if (error.code === 'auth/unauthorized-continue-uri') {
                            console.error(
                                "********************************************************************************\n" +
                                "AÇÃO NECESSÁRIA: O envio de e-mail para definição de senha falhou.\n" +
                                `MOTIVO: O domínio "${window.location.origin}" não está autorizado no seu projeto Firebase.\n` +
                                "SOLUÇÃO: Vá para o Console do Firebase -> Authentication -> Settings -> Authorized domains e adicione este domínio à lista.\n" +
                                "O lead foi salvo com sucesso, mas o usuário não receberá o e-mail.\n" +
                                "********************************************************************************"
                            );
                        } else {
                            console.warn("Falha não-crítica ao enviar e-mail de definição de senha:", error);
                        }
                    }
                }
                
                setLastSubmittedResponse({ ...formData, id: 'temp', leadScore: score, leadType, tracking: trackingData });
                
                setTimeout(() => {
                    setIsLoading(false);
                    setDirection(1);
                    setStepIndex((prev) => prev + 1);
                }, 500);

            } catch (error) {
                // Este bloco agora captura apenas erros críticos (ex: falha ao salvar no Firestore)
                console.error("Erro CRÍTICO ao salvar dados: ", error);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                setIsLoading(false);
            }
            return;
        }

        setDirection(1);
        setStepIndex((prev) => prev + 1);
    };

    const handlePrev = async () => {
      if (stepIndex > 0) {
        setDirection(-1);
        setStepIndex((prev) => prev - 1);
      }
    };

    const handleReset = () => {
        setStepIndex(0);
        setFormData({ motivationScale: 5, phoneDDI: '+55', country: 'Brasil', useCEP: false });
        setLastSubmittedResponse(null);
    };
    
    return (
        <div className="w-full max-w-3xl">
          <NeumorphicContainer className="p-6 sm:p-10 rounded-2xl">
            {!isWelcomeStep && !isSuccessStep && (
               <ProgressBar 
                  currentStep={stepIndex} 
                  totalSteps={formSteps.length + 1}
                  message={allSteps[stepIndex].message}
               />
            )}
  
            <div className="min-h-[450px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                      key={stepIndex}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -50 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full"
                  >
                      <CurrentStepComponent 
                        data={isSuccessStep ? lastSubmittedResponse! : formData} 
                        updateData={updateData} 
                        onNext={handleNext} 
                        onPrev={handlePrev} 
                        errors={errors}
                        conditionalStates={conditionalStates}
                        onSecretAccess={isWelcomeStep ? onSecretAccess : undefined}
                        onReset={isSuccessStep ? handleReset : undefined}
                        onApplyTemplate={isWelcomeStep ? onApplyTemplate : undefined}
                      />
                  </motion.div>
              </AnimatePresence>
            </div>
            
            {!isSuccessStep && !isLastFormStep && (
              <div className={cx("flex mt-10", isWelcomeStep ? "justify-center" : "justify-between")}>
                {!isWelcomeStep && (
                  <AnimatedButton onClick={handlePrev} variant="secondary">
                    <ChevronLeftIcon className="w-5 h-5 mr-2" /> Voltar
                  </AnimatedButton>
                )}

                <AnimatedButton 
                  onClick={handleNext} 
                  isLoading={isLoading}
                >
                    {isWelcomeStep 
                      ? 'Liberar meu Acesso'
                      : 'Próximo'
                    }
                    { !isWelcomeStep && (isLoading ? <SpinnerIcon className="w-5 h-5 ml-2" /> : <ChevronRightIcon className="w-5 h-5 ml-2" />) }
                </AnimatedButton>
              </div>
            )}
          </NeumorphicContainer>
        </div>
    );
}

// --- ROUTER COMPONENT ---
const AppRouter: React.FC<{
  isAuthenticated: boolean;
  onLogout: () => void;
  onSecretAccess: () => void;
  adminEmail: string;
}> = ({ isAuthenticated, onLogout, onSecretAccess, adminEmail }) => {
  const path = window.location.pathname;

  if (path.startsWith('/newpassword')) {
    return <NewPassword />;
  }

  if (isAuthenticated) {
    return <AdminDashboard onLogout={onLogout} />;
  }

  return <Survey onSecretAccess={onSecretAccess} adminEmail={adminEmail} />;
};


// --- FIREBASE CONFIG ERROR COMPONENT ---
const FirebaseConfigError: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-[#e0e5ec]">
    <div className="w-full max-w-2xl bg-[#e0e5ec] rounded-2xl neumorphic-shadow p-8 text-center text-slate-700">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Erro de Configuração do Firebase</h1>
      <p className="mb-2">A aplicação não consegue se conectar ao Firebase porque as credenciais não foram configuradas.</p>
      <p className="font-semibold mb-4">Para corrigir isso, por favor, edite o arquivo:</p>
      <code className="block bg-slate-200 neumorphic-shadow-inset text-slate-800 p-4 rounded-lg font-mono text-left mb-6 break-all">
        firebase.ts
      </code>
      <p className="mb-4">
        Você precisa substituir os valores de placeholder como <code className="bg-slate-200 p-1 rounded font-mono">"YOUR_API_KEY_HERE"</code> pelas suas credenciais reais, que você pode encontrar no console do seu projeto Firebase.
      </p>
      <a 
        href="https://console.firebase.google.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block font-semibold py-3 px-6 rounded-xl transition-all duration-300 neumorphic-shadow text-white neumorphic-gradient-cta hover:neumorphic-gradient-cta-hover active:neumorphic-shadow-inset"
      >
        Abrir Console do Firebase
      </a>
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  if (isFirebaseConfigIncomplete) {
    return <FirebaseConfigError />;
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // AÇÃO NECESSÁRIA: Substitua este e-mail pelo e-mail do seu administrador.
  const ADMIN_EMAIL = 'contato@hirocontents.com.br';

  useEffect(() => {
    // Gerencia o estado de autenticação globalmente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Acesso ao admin é permitido apenas se o usuário estiver logado E for o admin.
      setIsAuthenticated(!!user && user.email === ADMIN_EMAIL);
      setIsLoadingAuth(false);
      
      // Inicializa o Google Analytics apenas para usuários não-administradores.
      if (!user || user.email !== ADMIN_EMAIL) {
        initializeGA();
        trackPageView(window.location.pathname);
      }
    });
    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, []);

  const handleSecretAccess = () => {
    if (clickTimer) clearTimeout(clickTimer);
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 7) {
      setShowLoginModal(true);
      setClickCount(0);
    } else {
      const timer = setTimeout(() => setClickCount(0), 2000);
      setClickTimer(timer);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<{ success: boolean, error?: any }> => {
    // SECURITY FIX: Explicitly check if the email trying to log in is the admin's email.
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        console.warn(`Tentativa de login bloqueada para usuário não-administrador: ${email}`);
        // Return the same error code as Firebase for invalid credentials to prevent email enumeration.
        return { success: false, error: { code: 'auth/invalid-credential' } };
    }

    try {
      // Tenta autenticar o usuário. Para que isso funcione, você deve primeiro:
      // 1. Ir em seu projeto no Firebase Console.
      // 2. Navegar para "Authentication" -> "Sign-in method" e habilitar "Email/Password".
      // 3. Ir para a aba "Users" e clicar em "Add user" para criar sua conta de administrador.
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginModal(false);
      return { success: true };
    } catch (error) {
      console.error("Falha no login:", error);
      return { success: false, error: error };
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Falha no logout:", error);
    }
  };
  
  useEffect(() => {
    return () => {
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);
  
  if (isLoadingAuth) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SpinnerIcon className="w-12 h-12 text-indigo-500" />
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <AppRouter
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onSecretAccess={handleSecretAccess}
        adminEmail={ADMIN_EMAIL}
      />
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal 
            onLogin={handleLogin}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
