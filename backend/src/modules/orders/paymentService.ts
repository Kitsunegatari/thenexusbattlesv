export class PaymentService {

    validateCard(data: any) {

        if (!/^\d{16}$/.test(data.cardNumber))
            throw new Error('Número de tarjeta inválido');

        if (!/^\d{3}$/.test(data.cvv))
            throw new Error('CVV inválido');

        if (!/^\d{2}\/\d{2}$/.test(data.expiry))
            throw new Error('Fecha inválida (MM/YY)');

        if (!data.cardHolder)
            throw new Error('Nombre del titular requerido');
    }

    async processPayment(amount: number) {

        // Simulación de tiempo de procesamiento
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            status: 'approved',
            transactionId: 'TX-' + Date.now()
        };
    }
}