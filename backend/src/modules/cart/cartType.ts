export type CartStatus = 'active' | 'saved' | 'converted';

export interface Cart {
    id: number;
    user_id: number;
    status: CartStatus;
    created_at: Date;
    updated_at: Date;
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
}

export interface CartItemDetailed {
    product_id: number;
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    subtotal: number;
}