import { pool } from '../../config/database';

export class OrderRepository {

    async createOrder(userId: number, total: number, currency: string) {

        const [result]: any = await pool.query(
            `INSERT INTO orders (user_id, total, currency, status)
                VALUES (?, ?, ?, 'pending')`,
            [userId, total, currency]
        );

        return result.insertId;
    }

    async addOrderItem(orderId: number, item: any) {

        await pool.query(
            `INSERT INTO order_items 
                (order_id, product_id, quantity, unit_price, subtotal)
                VALUES (?, ?, ?, ?, ?)`,
            [
                orderId,
                item.product_id,
                item.quantity,
                item.price,
                item.subtotal
            ]
        );
    }

    async updateOrderStatus(orderId: number, status: string, transactionId?: string) {

        await pool.query(
            `UPDATE orders 
                SET status = ?, transaction_id = ?
                WHERE id = ?`,
            [status, transactionId, orderId]
        );
    }

    async getOrdersByUser(userId: number) {

    const [rows]: any = await pool.query(
        `SELECT * FROM orders 
            WHERE user_id = ?
            ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
}
}