
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper for conditional class names
const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- ICONS ---
export const CameraIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
  </svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const LockIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const SpinnerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={cx("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const TikTokIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.56-1.87-7.15.42-2.52 2.16-4.75 4.38-5.83 2.22-1.08 4.79-1.01 7.02.16v3.77c-1.33-.42-2.73-.28-3.92.35-1.19.63-2.12 1.74-2.32 3.02-.19 1.28.28 2.67 1.11 3.56.83.89 2.09 1.26 3.28 1.16.02-2.86-.01-5.71.01-8.57Z"/>
    </svg>
);

export const InstagramIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

export const GlobeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9"/>
    </svg>
);

export const BeakerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.443 2.216a2 2 0 001.022.547l2.387.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387-.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.443-2.216z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
);


// --- COMPONENTS ---

export const NeumorphicContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cx('neumorphic-shadow', className)}>
    {children}
  </div>
);

// AnimatedButton
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}
export const AnimatedButton: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, className, ...props }) => {
  const isPrimary = variant === 'primary';
  return (
    <motion.button
      whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={isLoading}
      className={cx(
        'relative font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center',
        isPrimary 
          ? 'neumorphic-shadow text-white neumorphic-gradient-cta hover:neumorphic-gradient-cta-hover active:neumorphic-shadow-inset'
          : 'neumorphic-shadow-concave text-slate-600 hover:text-indigo-500 active:neumorphic-shadow-inset',
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? 'Processando...' : children}
    </motion.button>
  );
};


// AnimatedInput
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  // FIX: Added 'password' to the list of allowed types for the input component.
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'password';
}
export const AnimatedInput: React.FC<InputProps> = ({ label, error, type = 'text', value, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(value);
    const isError = Boolean(error);
    const id = label.replace(/\s+/g, '-').toLowerCase();
    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return (
        <motion.div 
            className={cx("relative", isError && "animate-shake")}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        >
            <motion.label
                htmlFor={id}
                className="absolute left-4 transition-all duration-300 ease-in-out text-slate-500 pointer-events-none"
                animate={{
                    y: isFocused || hasValue ? -8 : (type === 'textarea' ? 12 : 14),
                    scale: isFocused ? 0.65 : (hasValue ? 0.75 : 1),
                    opacity: isFocused ? 0.6 : 1,
                    backgroundColor: '#e0e5ec',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                }}
            >
                {label}
            </motion.label>
            <InputComponent
                id={id}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cx(
                    "w-full bg-transparent p-3 rounded-lg neumorphic-shadow-concave focus:outline-none transition-shadow duration-300",
                    type === 'textarea' ? 'min-h-[120px] resize-y' : 'h-12',
                    isError ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-indigo-400',
                    props.disabled && 'opacity-60 cursor-not-allowed bg-slate-50'
                )}
                {...props}
            />
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// AnimatedRadioGroup
interface RadioGroupProps {
    label: string;
    options: (string | { label: string, value: string })[];
    selected: string | undefined;
    onChange: (value: string) => void;
    error?: string;
    variant?: 'pills' | 'buttons';
}
export const AnimatedRadioGroup: React.FC<RadioGroupProps> = ({ label, options, selected, onChange, error, variant = 'pills' }) => {
    const isButtons = variant === 'buttons';
    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <p className={cx("text-sm font-medium text-slate-600 mb-2", error && 'text-red-500', isButtons && 'mb-3')}>
                {label}
            </p>
            <div className={cx("flex flex-wrap gap-2", isButtons && "gap-4")}>
                {options.map(optionObj => {
                    const option = typeof optionObj === 'string' ? optionObj : optionObj.value;
                    const optionLabel = typeof optionObj === 'string' ? optionObj : optionObj.label;
                    return (
                        <motion.div key={option} whileTap={{ scale: 0.95 }}>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name={label} value={option} checked={selected === option} onChange={() => onChange(option)} className="sr-only" />
                                <motion.div
                                    className={cx(
                                        'transition-all duration-300 font-medium',
                                        isButtons 
                                            ? 'px-10 py-2 rounded-lg text-sm' 
                                            : 'px-3 py-1.5 rounded-md text-xs',
                                        selected === option
                                            ? isButtons
                                                ? 'neumorphic-shadow-inset neumorphic-gradient-cta text-white'
                                                : 'neumorphic-shadow-inset bg-indigo-100 text-indigo-700'
                                            : isButtons
                                                ? 'neumorphic-shadow hover:text-indigo-500'
                                                : 'neumorphic-shadow hover:neumorphic-shadow-inset'
                                    )}
                                >
                                    {optionLabel}
                                </motion.div>
                            </label>
                        </motion.div>
                    )
                })}
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// AnimatedCheckboxGroup
interface CheckboxGroupProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
    max?: number;
    error?: string;
}
export const AnimatedCheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selected, onChange, max, error }) => {
    const handleChange = (option: string) => {
        const isSelected = selected.includes(option);
        if (!isSelected && max && selected.length >= max) {
            return; // Limit reached
        }
        const newSelected = isSelected
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <p className={cx("text-sm font-medium text-slate-600 mb-2", error && "text-red-500")}>{label}</p>
            <div className="flex flex-wrap gap-2">
                {options.map(option => {
                    const isSelected = selected.includes(option);
                    const isDisabled = !isSelected && max && selected.length >= max;
                    return (
                        <motion.div key={option} whileTap={{ scale: isDisabled ? 1 : 0.95 }}>
                            <label className={cx("flex items-center", isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer")}>
                                <input type="checkbox" checked={isSelected} onChange={() => handleChange(option)} className="sr-only" disabled={isDisabled} />
                                <motion.div
                                    className={cx(
                                        'flex items-center px-3 py-1.5 rounded-md transition-all duration-300 text-xs font-medium',
                                        isSelected
                                            ? 'neumorphic-shadow-inset bg-indigo-100 text-indigo-700'
                                            : 'neumorphic-shadow hover:neumorphic-shadow-inset'
                                    )}
                                >
                                    <AnimatePresence>
                                    {isSelected && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mr-2">
                                            <CheckIcon className="w-3 h-3" />
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                    {option}
                                </motion.div>
                            </label>
                        </motion.div>
                    );
                })}
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// AnimatedSlider
interface SliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    error?: string;
}
export const AnimatedSlider: React.FC<SliderProps> = ({ label, value, onChange, min = 1, max = 10, error }) => {
    const emojis = ['😠', '🙁', '😐', '🤔', '🙂', '😀', '😄', '🤩', '🔥', '🚀'];
    const progress = ((value - min) / (max - min)) * 100;
    const emoji = emojis[value - 1] || '🚀';
    const [isActive, setIsActive] = useState(false);

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <label className={cx("font-medium mb-3 text-slate-600 block", error && 'text-red-500')}>{label}</label>
            <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={value}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl"
                    >
                        {emoji}
                    </motion.span>
                </AnimatePresence>
                <div className="w-full relative group flex items-center h-8">
                    {/* Track */}
                    <div className="w-full h-2 rounded-full neumorphic-shadow-inset absolute top-1/2 -translate-y-1/2">
                        {/* Progress fill */}
                        <motion.div 
                            className="h-full rounded-full neumorphic-gradient-cta"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                        />
                    </div>

                    {/* Thumb */}
                    <motion.div
                        className="w-5 h-5 rounded-full neumorphic-shadow bg-[#e0e5ec] absolute top-1/2 pointer-events-none"
                        style={{
                            left: `${progress}%`,
                        }}
                        initial={false}
                        animate={{ 
                            scale: isActive ? 1.2 : 1,
                            x: '-50%',
                            y: '-50%',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                    </motion.div>
                    
                    {/* Invisible range input */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={e => onChange(parseInt(e.target.value, 10))}
                        onMouseDown={() => setIsActive(true)}
                        onMouseUp={() => setIsActive(false)}
                        onTouchStart={() => setIsActive(true)}
                        onTouchEnd={() => setIsActive(false)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <span className="font-bold text-lg w-8 text-center">{value}</span>
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// AnimatedSelect
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: string[];
    error?: string;
    placeholder?: string;
}
export const AnimatedSelect: React.FC<SelectProps> = ({ label, options, error, placeholder, value, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(value);
    const isError = Boolean(error);
    const id = label.replace(/\s+/g, '-').toLowerCase();

    return (
        <motion.div
            className={cx("relative", isError && "animate-shake")}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        >
            <motion.label
                htmlFor={id}
                className="absolute left-4 transition-all duration-300 ease-in-out text-slate-500 pointer-events-none z-10"
                animate={{
                    y: isFocused || hasValue ? -8 : 14,
                    scale: isFocused || hasValue ? 0.75 : 1,
                    backgroundColor: '#e0e5ec',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                }}
            >
                {label}
            </motion.label>
            <div className="relative">
                <select
                    id={id}
                    value={value || ''}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cx(
                        "w-full bg-transparent p-3 rounded-lg neumorphic-shadow-concave focus:outline-none transition-shadow duration-300 appearance-none h-12",
                        error ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-indigo-400',
                        !value ? 'text-slate-400' : 'text-slate-800',
                        props.disabled && 'opacity-60 cursor-not-allowed bg-slate-50'
                    )}
                    {...props}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                </div>
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// AnimatedToggleSwitch
interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}
export const AnimatedToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-slate-600">{label}</span>
                <div 
                    onClick={() => onChange(!checked)}
                    className={cx(
                        "w-14 h-8 rounded-full flex items-center p-1 transition-all duration-300",
                        checked ? "justify-end neumorphic-shadow-inset" : "justify-start neumorphic-shadow-concave"
                    )}
                >
                    <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                        className={cx(
                            "w-6 h-6 rounded-full",
                            checked ? "neumorphic-gradient-cta neumorphic-shadow" : "bg-slate-300 neumorphic-shadow"
                        )}
                    />
                </div>
            </label>
        </motion.div>
    );
};

const wrapperVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  show: {
    opacity: 1,
    height: 'auto',
    marginTop: '24px',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.07
    }
  }
};

export const ConditionalWrapper: React.FC<{show: boolean, children: React.ReactNode}> = ({ show, children }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                variants={wrapperVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="overflow-hidden"
            >
                {/* Trick to prevent margin collapse from interfering with height: auto animation */}
                <div className="space-y-6 pt-[1px] -mt-[1px]">{children}</div>
            </motion.div>
        )}
    </AnimatePresence>
);


// Confetti Component
const ConfettiPiece: React.FC = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100 - 100;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  const rotate = Math.random() * 360;
  const colors = ['#818cf8', '#c084fc', '#6366f1', '#a855f7'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}vw`,
        top: `${y}vh`,
        width: '10px',
        height: '10px',
        backgroundColor: color,
        opacity: 0.8,
      }}
      initial={{ y: `${y}vh`, opacity: 1, rotate: 0 }}
      animate={{
        y: '120vh',
        opacity: 0,
        rotate: rotate,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'linear',
      }}
    />
  );
};
export const Confetti: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {Array.from({ length: 100 }).map((_, i) => (
                <ConfettiPiece key={i} />
            ))}
        </div>
    );
};