
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// --- INÍCIO DA CONFIGURAÇÃO DO FIREBASE ---
// Credenciais do Firebase atualizadas conforme solicitado.
const firebaseConfig = {
  apiKey: "AIzaSyDC1ittOz_TFj-QE2zmOt6dFrW43n_nrpQ",
  authDomain: "projetodojo.firebaseapp.com",
  projectId: "projetodojo",
  storageBucket: "projetodojo.appspot.com", // Corrigido para .appspot.com que é o padrão
  messagingSenderId: "316687936545",
  appId: "1:316687936545:web:5451ead23f5a5235fa4760",
  measurementId: "G-3SJ9RZ2V8X"
};
// --- FIM DA CONFIGURAÇÃO DO FIREBASE ---


// Verificação para alertar se as chaves ainda são placeholders.
export const isFirebaseConfigIncomplete = firebaseConfig.apiKey.startsWith("YOUR_");

if (isFirebaseConfigIncomplete) {
  console.error(
    "CONFIGURAÇÃO INCOMPLETA: As credenciais do Firebase no arquivo 'firebase.ts' " +
    "ainda são placeholders. Por favor, substitua-os pelas suas chaves reais para que o app possa se conectar."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics apenas se estiver no lado do cliente
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Firebase Analytics não pôde ser inicializado.", e);
  }
}

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
