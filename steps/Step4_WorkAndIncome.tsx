import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedInput, AnimatedRadioGroup, ConditionalWrapper, AnimatedSelect, AnimatedToggleSwitch, SpinnerIcon } from '../components';

export const Step4_WorkAndIncome: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const occupations = ['Estudante', 'Empregado CLT', 'Freelancer/Autônomo', 'Empresário/Empreendedor', 'Desempregado', 'Aposentado', 'Outro'];
    const incomeRanges = ['Até R$ 2.000', 'R$ 2.001 - R$ 4.000', 'R$ 4.001 - R$ 7.000', 'R$ 7.001 - R$ 10.000', 'Acima de R$ 10.000', 'Prefiro não informar'];

    const [cepLoading, setCepLoading] = useState(false);
    const [cepError, setCepError] = useState<string | null>(null);

    const countries = [
        'Brasil',
        'Portugal',
        'Estados Unidos',
        'Japão',
        'Reino Unido',
        'Canadá',
        'Austrália',
        'Angola',
        'Moçambique',
        'Cabo Verde',
        'Espanha',
        'França',
        'Alemanha',
        'Itália',
        'Suíça',
        'Paraguai',
        'Guiné-Bissau',
        'São Tomé e Príncipe',
        'Timor-Leste',
        'Guiné Equatorial',
        'Outro'
    ];
    const brazilianStates = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    useEffect(() => {
        const cep = data.cep?.replace(/\D/g, '');
        if (cep && cep.length === 8) {
            setCepLoading(true);
            setCepError(null);
            fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
                .then(res => {
                    if (!res.ok) throw new Error('CEP não encontrado.');
                    return res.json();
                })
                .then(apiData => {
                    if (apiData.city && apiData.state) {
                        updateData('city', apiData.city);
                        updateData('state', apiData.state);
                    } else {
                        throw new Error('Resposta inválida da API.');
                    }
                })
                .catch(error => {
                    setCepError(error.message || 'Erro ao buscar CEP.');
                    updateData('city', '');
                    updateData('state', '');
                })
                .finally(() => setCepLoading(false));
        }
    }, [data.cep, updateData]);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedCep = (value: string) => value.replace(/\D/g, '').substring(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
        updateData('cep', maskedCep(e.target.value));
    };

    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Trabalho e Renda</h2>
            <div className="space-y-8">
                <AnimatedRadioGroup label="Qual sua ocupação atual?" options={occupations} selected={data.occupation} onChange={val => updateData('occupation', val)} error={errors?.occupation} />
                <AnimatedRadioGroup label="Sua renda mensal está em qual faixa?" options={incomeRanges} selected={data.income} onChange={val => updateData('income', val)} error={errors?.income} />
                
                <div className="space-y-6">
                    <AnimatedSelect label="País" options={countries} value={data.country} onChange={e => { updateData('country', e.target.value); updateData('useCEP', false); }} error={errors?.country} />
                    <ConditionalWrapper show={data.country === 'Outro'}>
                        <AnimatedInput
                            label="Qual país?"
                            value={data.otherCountry}
                            onChange={e => updateData('otherCountry', e.target.value)}
                            error={errors?.otherCountry}
                        />
                    </ConditionalWrapper>
                    <ConditionalWrapper show={conditionalStates.showCEP}>
                        <div className="space-y-6">
                            <AnimatedToggleSwitch label="Preencher endereço com CEP?" checked={data.useCEP || false} onChange={val => updateData('useCEP', val)} />
                            <ConditionalWrapper show={!!data.useCEP}>
                                <div className="relative">
                                    <AnimatedInput label="CEP" value={data.cep} onChange={handleCepChange} error={cepError || undefined} />
                                    {cepLoading && (
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3"><SpinnerIcon className="w-5 h-5 text-indigo-500" /></div>
                                    )}
                                </div>
                            </ConditionalWrapper>
                        </div>
                    </ConditionalWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatedInput label="Cidade" value={data.city} onChange={e => updateData('city', e.target.value)} disabled={data.useCEP} error={errors?.city} />
                        {data.country === 'Brasil' ? (
                            <AnimatedSelect label="Estado" options={brazilianStates} value={data.state} onChange={e => updateData('state', e.target.value)} disabled={data.useCEP} placeholder="Selecione o estado" error={errors?.state} />
                        ) : (
                            <AnimatedInput label="Estado/Região" value={data.state} onChange={e => updateData('state', e.target.value)} error={errors?.state} />
                        )}
                    </div>
                </div>

                <ConditionalWrapper show={conditionalStates.showBusinessOwnerDetails}>
                    <AnimatedInput label="Qual seu nicho/área de atuação?" value={data.businessNiche} onChange={e => updateData('businessNiche', e.target.value)} />
                    <AnimatedRadioGroup label="Há quanto tempo você está nesse negócio?" options={['Menos de 6 meses', '6 meses - 1 ano', '1-3 anos', '3-5 anos', 'Mais de 5 anos']} selected={data.businessDuration} onChange={val => updateData('businessDuration', val)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você já usa vídeo no seu marketing/negócio?" options={['Sim, regularmente', 'Sim, às vezes', 'Não, mas quero começar', 'Não tenho interesse']} selected={data.useVideoInBusiness} onChange={val => updateData('useVideoInBusiness', val as FormData['useVideoInBusiness'])} />
                </ConditionalWrapper>
                <ConditionalWrapper show={conditionalStates.showEmployedDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Sua profissão atual está relacionada a comunicação/criação de conteúdo?" options={['Sim, trabalho com isso', 'Não, mas quero migrar', 'Não, é só interesse paralelo']} selected={data.relatedToContent} onChange={val => updateData('relatedToContent', val as FormData['relatedToContent'])} />
                </ConditionalWrapper>
                <ConditionalWrapper show={conditionalStates.showStudentDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você está estudando o quê?" options={['Comunicação/Marketing/Publicidade', 'Design/Artes', 'Tecnologia/TI', 'Outra área', 'Ensino médio']} selected={data.studyArea} onChange={val => updateData('studyArea', val as FormData['studyArea'])} />
                </ConditionalWrapper>
                <ConditionalWrapper show={conditionalStates.showUnemployedDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você está buscando filmagem como nova fonte de renda?" options={['Sim, urgentemente', 'Sim, mas sem pressa', 'Não, é só interesse pessoal']} selected={data.seekingNewIncome} onChange={val => updateData('seekingNewIncome', val as FormData['seekingNewIncome'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Quanto tempo você tem disponível por dia para se dedicar?" options={['1-2 horas', '3-4 horas', '5-6 horas', 'Dedicação integral']} selected={data.dailyAvailability} onChange={val => updateData('dailyAvailability', val as FormData['dailyAvailability'])} />
                </ConditionalWrapper>
            </div>
        </motion.div>
    );
};
