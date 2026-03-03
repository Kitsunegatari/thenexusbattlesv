export type Currency = 'COP' | 'USD' | 'EUR';

export interface Product {
    id: number;
    name: string;
    description: string;
    abilities: string;
    image_url: string;
    price: number;
    currency: Currency;
    type: string;
    is_promo: boolean;
    discount_percentage: number;
    stock: number;
    created_at: Date;
    updated_at: Date;
}

export interface ProductFilters {
    minPrice?: number;
    maxPrice?: number;
    type?: string;
    promo?: boolean;
    page?: number;
    limit?: number;
}