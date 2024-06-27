/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string,
      id: string
    }
}

interface MainFormData {
    id_cat: number,
    id_subcat: number,
    ratings: number,
    url: string,
    description: string,
    name: string        
}

interface SubMainFormData {
  id: string,
  user_id: string         
}


    
    
    
    


