
import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedCheckboxGroup, AnimatedInput, AnimatedRadioGroup, ConditionalWrapper } from '../components';

export const Step3_PainsAndChallenges: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const difficulties = ['Não sei por onde começar', 'Vídeos ficam com qualidade ruim', 'Não sei editar', 'Falta de criatividade/ideias', 'Insegurança em mostrar meu trabalho', 'Falta de equipamento', 'Não sei usar iluminação/áudio', 'Falta de tempo', 'Outro'];
    const triedOptions = ['Sim, várias vezes', 'Sim, uma vez', 'Não, nunca tentei'];
    const whyFailedOptions = ['Conteúdo muito técnico/complicado', 'Falta de prática/exercícios', 'Não tive suporte quando precisei', 'Perdi a motivação no meio', 'Era muito teórico, pouca aplicação', 'Não vi resultados rápidos', 'Outro'];
    const whereTriedOptions = ['YouTube gratuito', 'Curso online pago', 'Curso presencial', 'Sozinho (tentativa e erro)', 'Com amigos/conhecidos', 'Livros/e-books'];

    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Suas Dores e Desafios</h2>
            <div className="space-y-8">
                <AnimatedCheckboxGroup label="Qual sua maior dificuldade com filmagem hoje? (máximo 3)" options={difficulties} selected={data.biggestDifficulty || []} onChange={val => updateData('biggestDifficulty', val)} max={3} error={errors?.biggestDifficulty} />
                <AnimatedInput type="textarea" label="Em uma frase, qual sua MAIOR frustração ao tentar criar vídeos?" value={data.biggestFrustration} onChange={e => updateData('biggestFrustration', e.target.value)} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Você já tentou aprender filmagem antes?" options={triedOptions} selected={data.triedLearning} onChange={val => updateData('triedLearning', val as FormData['triedLearning'])} error={errors?.triedLearning} />
                <ConditionalWrapper show={conditionalStates.showTriedLearningDetails}>
                    <AnimatedCheckboxGroup label="Por que você acha que não conseguiu os resultados esperados?" options={whyFailedOptions} selected={data.whyFailed || []} onChange={val => updateData('whyFailed', val)} error={errors?.whyFailed} />
                    <AnimatedCheckboxGroup label="Onde você tentou aprender?" options={whereTriedOptions} selected={data.whereTried || []} onChange={val => updateData('whereTried', val)} error={errors?.whereTried} />
                </ConditionalWrapper>
            </div>
        </motion.div>
    );
};
