/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
      email: string;
    }
}

interface MainFormData {
    name: string,
    url: string,
    description: string,
    ratings: number,
    category: number,
    subcategory: number
}

