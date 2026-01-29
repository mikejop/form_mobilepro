
import React from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';
import { Confetti, CheckCircleIcon, AnimatedButton, BeakerIcon } from '../components';

export const SuccessScreen: React.FC<StepProps> = ({ data, onReset }) => {
    return (
        <div className="relative">
          <Confetti />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }} className="text-center"
          >
            <div className="inline-block p-4 rounded-full neumorphic-shadow mb-8 bg-green-100">
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Inscrição Confirmada!</h1>
            <p className="max-w-2xl mx-auto text-slate-600 mb-8">
                Enviamos um e-mail para <strong className="text-indigo-600">{data.email}</strong> com um link para você definir sua senha e acessar o portal.
            </p>

            <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-700 mb-6">Acesse agora:</h2>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
                    {/* Card 1: Treinamento */}
                    <motion.a 
                        href="https://mobilepro.framer.website"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="flex-1 flex flex-col neumorphic-shadow rounded-2xl overflow-hidden text-left"
                    >
                        <img src="https://i.imgur.com/QguH7Mz.png" alt="Treinamento Mobile Pro" className="w-full h-40 object-cover"/>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-800 text-lg">Treinamento Mobile Pro</h3>
                            <p className="text-sm text-slate-600 mt-1 flex-1">Acesse a plataforma de aulas.</p>
                            <span className="mt-4 font-semibold text-indigo-600 self-start">Acessar Treinamento &rarr;</span>
                        </div>
                    </motion.a>

                    {/* Card 2: Material de Apoio */}
                    <motion.a
                        href="https://mobilepro-v0-95-beta-250033091453.us-west1.run.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="flex-1 flex flex-col neumorphic-shadow rounded-2xl overflow-hidden text-left"
                    >
                        <img src="https://i.imgur.com/XkPwPT1.png" alt="Material de Apoio (Lab)" className="w-full h-40 object-cover"/>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-800 text-lg">Material de Apoio (Lab)</h3>
                            <p className="text-sm text-slate-600 mt-1 flex-1">Guias, simuladores e mais.</p>
                            <span className="mt-4 font-semibold text-indigo-600 self-start">Acessar o Lab &rarr;</span>
                        </div>
                    </motion.a>
                </div>
            </div>

             {onReset && (
              <AnimatedButton onClick={onReset}>
                Voltar ao Início
              </AnimatedButton>
            )}
        </motion.div>
        </div>
    );
};