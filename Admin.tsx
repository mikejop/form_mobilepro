
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveyResponse } from './types';
// FIX: Imported AnimatedButton to resolve 'Cannot find name' error.
import { LockIcon, SpinnerIcon, AnimatedButton } from './components';
import { db, auth } from './firebase';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';


// --- DASHBOARD ICONS ---
const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);
const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.985-2.122A3.75 3.75 0 0012 18z" />
  </svg>
);
const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
const SnowflakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 6.75 13.5 10.5m-13.5 0L18.75 6.75" />
  </svg>
);
const ArrowDownTrayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

// --- LOGIN MODAL ---
interface LoginModalProps {
    onLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: any }>;
    onClose: () => void;
}
export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const { success, error } = await onLogin(email, password);
    setIsLoading(false);

    if (!success) {
      setAttempts(prev => prev + 1);
      
      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
      if (error?.code) {
          switch (error.code) {
              case 'auth/invalid-credential':
                  errorMessage = 'E-mail ou senha incorretos. Verifique os dados e tente novamente.';
                  break;
              case 'auth/too-many-requests':
                  errorMessage = 'Acesso bloqueado temporariamente devido a muitas tentativas. Tente novamente mais tarde.';
                  break;
              default:
                  errorMessage = 'Erro ao fazer login. Verifique sua conexão ou tente mais tarde.';
          }
      }
      setError(errorMessage);
      
      if (attempts + 1 >= 3) {
          setTimeout(() => onClose(), 2500);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#e0e5ec] rounded-2xl p-8 w-full max-w-md neumorphic-shadow relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center neumorphic-shadow hover:neumorphic-shadow-inset transition-all">&times;</button>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center neumorphic-gradient-cta neumorphic-shadow">
            <LockIcon className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Área Restrita</h2>
        <p className="text-center text-slate-600 mb-6">Acesso exclusivo para administradores.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-600 mb-2 font-medium">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-transparent neumorphic-shadow-concave focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="Digite seu e-mail" autoFocus required
            />
          </div>
          <div>
            <label className="block text-slate-600 mb-2 font-medium">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-transparent neumorphic-shadow-concave focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                placeholder="Digite a senha" required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md animate-shake-modal">{error}</div>}
          <AnimatedButton type="submit" className="w-full" isLoading={isLoading}>
            Entrar
          </AnimatedButton>
        </form>
      </motion.div>
    </div>
  );
};


// --- ADMIN DASHBOARD ---
const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => {
    const colorClasses: Record<string, string> = {
      purple: 'bg-purple-200 text-purple-600', 
      red: 'bg-red-200 text-red-600',
      yellow: 'bg-yellow-200 text-yellow-600', 
      blue: 'bg-blue-200 text-blue-600',
    };
    return (
      <div className="bg-[#e0e5ec] rounded-2xl neumorphic-shadow p-5 flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} neumorphic-shadow-inset`}>
          {icon}
        </div>
      </div>
    );
};

// --- ANALYTICS COMPONENTS ---
const SummaryCard: React.FC<{ title: string; topItem?: { name: string; value: number } }> = ({ title, topItem }) => {
    if (!topItem) {
        return (
            <div className="bg-[#e0e5ec] neumorphic-shadow-inset p-4 rounded-lg text-center h-full flex flex-col justify-center">
                <p className="font-bold text-slate-700 text-sm mb-1">{title}</p>
                <p className="text-slate-500 text-xs">Sem dados</p>
            </div>
        );
    }

    return (
        <div className="bg-[#e0e5ec] neumorphic-shadow p-4 rounded-lg text-center h-full flex flex-col justify-center">
            <p className="text-slate-700 text-sm mb-2 truncate" title={title}>{title}</p>
            <p className="text-indigo-600 font-bold text-lg truncate" title={topItem.name}>{topItem.name}</p>
            <p className="text-slate-500 text-xs mt-1">{topItem.value} resposta(s)</p>
        </div>
    );
};

