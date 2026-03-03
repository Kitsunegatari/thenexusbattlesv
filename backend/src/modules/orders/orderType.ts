export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
    id: number;
    user_id: number;
    total: number;
    currency: 'COP' | 'USD' | 'EUR';
    status: OrderStatus;
    transaction_id?: string;
    created_at: Date;
}

export interface PaymentData {
    cardHolder: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}