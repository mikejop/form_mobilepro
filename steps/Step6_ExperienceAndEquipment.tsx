

import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedRadioGroup, AnimatedCheckboxGroup, AnimatedInput, ConditionalWrapper, AnimatedSlider } from '../components';

export const Step6_ExperienceAndEquipment: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const experienceLevels = ['Nunca filmei nada', 'Iniciante (filmo casualmente)', 'Intermediário (já produzi alguns vídeos)', 'Avançado (filmo regularmente)'];
    const interestDurations = ['Menos de 1 mês', '1-6 meses', '6 meses - 1 ano', 'Mais de 1 ano'];
    const technicalDifficulties = ['Iluminação', 'Áudio/som', 'Estabilização/movimento de câmera', 'Edição', 'Composição/enquadramento', 'Todas são difíceis', 'Nenhuma, domino o básico'];
    const equipment = ['Nenhum, só o celular', 'Tripé/suporte', 'Microfone externo', 'Ring light/iluminação', 'Gimbal/estabilizador', 'Lentes externas', 'Outro'];
    
    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Experiência e Equipamento</h2>
            <div className="space-y-8">
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Qual seu nível de experiência com filmagem?" options={experienceLevels} selected={data.experienceLevel} onChange={val => updateData('experienceLevel', val as FormData['experienceLevel'])} error={errors?.experienceLevel} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Há quanto tempo você tem interesse em filmar profissionalmente?" options={interestDurations} selected={data.interestDuration} onChange={val => updateData('interestDuration', val as FormData['interestDuration'])} />
                <AnimatedInput label="Qual modelo de celular você usa?" value={data.phoneModel} onChange={e => updateData('phoneModel', e.target.value)} error={errors?.phoneModel} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Você já criou algum tipo de vídeo?" options={['Sim, vários', 'Sim, alguns', 'Não, nunca']} selected={data.createdVideosBefore} onChange={val => updateData('createdVideosBefore', val as FormData['createdVideosBefore'])} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Qual sua MAIOR dificuldade técnica?" options={technicalDifficulties} selected={data.biggestTechnicalDifficulty} onChange={val => updateData('biggestTechnicalDifficulty', val as FormData['biggestTechnicalDifficulty'])} error={errors?.biggestTechnicalDifficulty} />
                <AnimatedCheckboxGroup label="Você tem algum equipamento além do celular?" options={equipment} selected={data.additionalEquipment || []} onChange={val => updateData('additionalEquipment', val)} />

                <ConditionalWrapper show={conditionalStates.showNewbieDetails}>
                    <AnimatedCheckboxGroup label="O que te impede de começar HOJE? (máximo 3)" options={['Medo de errar', 'Não sei usar a câmera do celular', 'Vergonha/insegurança', 'Não tenho equipamento', 'Não sei o que filmar', 'Não tenho tempo', 'Outro']} selected={data.whatStopsYouNow || []} onChange={val => updateData('whatStopsYouNow', val)} max={3} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você tem medo de aparecer em vídeos?" options={['Sim, muita vergonha', 'Um pouco', 'Não, não me importo', 'Prefiro filmar sem aparecer']} selected={data.fearOfAppearing} onChange={val => updateData('fearOfAppearing', val as FormData['fearOfAppearing'])} />
                    <AnimatedSlider label="Em uma escala de 1 a 10, quanto a tecnologia te intimida?" value={data.techIntimidation || 5} onChange={val => updateData('techIntimidation', val)} />
                </ConditionalWrapper>

                <ConditionalWrapper show={conditionalStates.showBeginnerIntermediateDetails}>
                    <AnimatedCheckboxGroup label="Que tipo de vídeo você já criou?" options={['Vídeos pessoais/família', 'Conteúdo para redes sociais', 'Vídeos para trabalho/empresa', 'Eventos', 'Experimentos/testes', 'Outro']} selected={data.pastVideoTypes || []} onChange={val => updateData('pastVideoTypes', val)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual software/app de edição você usa ou já usou?" options={['Nenhum', 'InShot', 'CapCut', 'Adobe Premiere (mobile ou desktop)', 'iMovie', 'DaVinci Resolve', 'Outro']} selected={data.editingSoftware} onChange={val => updateData('editingSoftware', val as FormData['editingSoftware'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="O que você mais quer melhorar nos seus vídeos?" options={['Qualidade visual (imagem)', 'Qualidade de áudio', 'Edição/cortes/transições', 'Storytelling/narrativa', 'Engajamento/views', 'Tudo']} selected={data.whatToImproveInVideos} onChange={val => updateData('whatToImproveInVideos', val as FormData['whatToImproveInVideos'])} />
                </ConditionalWrapper>

                <ConditionalWrapper show={conditionalStates.showAdvancedDetails}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você já monetizou com vídeos?" options={['Sim, é minha principal renda', 'Sim, é renda extra', 'Não, mas quero', 'Não tenho interesse']} selected={data.monetizedBefore} onChange={val => updateData('monetizedBefore', val as FormData['monetizedBefore'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Quantos vídeos você produz por mês em média?" options={['1-5 vídeos', '6-15 vídeos', '16-30 vídeos', 'Mais de 30 vídeos']} selected={data.videosPerMonth} onChange={val => updateData('videosPerMonth', val as FormData['videosPerMonth'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual seu maior gargalo para evoluir?" options={['Falta de conhecimento técnico avançado', 'Equipamento limitado', 'Falta de criatividade/ideias', 'Gestão de tempo/produtividade', 'Conseguir clientes', 'Precificação/vendas']} selected={data.evolutionBottleneck} onChange={val => updateData('evolutionBottleneck', val as FormData['evolutionBottleneck'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você quer se especializar ou ser generalista?" options={['Especializar em um nicho', 'Ser generalista (fazer de tudo)', 'Ainda não sei']} selected={data.specializeOrGeneralize} onChange={val => updateData('specializeOrGeneralize', val as FormData['specializeOrGeneralize'])} />
                </ConditionalWrapper>
                
                <ConditionalWrapper show={conditionalStates.showOldPhoneWarning}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você pretende trocar de celular em breve?" options={['Sim, nos próximos meses', 'Talvez', 'Não, vou usar o que tenho']} selected={data.willChangePhone} onChange={val => updateData('willChangePhone', val as FormData['willChangePhone'])} />
                </ConditionalWrapper>
            </div>
        </motion.div>
    );
};
