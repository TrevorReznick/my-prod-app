/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string;
    }
}

interface ImportMetaEnv {
    readonly PROD_API_URL: string;
    readonly DEV_API_URL: string;
    // Aggiungi altre variabili d'ambiente qui, se necessario
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface MainFormData {
    name: string,
    url: string,
    description: string;
    ratings: number,
    category: number,
    subcategory: number
}

