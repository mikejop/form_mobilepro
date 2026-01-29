import ReactGA from 'react-ga4';

let isInitialized = false;

// O Measurement ID do Google Analytics 4
const MEASUREMENT_ID = "G-3SJ9RZ2V8X";

/**
 * Inicializa o Google Analytics se ainda não tiver sido inicializado.
 * Esta função deve ser chamada condicionalmente apenas em rotas públicas.
 */
export const initializeGA = () => {
    // Previne a re-inicialização
    if (isInitialized) {
        return;
    }

    console.log("Attempting to initialize Google Analytics...");
    try {
        ReactGA.initialize(MEASUREMENT_ID);
        isInitialized = true;
        console.log("Google Analytics initialized successfully.");
    } catch (e) {
        console.error("Failed to initialize Google Analytics:", e);
    }
};

/**
 * Dispara um evento de pageview se o Google Analytics estiver inicializado.
 * @param path - O caminho da página a ser rastreado (ex: window.location.pathname)
 */
export const trackPageView = (path: string) => {
    if (!isInitialized) {
        console.warn("Analytics not initialized. Skipping pageview tracking.");
        return;
    }
    console.log(`Tracking pageview for: ${path}`);
    ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * Rastreia um evento customizado.
 * @param category - A categoria do evento.
 * @param action - A ação do evento.
 * @param label - (Opcional) Um rótulo para o evento.
 */
export const trackEvent = (category: string, action: string, label?: string) => {
     if (!isInitialized) {
        return;
    }
    ReactGA.event({
        category,
        action,
        label,
    });
};
