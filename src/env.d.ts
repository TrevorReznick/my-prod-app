/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string,
      id: string
    }
}

interface MainFormData {
    category: number,
    subcategory: number,
    ratings: number,
    url: string,
    description: string,
    name: string,
    provider: number,    
    user_id: string    
}


    
    
    
    


