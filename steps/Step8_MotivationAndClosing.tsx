import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedRadioGroup, AnimatedInput, ConditionalWrapper, AnimatedSlider } from '../components';

export const Step8_MotivationAndClosing: React.FC<StepProps> = ({ data, updateData, conditionalStates, errors }) => {
    const mainMotivations = ['Independência financeira', 'Realização pessoal', 'Reconhecimento profissional', 'Ajudar pessoas com meu conteúdo', 'Expressar criatividade', 'Sair do emprego atual', 'Deixar um legado', 'Provar para mim mesmo', 'Outra'];
    const resultsTimeframes = ['Nos próximos 30 dias', 'Em 2-3 meses', 'Em 6 meses', 'Em 1 ano', 'Não tenho pressa'];
    const wouldStartOptions = ['Sim, começaria hoje mesmo', 'Talvez, preciso saber mais', 'Não, ainda não é o momento'];

    return (
        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
            <h2 className="text-2xl font-bold text-center mb-8">Motivação e Fechamento</h2>
            <div className="space-y-8">
                <AnimatedSlider label="Em uma escala de 1 a 10, qual sua MOTIVAÇÃO para começar agora?" value={data.motivationScale || 5} onChange={val => updateData('motivationScale', val)} error={errors?.motivationScale} />
                <ConditionalWrapper show={conditionalStates.showMotivationHigh}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se todas as suas objeções fossem resolvidas AGORA, você começaria esta semana?" options={['Sim, com certeza', 'Provavelmente sim', 'Ainda teria dúvidas']} selected={data.wouldTryWithSupport} onChange={val => updateData('wouldTryWithSupport', val as FormData['wouldTryWithSupport'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showMotivationMedium}>
                    <AnimatedInput type="textarea" label="O que aumentaria sua motivação para 10?" value={data.biggestFrustration} onChange={e => updateData('biggestFrustration', e.target.value)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você está esperando o 'momento certo' ou tem outra razão?" options={['Estou esperando ter mais tempo', 'Estou esperando ter mais dinheiro', 'Estou esperando ter mais confiança', 'Estou só pesquisando ainda', 'Outra razão']} selected={data.mainObjection} onChange={val => updateData('mainObjection', val as FormData['mainObjection'])} />
                </ConditionalWrapper>
                 <ConditionalWrapper show={conditionalStates.showMotivationLow}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Se sua motivação está baixa, por que você está fazendo essa pesquisa?" options={['Alguém me indicou', 'Só estou curioso', 'Quero saber mais antes de me animar', 'Não sei, vim por acaso']} selected={data.mainObjection} onChange={val => updateData('mainObjection', val as FormData['mainObjection'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você REALMENTE quer aprender filmagem ou está só 'dando uma olhada'?" options={['Realmente quero, mas estou inseguro', 'Estou pesquisando, sem compromisso', 'Não tenho certeza ainda']} selected={data.wouldTryWithSupport} onChange={val => updateData('wouldTryWithSupport', val as FormData['wouldTryWithSupport'])} />
                    <AnimatedInput type="textarea" label="O que teria que acontecer para você ficar MUITO motivado?" value={data.successMeaning} onChange={e => updateData('successMeaning', e.target.value)} />
                </ConditionalWrapper>

                <AnimatedRadioGroup label="Qual a PRINCIPAL razão que te motiva?" options={mainMotivations} selected={data.mainMotivationReason} onChange={val => updateData('mainMotivationReason', val)} />
                <ConditionalWrapper show={conditionalStates.showMotivationFinancial}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual seria sua renda mensal ideal com filmagem?" options={['R$ 2.000 - R$ 5.000', 'R$ 5.000 - R$ 10.000', 'R$ 10.000 - R$ 20.000', 'Acima de R$ 20.000']} selected={data.idealIncome} onChange={val => updateData('idealIncome', val as FormData['idealIncome'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Em quanto tempo você quer atingir essa renda?" options={['3-6 meses', '6-12 meses', '1-2 anos', 'Sem prazo definido']} selected={data.incomeTimeframe} onChange={val => updateData('incomeTimeframe', val as FormData['incomeTimeframe'])} />
                </ConditionalWrapper>
                <ConditionalWrapper show={conditionalStates.showMotivationJobHate}>
                    <AnimatedSlider label="Em uma escala de 1 a 10, quanto você ODEIA seu emprego atual?" value={data.hateJobScale || 5} onChange={val => updateData('hateJobScale', val)} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você tem um prazo mental para sair?" options={['Sim, quero sair em até 6 meses', 'Sim, até 1 ano', 'Não tenho prazo, quando der', 'Não vou sair, só complementar renda']} selected={data.exitTimeframe} onChange={val => updateData('exitTimeframe', val as FormData['exitTimeframe'])} />
                </ConditionalWrapper>

                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Em quanto tempo você quer ver os primeiros resultados?" options={resultsTimeframes} selected={data.resultsTimeframe} onChange={val => updateData('resultsTimeframe', val as FormData['resultsTimeframe'])} />
                <ConditionalWrapper show={conditionalStates.showMotivationFastResults}>
                     {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                     <AnimatedRadioGroup label="Você tem disponibilidade para se dedicar intensamente nesse período?" options={['Sim, posso me dedicar full', 'Sim, algumas horas por dia', 'Não muito, mas vou tentar']} selected={data.intensiveAvailability} onChange={val => updateData('intensiveAvailability', val as FormData['intensiveAvailability'])} />
                </ConditionalWrapper>

                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Se você tivesse acesso HOJE a um método comprovado, você começaria imediatamente?" options={wouldStartOptions} selected={data.wouldStartToday} onChange={val => updateData('wouldStartToday', val as FormData['wouldStartToday'])} />
                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Você gostaria de receber materiais GRATUITOS?" options={['Sim, quero tudo que puder me ajudar', 'Sim, mas sem spam', 'Não, obrigado']} selected={data.wantsFreeMaterials} onChange={val => updateData('wantsFreeMaterials', val as FormData['wantsFreeMaterials'])} error={errors?.wantsFreeMaterials} />
                <ConditionalWrapper show={conditionalStates.showWantsFreebies}>
                     <AnimatedRadioGroup label="Qual tipo de material gratuito te ajudaria MAIS agora?" options={['E-book: "Primeiros passos"', 'Checklist: "Equipamentos essenciais"', 'Vídeo-aula: "Seu primeiro vídeo"', 'Template: "10 ideias de vídeos"', 'Grupo VIP: Comunidade', 'Mini-curso: 5 dias de desafios']} selected={data.preferredFreebie} onChange={val => updateData('preferredFreebie', val)} />
                </ConditionalWrapper>

                {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                <AnimatedRadioGroup label="Podemos entrar em contato para apresentar uma solução personalizada para você?" options={['Sim, pode entrar em contato', 'Talvez, dependendo da proposta', 'Não, prefiro só o material gratuito']} selected={data.allowContact} onChange={val => updateData('allowContact', val as FormData['allowContact'])} />
                 <ConditionalWrapper show={conditionalStates.showContactAllowed}>
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual a melhor forma de contato?" options={['WhatsApp', 'Ligação telefônica', 'E-mail', 'Instagram Direct']} selected={data.contactMethod} onChange={val => updateData('contactMethod', val as FormData['contactMethod'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Qual melhor horário para entrar em contato?" options={['Manhã (8h-12h)', 'Tarde (12h-18h)', 'Noite (18h-22h)', 'Qualquer horário']} selected={data.contactTime} onChange={val => updateData('contactTime', val as FormData['contactTime'])} />
                    {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                    <AnimatedRadioGroup label="Você prefere:" options={['Ver proposta por mensagem primeiro', 'Ter uma conversa rápida (15 min)', 'Agendar reunião mais longa (30-45 min)']} selected={data.proposalPreference} onChange={val => updateData('proposalPreference', val as FormData['proposalPreference'])} />
                    <AnimatedSlider label="Qual a probabilidade de você investir em um curso nos próximos 30 dias?" value={data.investmentLikelihood || 5} onChange={val => updateData('investmentLikelihood', val)} />
                </ConditionalWrapper>
                <ConditionalWrapper show={conditionalStates.showContactMaybe}>
                     {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
                     <AnimatedRadioGroup label="O que te faria mudar para 'SIM'?" options={['Ver cases de sucesso', 'Entender melhor a proposta', 'Saber o preço exato', 'Ter garantia de resultado', 'Conhecer o instrutor', 'Outro']} selected={data.whatWouldMakeItYes} onChange={val => updateData('whatWouldMakeItYes', val as FormData['whatWouldMakeItYes'])} />
                </ConditionalWrapper>
                 <AnimatedInput type="textarea" label="Tem algo mais que você gostaria de compartilhar ou perguntar?" value={data.finalComments} onChange={e => updateData('finalComments', e.target.value)} />
            </div>
        </motion.div>
    );
};
