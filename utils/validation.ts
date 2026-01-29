import { FormData, ConditionalStates } from '../types';

const isInvalid = (value: any) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
};

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateStep = (stepId: string, data: Partial<FormData>, conditionalStates: ConditionalStates): Record<string, string> | null => {
    const errors: Record<string, string> = {};
    const errorMessage = 'Este campo é obrigatório.';

    switch (stepId) {
        case 'basicData': // Step 2
            if (isInvalid(data.firstName)) errors.firstName = errorMessage;
            if (isInvalid(data.lastName)) errors.lastName = errorMessage;
            if (isInvalid(data.email)) {
                errors.email = errorMessage;
            } else if (!isValidEmail(data.email!)) {
                errors.email = 'Por favor, insira um e-mail válido.';
            }
            if (isInvalid(data.gender)) errors.gender = errorMessage;
            if (isInvalid(data.ageRange)) errors.ageRange = errorMessage;
            break;

        case 'pains': // Step 3
            if (isInvalid(data.biggestDifficulty)) errors.biggestDifficulty = 'Por favor, selecione ao menos uma opção.';
            if (isInvalid(data.triedLearning)) errors.triedLearning = errorMessage;
            
            if (conditionalStates.showTriedLearningDetails) {
                 if (isInvalid(data.whyFailed)) errors.whyFailed = 'Por favor, selecione ao menos uma opção.';
                 if (isInvalid(data.whereTried)) errors.whereTried = 'Por favor, selecione ao menos uma opção.';
            }
            break;

        case 'work': // Step 4
            if (isInvalid(data.occupation)) errors.occupation = errorMessage;
            if (isInvalid(data.income)) errors.income = errorMessage;
            if (isInvalid(data.city)) errors.city = errorMessage;
            if (isInvalid(data.state)) errors.state = errorMessage;
            break;

        case 'goals': // Step 5
            if (isInvalid(data.mainGoal)) errors.mainGoal = errorMessage;
            if (isInvalid(data.interestedNiches)) errors.interestedNiches = 'Por favor, selecione ao menos um nicho.';
            break;

        case 'experience': // Step 6
            if (isInvalid(data.experienceLevel)) errors.experienceLevel = errorMessage;
            if (isInvalid(data.phoneModel)) errors.phoneModel = errorMessage;
            if (isInvalid(data.biggestTechnicalDifficulty)) errors.biggestTechnicalDifficulty = errorMessage;
            break;
            
        case 'investment': // Step 7
            if (isInvalid(data.investmentWillingness)) errors.investmentWillingness = errorMessage;
            if (isInvalid(data.mainObjection)) errors.mainObjection = errorMessage;
            break;
            
        case 'motivation': // Step 8
            if (isInvalid(data.motivationScale)) errors.motivationScale = errorMessage;
            if (isInvalid(data.wantsFreeMaterials)) errors.wantsFreeMaterials = errorMessage;
            break;
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
