
import React from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';
import { CameraIcon, LockIcon } from '../components';

export const Step1_Welcome: React.FC<StepProps> = ({ onSecretAccess, onApplyTemplate }) => {
    const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.shiftKey) {
            onApplyTemplate?.();
        } else {
            onSecretAccess?.();
        }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }} className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 2, -2, 0] }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full neumorphic-shadow-inset mb-8 cursor-default"
          onClick={handleLogoClick}
          title="Dica: Segure SHIFT e clique para preencher com dados de demonstração."
        >
          <CameraIcon className="w-12 h-12 text-indigo-400 opacity-90" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
        >
          Aprenda a criar vídeos de produtos que respiram profissionalismo.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto text-slate-600 mb-2"
        >
          Preencha os dados abaixo para liberar seu acesso imediato ao MobilePro Lab.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto text-slate-500 text-sm mb-6"
        >
          O preenchimento leva de 3 a 5 minutos e personaliza seu acesso aos simuladores e guias.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-sm text-slate-500 mb-8 space-y-2">
            <p className="flex items-center justify-center gap-2"><LockIcon className="w-4 h-4" /> Seus dados estão seguros conosco.</p>
        </motion.div>
      </motion.div>
    );
};
