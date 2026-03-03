import { pool } from '../../config/database';

export class CartRepository {

    async getActiveCart(userId: number) {
        const [rows]: any = await pool.query(
            `SELECT * FROM carts 
                WHERE user_id = ? AND status = 'active'`,
            [userId]
        );

        return rows.length ? rows[0] : null;
    }

    async createCart(userId: number) {
        const [result]: any = await pool.query(
            `INSERT INTO carts (user_id) VALUES (?)`,
            [userId]
        );

        return result.insertId;
    }

    async addProduct(cartId: number, productId: number, quantity: number) {

        await pool.query(
            `INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
            [cartId, productId, quantity, quantity]
        );
    }

    async getCartItems(cartId: number) {

        const [rows]: any = await pool.query(
            `SELECT 
                ci.product_id,
                p.name,
                p.price,
                p.image_url,
                ci.quantity,
                (p.price * ci.quantity) as subtotal
                FROM cart_items ci
                JOIN products p ON p.id = ci.product_id
                WHERE ci.cart_id = ?`,
            [cartId]
        );

        return rows;
    }

    async updateQuantity(cartId: number, productId: number, quantity: number) {
        await pool.query(
            `UPDATE cart_items 
                SET quantity = ?
                WHERE cart_id = ? AND product_id = ?`,
            [quantity, cartId, productId]
        );
    }

    async removeProduct(cartId: number, productId: number) {
        await pool.query(
            `DELETE FROM cart_items
                WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId]
        );
    }

    async clearCart(cartId: number) {
        await pool.query(
            `DELETE FROM cart_items WHERE cart_id = ?`,
            [cartId]
        );
    }

    async updateCartStatus(cartId: number, status: string) {
        await pool.query(
            `UPDATE carts SET status = ? WHERE id = ?`,
            [status, cartId]
        );
    }
}