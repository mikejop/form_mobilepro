
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { SpinnerIcon, AnimatedInput, AnimatedButton, NeumorphicContainer } from '../components';

type Status = 'verifying' | 'valid' | 'invalid' | 'success';

export const NewPassword = () => {
    const [status, setStatus] = useState<Status>('verifying');
    const [oobCode, setOobCode] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('oobCode');

        if (!code) {
            setStatus('invalid');
            setError('Link inválido ou ausente. Por favor, solicite um novo link.');
            return;
        }

        setOobCode(code);

        verifyPasswordResetCode(auth, code)
            .then((verifiedEmail) => {
                setEmail(verifiedEmail);
                setStatus('valid');
            })
            .catch((err) => {
                setStatus('invalid');
                setError('Este link expirou ou já foi utilizado. Por favor, solicite um novo link de redefinição.');
                console.error(err);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        if (!oobCode) {
            setError('Código de verificação não encontrado.');
            return;
        }

        setIsLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setStatus('success');
        } catch (err) {
            setError('Ocorreu um erro ao redefinir a senha. Tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
                        <SpinnerIcon className="w-12 h-12 text-indigo-500" />
                        <p className="mt-4 text-slate-600">Verificando link...</p>
                    </div>
                );
            case 'invalid':
                return (
                    <div className="text-center p-8 min-h-[300px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Link Inválido</h2>
                        <p className="text-slate-600 mb-6">{error}</p>
                        <AnimatedButton onClick={() => window.location.href = '/'}>
                            Voltar ao Início
                        </AnimatedButton>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center p-8 min-h-[300px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Senha Definida com Sucesso!</h2>
                        <p className="text-slate-600 mb-6">Você já pode acessar o painel com sua nova senha.</p>
                         <AnimatedButton onClick={() => window.location.href = '/'}>
                            Acessar Painel
                        </AnimatedButton>
                    </div>
                );
            case 'valid':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Crie sua Senha</h2>
                        <p className="text-center text-slate-600 mb-6">
                            Defina uma nova senha de acesso para a conta: <strong className="text-indigo-600">{email}</strong>
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatedInput
                                label="Nova Senha"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                autoFocus
                            />
                            <AnimatedInput
                                label="Confirmar Nova Senha"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {error && <p className="text-red-500 text-sm text-center animate-shake">{error}</p>}
                            <AnimatedButton type="submit" className="w-full" isLoading={isLoading}>
                                Salvar Nova Senha
                            </AnimatedButton>
                        </form>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-lg">
            <NeumorphicContainer className="rounded-2xl">
                {renderContent()}
            </NeumorphicContainer>
        </div>
    );
};