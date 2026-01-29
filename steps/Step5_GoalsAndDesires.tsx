

import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedRadioGroup, AnimatedCheckboxGroup, AnimatedInput, ConditionalWrapper } from '../components';

export const Step5_GoalsAndDesires: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const mainGoals = ['Criar conteúdo para redes sociais', 'Gerar renda extra', 'Mudar de profissão completamente', 'Criar conteúdo para meu negócio', 'Hobby/desenvolvimento pessoal', 'Outro'];
    const niches = ['Marketing digital/Publicidade', 'Eventos (casamentos, festas)', 'Jornalismo/Documentário', 'Entretenimento (vlogs, comédia)', 'Educação online (cursos, aulas)', 'Moda/Lifestyle', 'Gastronomia', 'Viagens', 'Esportes/Fitness', 'Outro'];
    const timePerWeek = ['Menos de 3 horas', '3-5 horas', '5-10 horas', 'Mais de 10 horas', 'Dedicação integral (20h+)'];

    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Desejos e Objetivos</h2>
            <div className="space-y-8">
                <AnimatedRadioGroup label="Qual seu PRINCIPAL objetivo ao aprender filmagem profissional?" options={mainGoals} selected={data.mainGoal} onChange={val => updateData('mainGoal', val)} error={errors?.mainGoal} />
                <AnimatedCheckboxGroup label="Qual nicho te interessa MAIS? (escolher até 2)" options={niches} selected={data.interestedNiches || []} onChange={val => updateData('interestedNiches', val)} max={2} error={errors?.interestedNiches} />
                <AnimatedInput type="textarea" label="Em 6 meses, qual resultado você quer ter alcançado?" value={data.sixMonthGoal} onChange={e => updateData('sixMonthGoal', e.target.value)} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Quanto tempo por semana você pode dedicar ao aprendizado?" options={timePerWeek} selected={data.timePerWeek} onChange={val => updateData('timePerWeek', val as FormData['timePerWeek'])} />
                <AnimatedInput label="Quem são suas maiores inspirações na criação de conteúdo do seu nicho? (Opicional)" value={data.inspirations} onChange={e => updateData('inspirations', e.target.value)} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Quanto você gasta hoje com produção de conteúdo/marketing?" options={['Não gasto nada', 'Até R$ 500/mês', 'R$ 500 - R$ 2.000/mês', 'Acima de R$ 2.000/mês']} selected={data.currentMarketingSpend} onChange={val => updateData('currentMarketingSpend', val as FormData['currentMarketingSpend'])} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Se você criasse seus próprios vídeos, você:" options={['Economizaria dinheiro', 'Teria mais controle criativo', 'Produziria com mais frequência', 'Todas as opções acima']} selected={data.videoCreationBenefit} onChange={val => updateData('videoCreationBenefit', val as FormData['videoCreationBenefit'])} />
                
                <ConditionalWrapper show={conditionalStates.showSocialMediaDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você já tem audiência em alguma rede social?" options={['Sim, mais de 10k seguidores', 'Sim, entre 1k-10k seguidores', 'Sim, menos de 1k seguidores', 'Não, vou começar do zero']} selected={data.audienceSize} onChange={val => updateData('audienceSize', val as FormData['audienceSize'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual plataforma é sua PRIORIDADE?" options={['Instagram (Reels/Stories)', 'TikTok', 'YouTube (Shorts/Vídeos longos)', 'LinkedIn', 'Facebook', 'Múltiplas plataformas']} selected={data.priorityPlatform} onChange={val => updateData('priorityPlatform', val as FormData['priorityPlatform'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Seu objetivo principal é:" options={['Crescer audiência/viralizar', 'Vender produtos/serviços', 'Educar/ensinar', 'Entreter', 'Construir autoridade']} selected={data.socialMediaGoal} onChange={val => updateData('socialMediaGoal', val as FormData['socialMediaGoal'])} />
                </ConditionalWrapper>

                <ConditionalWrapper show={conditionalStates.showExtraIncomeDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual sua meta de renda mensal com filmagem?" options={['R$ 500 - R$ 1.500', 'R$ 1.500 - R$ 3.000', 'R$ 3.000 - R$ 5.000', 'Acima de R$ 5.000']} selected={data.extraIncomeGoal} onChange={val => updateData('extraIncomeGoal', val as FormData['extraIncomeGoal'])} />
                    <AnimatedCheckboxGroup label="Como você pretende monetizar?" options={['Prestar serviço de filmagem (eventos, comerciais)', 'Criar e vender cursos online', 'Monetização de plataformas (YouTube, etc)', 'Parcerias/publicidade', 'Vender produtos através de vídeos', 'Ainda não sei']} selected={data.monetizationMethods || []} onChange={val => updateData('monetizationMethods', val)} />
                </ConditionalWrapper>

                <ConditionalWrapper show={conditionalStates.showCareerChangeDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você quer fazer essa mudança em quanto tempo?" options={['Nos próximos 3 meses (urgente)', '3-6 meses', '6-12 meses', 'Mais de 1 ano (sem pressa)']} selected={data.careerChangeTimeframe} onChange={val => updateData('careerChangeTimeframe', val as FormData['careerChangeTimeframe'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você tem reserva financeira para o período de transição?" options={['Sim, tenho reserva confortável', 'Tenho um pouco', 'Não tenho, preciso gerar renda logo']} selected={data.transitionReserve} onChange={val => updateData('transitionReserve', val as FormData['transitionReserve'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual sua maior preocupação nessa mudança?" options={['Instabilidade financeira', 'Medo de não conseguir clientes', 'Família/pessoas próximas não apoiam', 'Idade (achar que é tarde demais)', 'Falta de experiência', 'Outro']} selected={data.careerChangeWorry} onChange={val => updateData('careerChangeWorry', val as FormData['careerChangeWorry'])} />
                </ConditionalWrapper>

            </div>
        </motion.div>
    );
};
