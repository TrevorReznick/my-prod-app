/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string,
      id: string
    }
}

interface MainFormData {
    category: number,
    description: string,
    id_provider: number
    name: string,
    ratings: number,
    subcategory: number,
    url: string,
    user_id: string    
}

