import { CartRepository } from '../cart/cartRepository';
import { OrderRepository } from './orderRepository';
import { PaymentService } from './paymentService';
import { EmailService } from '../../shared/services/emailService';
import { AuthRepository } from '../auth/authRepository';
import { pool } from '../../config/database';

export class OrderService {

    private readonly emailService = new EmailService();
    private readonly authRepo = new AuthRepository();
    private readonly cartRepo = new CartRepository();
    private readonly orderRepo = new OrderRepository();
    private readonly paymentService = new PaymentService();

    async checkout(userId: number, paymentData: any) {

        const cart = await this.cartRepo.getActiveCart(userId);
        if (!cart) throw new Error('No hay carrito activo');

        const items = await this.cartRepo.getCartItems(cart.id);
        if (!items.length) throw new Error('El carrito está vacío');

        const total = items.reduce(
            (sum: number, item: any) => sum + Number(item.subtotal),
            0
        );

        // 1️⃣ Validar tarjeta
        this.paymentService.validateCard(paymentData);

        // 2️⃣ Crear orden en estado pending
        const orderId = await this.orderRepo.createOrder(userId, total, 'COP');

        // 3️⃣ Guardar items
        for (const item of items) {
            await this.orderRepo.addOrderItem(orderId, item);
        }

        try {

            // 4️⃣ Simular pago
            const paymentResult = await this.paymentService.processPayment(total);

            // 5️⃣ Marcar orden como pagada
            await this.orderRepo.updateOrderStatus(
                orderId,
                'paid',
                paymentResult.transactionId
            );
            // Obtener email del usuario
            const user = await this.authRepo.findByEmail(
                (await pool.query('SELECT email FROM users WHERE id = ?', [userId]))[0]
            );

            // Enviar correo
            if (user) {
                await this.emailService.sendOrderConfirmation(
                    user.email,
                    orderId,
                    items,
                    total,
                    paymentResult.transactionId
                );
            }

            // 6️⃣ Convertir carrito
            await this.cartRepo.updateCartStatus(cart.id, 'converted');

            return {
                message: 'Pago aprobado',
                transactionId: paymentResult.transactionId,
                total
            };

        } catch (error) {

            await this.orderRepo.updateOrderStatus(orderId, 'failed');

            console.error('Payment processing error:', error);
            throw new Error('Pago fallido');
        }
    }

    async getUserOrders(userId: number) {
    return await this.orderRepo.getOrdersByUser(userId);
    }
}