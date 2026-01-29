
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';
import { AnimatedButton, SpinnerIcon, InstagramIcon, YouTubeIcon } from '../components';

const InfoRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div className="py-3 px-4 flex justify-between items-center">
        <span className="font-medium text-slate-500">{label}</span>
        <span className="font-semibold text-slate-800 text-right">{value || 'Não preenchido'}</span>
    </div>
);

const SocialLink: React.FC<{ href: string, icon: React.ReactNode }> = ({ href, icon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -3 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-12 h-12 rounded-full flex items-center justify-center neumorphic-shadow text-slate-600 hover:text-indigo-500"
    >
        {icon}
    </motion.a>
);

export const Step9_SummaryAndSubmit: React.FC<StepProps> = ({ data, onPrev, onNext }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onNext();
        // O isSubmitting não precisa ser setado para false porque a tela vai mudar.
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Revise suas informações</h2>
        <p className="text-center text-slate-600 mb-8">
            Confirme se seus dados de contato estão corretos antes de finalizar.
        </p>

        <div className="bg-[#e0e5ec] rounded-2xl neumorphic-shadow-inset divide-y divide-slate-300/50 mb-10">
            <InfoRow label="Nome" value={data.firstName} />
            <InfoRow label="Sobrenome" value={data.lastName} />
            <InfoRow label="E-mail" value={data.email} />
        </div>

        <div className="text-center mb-10">
            <p className="text-slate-600 font-medium mb-4">Acompanhe nosso trabalho</p>
            <div className="flex justify-center items-center gap-6">
                <SocialLink href="https://tiktok.com/@mike_flmmkr" icon={<img src="https://static.vecteezy.com/system/resources/previews/022/227/329/non_2x/tiktok-logo-icon-free-png.png" alt="TikTok" className="w-6 h-6" />} />
                <SocialLink href="http://instagram.com/mike_flmmkr" icon={<InstagramIcon className="w-6 h-6" />} />
                <SocialLink href="https://www.youtube.com/@mikeflmmkr" icon={<YouTubeIcon className="w-6 h-6" />} />
                <SocialLink href="https://michaeloliveira.online" icon={<img src="https://cdn-icons-png.flaticon.com/512/54/54560.png" alt="Portfolio" className="w-6 h-6" />} />
            </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            <AnimatedButton onClick={onPrev} variant="secondary" disabled={isSubmitting}>
                Editar Respostas
            </AnimatedButton>
            <AnimatedButton onClick={handleSubmit} isLoading={isSubmitting}>
                Enviar e Receber Acesso
                { isSubmitting && <SpinnerIcon className="w-5 h-5 ml-2" /> }
            </AnimatedButton>
        </div>
      </motion.div>
    );
};