const DataBreakdownChart: React.FC<{ title: string; data: { name: string; value: number }[] }> = ({ title, data }) => {
    if (!data || data.length === 0) {
        return <div className="p-4 text-center text-slate-500">Nenhum dado para exibir.</div>;
    }
    const chartHeight = data.length * 40 + 60; // Dynamic height
    return (
        <div className="w-full h-full">
            <h4 className="text-lg font-bold text-slate-700 mb-4">{title}</h4>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis type="category" dataKey="name" stroke="#64748b" width={150} tick={{ fontSize: 12, fill: '#475569' }} />
                    <Tooltip cursor={{ fill: 'rgba(163, 177, 198, 0.3)' }} contentStyle={{ backgroundColor: 'rgba(224, 229, 236, 0.9)', border: 'none', borderRadius: '10px' }} />
                    <Bar dataKey="value" fill="#818cf8" barSize={25} radius={[0, 10, 10, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const AnalyticsTabs: React.FC<{ data: any; filter: string; setFilter: (f: any) => void }> = ({ data, filter, setFilter }) => {
    const tabs = [
        'Visão Geral', 'Demográfico', 'Dores e Desafios', 'Objetivos e Desejos',
        'Experiência', 'Investimento', 'Motivação'
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const filterLabels: Record<string, string> = { all: 'Todos', hot: 'Hot', warm: 'Warm', cold: 'Cold' };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Visão Geral':
                return (
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Resumo dos Leads ({filterLabels[filter as keyof typeof filterLabels]})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            <SummaryCard title="Faixa Etária Principal" topItem={data.ageRanges?.[0]} />
                            <SummaryCard title="Principal Dificuldade" topItem={data.difficulties?.[0]} />
                            <SummaryCard title="Principal Objetivo" topItem={data.mainGoals?.[0]} />
                            <SummaryCard title="Nível de Experiência" topItem={data.experienceLevels?.[0]} />
                            <SummaryCard title="Disposição p/ Investir" topItem={data.investmentWillingness?.[0]} />
                            <SummaryCard title="Principal Objeção" topItem={data.mainObjections?.[0]} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DataBreakdownChart title="Tipos de Lead" data={data.leadTypes} />
                            <DataBreakdownChart title="Lead Score (distribuição)" data={data.leadScores} />
                        </div>
                    </div>
                );
            case 'Demográfico':
                 return (
                    <div className="space-y-8">
                        <DataBreakdownChart title="Gênero" data={data.genders} />
                        <DataBreakdownChart title="Faixa Etária" data={data.ageRanges} />
                        <DataBreakdownChart title="Ocupação Profissional" data={data.occupations} />
                        <DataBreakdownChart title="Localização (Estado)" data={data.locations} />
                    </div>
                );
            case 'Dores e Desafios':
                return (
                    <div className="space-y-8">
                        <DataBreakdownChart title="Maiores Dificuldades" data={data.difficulties} />
                        <DataBreakdownChart title="Já Tentou Aprender Antes?" data={data.triedLearning} />
                        <DataBreakdownChart title="Onde Tentou Aprender?" data={data.whereTried} />
                    </div>
                );
            case 'Objetivos e Desejos':
                 return (
                    <div className="space-y-8">
                        <DataBreakdownChart title="Principal Objetivo" data={data.mainGoals} />
                        <DataBreakdownChart title="Nichos de Interesse" data={data.interestedNiches} />
                        <DataBreakdownChart title="Tempo de Dedicação Semanal" data={data.timePerWeek} />
                    </div>
                );
             case 'Experiência':
                 return (
                    <div className="space-y-8">
                        <DataBreakdownChart title="Nível de Experiência" data={data.experienceLevels} />
                        <DataBreakdownChart title="Maior Dificuldade Técnica" data={data.techDifficulties} />
                        <DataBreakdownChart title="Equipamentos Adicionais" data={data.equipments} />
                    </div>
                );
            case 'Investimento':
                return (
                    <div className="space-y-8">
                        <DataBreakdownChart title="Disposição para Investir" data={data.investmentWillingness} />
                        <DataBreakdownChart title="Principal Objeção para Começar" data={data.mainObjections} />
                        <DataBreakdownChart title="Formatos de Aprendizado Preferidos" data={data.learningFormats} />
                    </div>
                );
            case 'Motivação':
                 return (
                    <div className="space-y-8">
                         <DataBreakdownChart title="Nível de Motivação (1-10)" data={data.motivationScales} />
                        <DataBreakdownChart title="Principal Razão que Motiva" data={data.mainMotivations} />
                        <DataBreakdownChart title="Permissão para Contato" data={data.allowContact} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#e0e5ec] rounded-2xl neumorphic-shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-2 p-1 rounded-xl neumorphic-shadow-inset flex-wrap justify-center">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm ${activeTab === tab ? 'neumorphic-shadow-active text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                 <div className="flex items-center gap-2 p-1 rounded-xl neumorphic-shadow-inset">
                    {Object.entries(filterLabels).map(([key, label]) => (
                        <button key={key} onClick={() => setFilter(key as any)} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filter === key ? 'neumorphic-shadow-active text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};


interface AdminDashboardProps {
    onLogout: () => void;
}
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableFilter, setTableFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [analyticsFilter, setAnalyticsFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const unsubscribeFromFirestore = onSnapshot(q, (querySnapshot) => {
            const responsesData: SurveyResponse[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const responseData: SurveyResponse = {
                    id: doc.id,
                    submissionDate: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : (data.createdAt instanceof Date ? data.createdAt : undefined),
                    leadScore: data.leadScore,
                    leadType: data.leadType,
                    tracking: data.tracking,
                    firstName: data.basicInfo?.firstName,
                    lastName: data.basicInfo?.lastName,
                    email: data.basicInfo?.email,
                    phone: data.basicInfo?.phone,
                    gender: data.basicInfo?.gender,
                    ageRange: data.basicInfo?.ageRange,
                    parentalAuth: data.basicInfo?.parentalConsent ? 'Sim' : 'Não',
                    biggestDifficulty: data.challenges?.mainDifficulties,
                    biggestFrustration: data.challenges?.biggestFrustration,
                    triedLearning: data.challenges?.triedLearningBefore,
                    whyFailed: data.challenges?.failureReason?.split(', '),
                    whereTried: data.challenges?.learningSource,
                    occupation: data.demographics?.occupation,
                    income: data.demographics?.incomeRange,
                    country: data.demographics?.country,
                    cep: data.demographics?.cep,
                    city: data.demographics?.city,
                    state: data.demographics?.state,
                    businessNiche: data.demographics?.businessNiche,
                    businessDuration: data.demographics?.businessTime,
                    useVideoInBusiness: data.demographics?.businessVideoUsage,
                    relatedToContent: data.demographics?.jobRelationToComms,
                    studyArea: data.demographics?.studyField,
                    seekingNewIncome: data.demographics?.incomeUrgency,
                    dailyAvailability: data.demographics?.dailyAvailability,
                    mainGoal: data.goals?.mainObjective,
                    interestedNiches: data.goals?.interestedNiches,
                    sixMonthGoal: data.goals?.sixMonthGoal,
                    timePerWeek: data.goals?.weeklyStudyTime,
                    inspirations: data.goals?.inspirations,
                    currentMarketingSpend: data.goals?.currentContentSpend,
                    videoCreationBenefit: data.goals?.creationBenefits,
                    audienceSize: data.goals?.currentAudienceSize,
                    priorityPlatform: data.goals?.priorityPlatform,
                    socialMediaGoal: data.goals?.socialMediaGoal,
                    extraIncomeGoal: data.goals?.incomeTarget,
                    monetizationMethods: data.goals?.monetizationPlan,
                    careerChangeTimeframe: data.goals?.transitionTimeline,
                    transitionReserve: data.goals?.financialReserve,
                    careerChangeWorry: data.goals?.transitionWorry,
                    experienceLevel: data.experience?.level,
                    interestDuration: data.experience?.interestDuration,
                    phoneModel: data.experience?.phoneModel,
                    createdVideosBefore: data.experience?.videoCreationHistory,
                    biggestTechnicalDifficulty: data.experience?.biggestTechDifficulty,
                    additionalEquipment: data.experience?.extraEquipment,
                    whatStopsYouNow: data.experience?.impediments,
                    fearOfAppearing: data.experience?.cameraShy,
                    techIntimidation: data.experience?.techIntimidationScore,
                    pastVideoTypes: data.experience?.videosCreatedTypes,
                    editingSoftware: data.experience?.editingSoftware,
                    whatToImproveInVideos: data.experience?.improvementDesired,
                    monetizedBefore: data.experience?.isMonetized,
                    videosPerMonth: data.experience?.monthlyProductionAvg,
                    evolutionBottleneck: data.experience?.growthBottleneck,
                    specializeOrGeneralize: data.experience?.careerFocus,
                    willChangePhone: data.experience?.planToChangePhone,
                    hasInvestedBefore: data.investment?.previousInvestments,
                    investmentWillingness: data.investment?.willingnessToPay,
                    paymentPreference: data.investment?.paymentPreference,
                    mainObjection: data.investment?.mainObjection,
                    learningFormat: data.investment?.preferredLearningFormat,
                    // FIX: Changed property name to match SurveyResponse type.
                    courseDuration: data.investment?.idealCourseDuration,
                    investmentSecurity: data.investment?.securityFactors,
                    totalInvested: data.investment?.totalInvestedAmount,
                    investmentSatisfaction: data.investment?.satisfactionLevel,
                    whatLackedInCourses: data.investment?.missingInPreviousCourses,
                    canPayInInstallments: data.investment?.installmentFeasibility,
                    investmentOrExpense: data.investment?.investmentMindset,
                    selfBeliefScale: data.investment?.selfConfidenceScore,
                    // FIX: Changed property name to match the SurveyResponse type definition.
                    learnedDifficultThing: data.investment?.pastLearningSuccess,
                    wouldTryWithSupport: data.investment?.supportEffect,
                    whatWentWrong: data.investment?.pastFailureAnalysis,
                    hadAdequateSupport: data.investment?.pastSupportQuality,
                    tryDifferentMethod: data.investment?.methodRetryWillingness,
                    canDo15minMethod: data.investment?.shortMethodViability,
                    premiumValue: data.investment?.highTicketValues,
                    mentorshipInterest: data.investment?.mentoringInterest,
                    freeLimitationReason: data.investment?.financialLimitationReal,
                    motivationScale: data.motivation?.motivationScore,
                    mainMotivationReason: data.motivation?.primaryDriver,
                    successMeaning: data.motivation?.successDefinition,
                    resultsTimeframe: data.motivation?.resultsTimelineExpectation,
                    wouldStartToday: data.motivation?.startImmediately,
                    biggestFear: data.motivation?.biggestFear,
                    wantsFreeMaterials: data.motivation?.wantFreeMaterials,
                    allowContact: data.motivation?.allowContact,
                    finalComments: data.motivation?.extraComments,
                    contactMethod: data.motivation?.contactMethod,
                    contactTime: data.motivation?.bestContactTime,
                    proposalPreference: data.motivation?.meetingPreference,
                    investmentLikelihood: data.motivation?.shortTermInvestProb,
                    whatWouldMakeItYes: data.motivation?.conversionKey,
                    preferredFreebie: data.motivation?.preferredFreeMaterialType,
                    hateJobScale: data.motivation?.currentJobDissatisfaction,
                    exitTimeframe: data.motivation?.quitJobDeadline,
                    idealIncome: data.motivation?.idealIncomeAmount,
                    // FIX: Changed property name 'incomeTimeline' to 'incomeTimeframe' to match SurveyResponse type.
                    incomeTimeframe: data.motivation?.incomeTimeline,
                    intensiveAvailability: data.motivation?.intensityAvailability,
                };
                return responseData;
            });
            setResponses(responsesData);
            setIsLoading(false);
            setError(null);
        }, (err: any) => {
            console.error("Firebase Snapshot Error:", err);
            if (err.code === 'permission-denied') {
                setError("Permissão negada. Suas regras de segurança do Firestore não permitem acesso. Para corrigir, vá ao seu console Firebase > Firestore Database > Rules e substitua as regras atuais pelas seguintes:");
            } else {
                setError("Ocorreu um erro ao buscar os dados. Verifique o console para mais detalhes.");
            }
            setIsLoading(false);
        });
        return () => unsubscribeFromFirestore();
      } else {
        setError("Usuário não autenticado. Por favor, faça o login novamente.");
        setIsLoading(false);
        setResponses([]);
      }
    });
    return () => unsubscribeFromAuth();
  }, []);

  const fullAnalyticsData = useMemo(() => {
    const filtered = analyticsFilter === 'all' ? responses : responses.filter(r => r.leadType === analyticsFilter);

    const aggregate = (field: keyof SurveyResponse, isArray = false) => {
        const counts = filtered.reduce((acc, res) => {
            const value = res[field];
            if (value) {
                if (isArray && Array.isArray(value)) {
                    value.forEach(item => { acc[item] = (acc[item] || 0) + 1; });
                } else if (!isArray && typeof value === 'string') {
                    acc[value] = (acc[value] || 0) + 1;
                }
            }
            return acc;
        }, {} as Record<string, number>);
        // FIX: Replaced subtraction in sort with explicit comparison to fix potential type errors.
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
        });
    };

    const aggregateNumeric = (field: keyof SurveyResponse, bucketSize = 10) => {
        const counts = filtered.reduce((acc, res) => {
            const value = res[field] as number;
            if (typeof value === 'number') {
                if (bucketSize === 1) { // For motivation scale
                    const key = `${value}`;
                    acc[key] = (acc[key] || 0) + 1;
                } else { // For lead score
                    const bucket = Math.floor(value / bucketSize) * bucketSize;
                    const key = `${bucket}-${bucket + bucketSize - 1}`;
                    acc[key] = (acc[key] || 0) + 1;
                }
            }
            return acc;
        }, {} as Record<string, number>);
        // FIX: Replaced subtraction in sort with explicit comparison to fix type error.
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => {
            const numA = parseInt(a.name, 10);
            const numB = parseInt(b.name, 10);
            if (numA < numB) return -1;
            if (numA > numB) return 1;
            return 0;
        });
    }

    return {
        leadTypes: aggregate('leadType'),
        leadScores: aggregateNumeric('leadScore', 20),
        genders: aggregate('gender'),
        ageRanges: aggregate('ageRange'),
        occupations: aggregate('occupation'),
        locations: aggregate('state'),
        difficulties: aggregate('biggestDifficulty', true),
        triedLearning: aggregate('triedLearning'),
        whereTried: aggregate('whereTried', true),
        mainGoals: aggregate('mainGoal'),
        interestedNiches: aggregate('interestedNiches', true),
        timePerWeek: aggregate('timePerWeek'),
        experienceLevels: aggregate('experienceLevel'),
        techDifficulties: aggregate('biggestTechnicalDifficulty'),
        equipments: aggregate('additionalEquipment', true),
        investmentWillingness: aggregate('investmentWillingness'),
        mainObjections: aggregate('mainObjection'),
        learningFormats: aggregate('learningFormat', true),
        motivationScales: aggregateNumeric('motivationScale', 1),
        mainMotivations: aggregate('mainMotivationReason'),
        allowContact: aggregate('allowContact'),
    };
  }, [responses, analyticsFilter]);

  const filteredResponses = useMemo(() => responses.filter(r => {
    const name = `${r.firstName || ''} ${r.lastName || ''}`.toLowerCase();
    const email = (r.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return (tableFilter === 'all' || r.leadType === tableFilter) && (name.includes(search) || email.includes(search));
  }), [responses, tableFilter, searchTerm]);
  
  const filterLabels: Record<string, string> = { all: 'All', hot: 'Hot', warm: 'Warm', cold: 'Cold' };

  return (
    <div className="w-full max-w-7xl mx-auto animate-scaleIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Administrativo</h1>
          <p className="text-slate-600 mt-1">Bem-vindo, Mike</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-xl bg-transparent text-slate-600 font-semibold neumorphic-shadow hover:neumorphic-shadow-inset hover:text-indigo-600 active:scale-[0.98] transition-all flex items-center gap-2">
                <ArrowDownTrayIcon className="w-5 h-5" /> Exportar CSV
            </button>
            <button onClick={onLogout} className="px-6 py-2 rounded-xl bg-pink-200 text-red-600 font-semibold neumorphic-shadow hover:neumorphic-shadow-inset active:scale-[0.98] transition-all">Sair</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Respostas" value={responses.length} icon={<ChartBarIcon className="w-6 h-6" />} color="purple" />
        <StatCard title="Leads Quentes" value={responses.filter(r => r.leadType === 'hot').length} icon={<FireIcon className="w-6 h-6" />} color="red" />
        <StatCard title="Leads Mornos" value={responses.filter(r => r.leadType === 'warm').length} icon={<BoltIcon className="w-6 h-6" />} color="yellow" />
        <StatCard title="Leads Frios" value={responses.filter(r => r.leadType === 'cold').length} icon={<SnowflakeIcon className="w-6 h-6" />} color="blue" />
      </div>
      
      <AnalyticsTabs data={fullAnalyticsData} filter={analyticsFilter} setFilter={setAnalyticsFilter} />

      <div className="bg-[#e0e5ec] rounded-2xl neumorphic-shadow p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nome ou e-mail..." className="w-full px-4 py-3 rounded-xl bg-transparent neumorphic-shadow-concave focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all"/>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-xl neumorphic-shadow-inset">
          {Object.entries(filterLabels).map(([key, label]) => (
            <button key={key} onClick={() => setTableFilter(key as 'all' | 'hot' | 'warm' | 'cold')} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${tableFilter === key ? 'neumorphic-shadow-active text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#e0e5ec] rounded-2xl neumorphic-shadow overflow-hidden">
        {isLoading ? (
            <div className="text-center py-24"><SpinnerIcon className="w-8 h-8 text-slate-500 mx-auto" /></div>
        ) : error ? (
            <div className="text-center py-24 px-4 bg-[#e0e5ec] rounded-2xl neumorphic-shadow-inset">
                <p className="font-bold text-lg text-red-600 mb-2">Falha ao carregar dados</p>
                <p className="text-red-500 text-sm mb-4">{error}</p>
                {error.includes('Permissão negada') && (
                    <div className="text-left bg-slate-200 neumorphic-shadow-inset text-slate-800 p-4 rounded-lg font-mono text-xs max-w-2xl mx-auto break-words">
                        <pre className="whitespace-pre-wrap"><code>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      // Permite que qualquer pessoa envie o formulário
      allow create: if true;
      
      // Permite que apenas usuários autenticados leiam/gerenciem os leads
      allow read, update, delete: if request.auth != null;
    }
  }
}`}
                        </code></pre>
                    </div>
                )}
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead><tr className="text-left text-slate-500 text-xs uppercase">
                  <th className="px-6 py-4 font-semibold">Nome</th>
                  <th className="px-6 py-4 font-semibold">E-mail</th>
                  <th className="px-6 py-4 font-semibold">Origem</th>
                  <th className="px-6 py-4 font-semibold">Lead</th>
                  <th className="px-6 py-4 font-semibold">Score</th>
                  <th className="px-6 py-4 font-semibold">Data</th>
                  <th className="px-6 py-4 font-semibold">Ações</th>
                </tr></thead>
                <tbody>
                {filteredResponses.length > 0 ? (
                    filteredResponses.map((res) => (
                        <tr key={res.id} className="border-t border-slate-300/50 hover:bg-slate-200/40 transition-colors duration-200">
                            <td className="px-6 py-4 font-medium text-slate-800">{res.firstName} {res.lastName}</td>
                            <td className="px-6 py-4 text-slate-600">{res.email}</td>
                            <td className="px-6 py-4 text-slate-600 text-sm">{res.tracking?.utm?.source || res.tracking?.referrerInfo?.hostname || 'Direto'}</td>
                            <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${res.leadType === 'hot' ? 'bg-red-100 text-red-700' : res.leadType === 'warm' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{res.leadType}</span></td>
                            <td className="px-6 py-4 font-semibold text-slate-700">{res.leadScore}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{res.submissionDate ? res.submissionDate.toLocaleDateString('pt-BR') : 'N/A'}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => setSelectedResponse(res)} className="px-3 py-2 rounded-lg neumorphic-shadow hover:neumorphic-shadow-inset text-xs font-medium transition-all text-slate-700 hover:text-indigo-600">Ver</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={7} className="text-center py-12 text-slate-500">Nenhuma resposta encontrada para os filtros atuais.</td></tr>
                 )}
                </tbody>
              </table>
            </div>
        )}
      </div>
      <AnimatePresence>
        {selectedResponse && <ResponseDetailModal response={selectedResponse} onClose={() => setSelectedResponse(null)} />}
      </AnimatePresence>
    </div>
  );
};


// --- RESPONSE DETAIL MODAL ---
const Section: React.FC<{title:string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-purple-300">{title}</h3>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
);
const InfoRow: React.FC<{label:string, value:any}> = ({ label, value}) => {
    if (value === null || value === undefined || (Array.isArray(value) && value.length === 0) || value === '') return null;
    return (
        <div><span className="font-semibold text-slate-700">{label}:</span> <span className="text-slate-600">{Array.isArray(value) ? value.join(', ') : (value || 'Não informado')}</span></div>
    );
};

const ResponseDetailModal: React.FC<{response: SurveyResponse, onClose: ()=>void}> = ({ response, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="bg-[#e0e5ec] rounded-2xl p-6 w-full max-w-4xl neumorphic-shadow relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center neumorphic-shadow hover:neumorphic-shadow-inset transition-all sticky top-0 z-10 bg-[#e0e5ec]">&times;</button>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Detalhes da Resposta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
            <Section title="Informações do Lead">
                <InfoRow label="Nome Completo" value={`${response.firstName || ''} ${response.lastName || ''}`} />
                <InfoRow label="Email" value={response.email} />
                <InfoRow label="Telefone" value={response.phone} />
                <InfoRow label="Tipo de Lead" value={response.leadType} />
                <InfoRow label="Score" value={response.leadScore} />
                <InfoRow label="Permite Contato" value={response.allowContact} />
                <InfoRow label="Melhor Contato" value={`${response.contactMethod} (${response.contactTime})`} />
            </Section>

            <Section title="Dados Demográficos">
                <InfoRow label="Gênero" value={response.gender} />
                <InfoRow label="Idade" value={response.ageRange} />
                <InfoRow label="País" value={response.country} />
                <InfoRow label="Cidade/Estado" value={`${response.city}, ${response.state}`} />
                <InfoRow label="Ocupação" value={response.occupation} />
                <InfoRow label="Renda Mensal" value={response.income} />
            </Section>

            <Section title="Dores e Desafios">
                <InfoRow label="Maiores Dificuldades" value={response.biggestDifficulty} />
                <InfoRow label="Maior Frustração" value={response.biggestFrustration} />
                <InfoRow label="Já Tentou Aprender?" value={response.triedLearning} />
                <InfoRow label="Onde Tentou?" value={response.whereTried} />
                <InfoRow label="Por que Falhou?" value={response.whyFailed} />
            </Section>

            <Section title="Desejos e Objetivos">
                <InfoRow label="Principal Objetivo" value={response.mainGoal} />
                <InfoRow label="Nichos de Interesse" value={response.interestedNiches} />
                <InfoRow label="Meta para 6 Meses" value={response.sixMonthGoal} />
                <InfoRow label="Tempo Semanal" value={response.timePerWeek} />
            </Section>

            <Section title="Experiência e Equipamento">
                <InfoRow label="Nível de Experiência" value={response.experienceLevel} />
                <InfoRow label="Modelo do Celular" value={response.phoneModel}/>
                <InfoRow label="Equipamento Adicional" value={response.additionalEquipment} />
                <InfoRow label="Software de Edição" value={response.editingSoftware} />
            </Section>

            <Section title="Investimento e Objeções">
                <InfoRow label="Disposto a investir" value={response.investmentWillingness} />
                <InfoRow label="Principal Objeção" value={response.mainObjection} />
                <InfoRow label="Formato Preferido" value={response.learningFormat} />
                <InfoRow label="Segurança para Investir" value={response.investmentSecurity} />
            </Section>

            <Section title="Motivação">
                <InfoRow label="Motivação (1-10)" value={response.motivationScale} />
                <InfoRow label="Principal Razão" value={response.mainMotivationReason} />
                <InfoRow label="Expectativa de Resultado" value={response.resultsTimeframe} />
                <InfoRow label="Começaria Hoje?" value={response.wouldStartToday} />
            </Section>
            
            {response.tracking && (
            <Section title="Dados de Rastreamento">
                <InfoRow label="SO" value={`${response.tracking.os.name || ''} ${response.tracking.os.version || ''}`}/>
                <InfoRow label="Navegador" value={`${response.tracking.browser.name || ''} ${response.tracking.browser.version || ''}`}/>
                <InfoRow label="Origem (UTM)" value={response.tracking.utm.source || 'N/A'}/>
                <InfoRow label="Referência" value={response.tracking.referrerInfo?.hostname}/>
                <InfoRow label="IP" value={response.tracking.location?.ip}/>
            </Section>
            )}
            
            {response.finalComments && (
                 <div className="md:col-span-2 lg:col-span-3">
                    <Section title="Comentários Adicionais">
                        <p className="text-slate-600 bg-slate-200/50 p-3 rounded-lg neumorphic-shadow-inset">{response.finalComments}</p>
                    </Section>
                 </div>
            )}
          </div>
        </motion.div>
      </div>
    );
};