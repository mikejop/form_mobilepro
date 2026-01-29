import React from 'react';
import { motion } from 'framer-motion';
import { StepProps, FormData } from '../types';
import { AnimatedInput, AnimatedRadioGroup, ConditionalWrapper } from '../components';

export const Step2_BasicData: React.FC<StepProps> = ({ data, updateData, errors, conditionalStates }) => {
  const genders = ['Masculino', 'Feminino', 'Não-binário', 'Prefiro não informar'];
  const ageRanges = ['Menos de 18', '18-24', '25-34', '35-44', '45-54', '55+'];
  const ddiOptions = [
    { label: '🇧🇷 +55', value: '+55' },
    { label: '🇵🇹 +351', value: '+351' },
    { label: '🇺🇸 +1', value: '+1' },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedPhone = (value: string) => {
      const digits = value.replace(/\D/g, '').substring(0, 11);
      if (!digits) return '';
  
      const len = digits.length;
      if (len <= 2) return `(${digits}`;
      if (len <= 6) return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
      if (len <= 10) return `(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`;
      return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
    };
    
    updateData('phone', maskedPhone(e.target.value));
  };
  
  return (
    <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
      <h2 className="text-2xl font-bold text-center mb-8">Dados Básicos</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedInput label="Nome" value={data.firstName} onChange={e => updateData('firstName', e.target.value)} error={errors?.firstName} />
          <AnimatedInput label="Sobrenome" value={data.lastName} onChange={e => updateData('lastName', e.target.value)} error={errors?.lastName} />
        </div>
        <AnimatedInput label="E-mail" type="email" value={data.email} onChange={e => updateData('email', e.target.value)} error={errors?.email} />
        
        <motion.div 
            className="relative"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        >
            <label className="text-sm font-medium text-slate-600 mb-2 block">Telefone (opcional)</label>
            <div className="flex items-center gap-2">
                <div className="relative w-28">
                     <select
                        value={data.phoneDDI || '+55'}
                        onChange={e => updateData('phoneDDI', e.target.value)}
                        className="w-full bg-transparent p-3 rounded-lg neumorphic-shadow-concave focus:outline-none transition-shadow duration-300 appearance-none h-12 text-center text-slate-800"
                     >
                        {ddiOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                     </select>
                </div>
                <div className="flex-grow relative">
                  <input
                    type="tel"
                    value={data.phone || ''}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-transparent p-3 rounded-lg neumorphic-shadow-concave focus:outline-none transition-shadow duration-300 h-12 focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
            </div>
            {errors?.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
        </motion.div>

        <AnimatedRadioGroup label="Gênero" options={genders} selected={data.gender} onChange={val => updateData('gender', val)} error={errors?.gender} />
        <AnimatedRadioGroup label="Idade (faixa etária)" options={ageRanges} selected={data.ageRange} onChange={val => updateData('ageRange', val)} error={errors?.ageRange} />
        <ConditionalWrapper show={conditionalStates.showParentalAuth}>
          {/* FIX: Cast `val` to the expected union type to resolve type mismatch. */}
          <AnimatedRadioGroup label="Você tem autorização dos seus pais/responsáveis?" options={['Sim', 'Não']} selected={data.parentalAuth} onChange={val => updateData('parentalAuth', val as FormData['parentalAuth'])} />
        </ConditionalWrapper>
      </div>
    </motion.div>
  );
};
