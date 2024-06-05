/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PROD_API_URL: string;
    readonly DEV_API_URL: string;
    // Aggiungi altre variabili d'ambiente qui, se necessario
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}