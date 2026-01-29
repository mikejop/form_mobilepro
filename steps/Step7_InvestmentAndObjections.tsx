

import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedRadioGroup, AnimatedCheckboxGroup, AnimatedInput, ConditionalWrapper, AnimatedSlider } from '../components';

export const Step7_InvestmentAndObjections: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const hasInvestedOptions = ['Sim, várias vezes', 'Sim, uma vez', 'Não, nunca'];
    const investmentWillingness = ['Prefiro começar com gratuito', 'Até R$ 200', 'R$ 201 - R$ 500', 'R$ 501 - R$ 1.000', 'R$ 1.001 - R$ 2.000', 'Acima de R$ 2.000', 'Depende do que oferece'];
    const paymentPreferences = ['À vista (com desconto)', 'Parcelado em até 12x', 'Tanto faz'];
    const mainObjections = ['Falta de dinheiro', 'Falta de tempo', 'Medo de não conseguir', 'Não sei se vai funcionar para mim', 'Meu celular não é bom o suficiente', 'Já tentei antes e não deu certo', 'Não é prioridade no momento', 'Outra'];
    const learningFormats = ['Vídeo-aulas gravadas (assisto quando quiser)', 'Aulas ao vivo', 'Mentorias em grupo', 'Mentoria individual', 'Materiais escritos (PDFs/e-books)', 'Comunidade/grupo de alunos', 'Exercícios práticos com feedback'];
    const courseDurations = ['4 semanas (intensivo)', '8 semanas', '12 semanas (3 meses)', '6 meses', 'Acesso vitalício no meu ritmo'];
    const investmentSecurity = ['Garantia de satisfação (dinheiro de volta)', 'Depoimentos de alunos reais', 'Ver resultados comprovados', 'Testar antes de pagar (trial/demo)', 'Parcelamento facilitado', 'Suporte direto do instrutor', 'Certificado reconhecido', 'Comunidade ativa de alunos'];

    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Investimento e Objeções</h2>
            <div className="space-y-8">
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Você já investiu em equipamentos de filmagem?" options={hasInvestedOptions} selected={data.hasInvestedBefore} onChange={val => updateData('hasInvestedBefore', val as FormData['hasInvestedBefore'])} />
                <ConditionalWrapper show={conditionalStates.showInvestedBeforeDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Aproximadamente quanto você já investiu no total?" options={['Menos de R$ 500', 'R$ 500 - R$ 1.500', 'R$ 1.500 - R$ 3.000', 'R$ 3.000 - R$ 5.000', 'Acima de R$ 5.000']} selected={data.totalInvested} onChange={val => updateData('totalInvested', val as FormData['totalInvested'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você ficou satisfeito com esses investimentos?" options={['Sim, valeram muito a pena', 'Parcialmente', 'Não, me arrependo', 'Alguns sim, outros não']} selected={data.investmentSatisfaction} onChange={val => updateData('investmentSatisfaction', val as FormData['investmentSatisfaction'])} />
                </ConditionalWrapper>

                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Quanto você estaria disposto a investir em um curso COMPLETO?" options={investmentWillingness} selected={data.investmentWillingness} onChange={val => updateData('investmentWillingness', val as FormData['investmentWillingness'])} error={errors?.investmentWillingness} />
                <ConditionalWrapper show={conditionalStates.showHighInvestmentDetails}>
                     {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                     <AnimatedRadioGroup label="Você valoriza mais:" options={['Acompanhamento próximo e personalizado', 'Muito conteúdo/materiais', 'Resultados rápidos garantidos', 'Exclusividade e acesso VIP']} selected={data.premiumValue} onChange={val => updateData('premiumValue', val as FormData['premiumValue'])} />
                     {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                     <AnimatedRadioGroup label="Você teria interesse em mentoria individual?" options={['Sim, é o que procuro', 'Talvez, depende', 'Não, prefiro em grupo']} selected={data.mentorshipInterest} onChange={val => updateData('mentorshipInterest', val as FormData['mentorshipInterest'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showLowInvestmentDetails}>
                     <AnimatedInput type="textarea" label="O que faria você pensar duas vezes antes de investir em um treinamento?" value={data.freeLimitationReason || ''} onChange={e => updateData('freeLimitationReason', e.target.value)} />
                </ConditionalWrapper>

                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Você prefere investir:" options={paymentPreferences} selected={data.paymentPreference} onChange={val => updateData('paymentPreference', val as FormData['paymentPreference'])} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Se você precisasse começar hoje, agora, o que te impediria?" options={mainObjections} selected={data.mainObjection} onChange={val => updateData('mainObjection', val as FormData['mainObjection'])} error={errors?.mainObjection} />
                <ConditionalWrapper show={conditionalStates.showObjectionMoney}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se você pudesse parcelar em 12x sem juros, você conseguiria investir?" options={['Sim, facilmente', 'Sim, com planejamento', 'Não, mesmo assim está difícil']} selected={data.canPayInInstallments} onChange={val => updateData('canPayInInstallments', val as FormData['canPayInInstallments'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você vê isso como investimento (que traz retorno) ou gasto?" options={['Investimento que pode me dar retorno', 'Gasto que talvez valha a pena', 'Não tenho certeza']} selected={data.investmentOrExpense} onChange={val => updateData('investmentOrExpense', val as FormData['investmentOrExpense'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showObjectionFear}>
                    <AnimatedSlider label="Em uma escala de 1 a 10, quanto você acredita em você mesmo?" value={data.selfBeliefScale || 5} onChange={val => updateData('selfBeliefScale', val)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você já conseguiu aprender algo difícil no passado?" options={['Sim, várias coisas', 'Sim, algumas coisas', 'Não, sempre desisto']} selected={data.learnedDifficultThing} onChange={val => updateData('learnedDifficultThing', val as FormData['learnedDifficultThing'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se você tivesse suporte total e garantia de ajuda, você tentaria?" options={['Sim, com certeza', 'Provavelmente sim', 'Ainda teria receio']} selected={data.wouldTryWithSupport} onChange={val => updateData('wouldTryWithSupport', val as FormData['wouldTryWithSupport'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showObjectionTriedBefore}>
                    <AnimatedInput type="textarea" label="O que deu errado da última vez?" value={data.whatWentWrong} onChange={e => updateData('whatWentWrong', e.target.value)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você teve suporte adequado naquela tentativa?" options={['Sim, tive', 'Não, faltou suporte', 'Tinha mas não usei']} selected={data.hadAdequateSupport} onChange={val => updateData('hadAdequateSupport', val as FormData['hadAdequateSupport'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se o método fosse COMPLETAMENTE diferente, você tentaria de novo?" options={['Sim, daria outra chance', 'Talvez, dependendo', 'Não, já desisti']} selected={data.tryDifferentMethod} onChange={val => updateData('tryDifferentMethod', val as FormData['tryDifferentMethod'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showObjectionTime}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se houvesse um método de 15-20 minutos por dia, você conseguiria?" options={['Sim, isso eu consigo', 'Talvez, mas seria apertado', 'Não, nem isso tenho']} selected={data.canDo15minMethod} onChange={val => updateData('canDo15minMethod', val as FormData['canDo15minMethod'])} />
                </ConditionalWrapper>

                <AnimatedCheckboxGroup label="Qual formato de aprendizado você MAIS prefere? (escolher até 2)" options={learningFormats} selected={data.learningFormat || []} onChange={val => updateData('learningFormat', val)} max={2} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Qual a duração ideal de um curso para você?" options={courseDurations} selected={data.courseDuration} onChange={val => updateData('courseDuration', val as FormData['courseDuration'])} />
                <AnimatedCheckboxGroup label="O que te daria SEGURANÇA para investir em um curso? (máximo 3)" options={investmentSecurity} selected={data.investmentSecurity || []} onChange={val => updateData('investmentSecurity', val)} max={3} />
            </div>
        </motion.div>
    );
};
