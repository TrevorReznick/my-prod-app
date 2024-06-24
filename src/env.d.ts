/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string,
      id: string
    }
}

interface MainFormData {
    name: string,
    url: string,
    description: string,
    ratings: number,
    category: number,
    subcategory: number,
    user_id: string,
    provider: number
}

