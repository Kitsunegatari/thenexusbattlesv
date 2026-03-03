import { CartRepository } from './cartRepository';

export class CartService {

    private readonly repository = new CartRepository();

    private async getOrCreateCart(userId: number) {

        let cart = await this.repository.getActiveCart(userId);

        if (!cart) {
            const cartId = await this.repository.createCart(userId);
            cart = { id: cartId };
        }

        return cart.id;
    }

    async addToCart(userId: number, productId: number, quantity: number = 1) {

        const cartId = await this.getOrCreateCart(userId);

        await this.repository.addProduct(cartId, productId, quantity);

        return await this.getCart(userId);
    }

    async getCart(userId: number) {

        const cart = await this.repository.getActiveCart(userId);
        if (!cart) return { items: [], total: 0 };

        const items = await this.repository.getCartItems(cart.id);

        const total = items.reduce(
            (sum: number, item: any) => sum + Number(item.subtotal),
            0
        );

        return { items, total };
    }

    async updateQuantity(userId: number, productId: number, quantity: number) {

        const cart = await this.repository.getActiveCart(userId);
        if (!cart) throw new Error('Carrito no encontrado');

        await this.repository.updateQuantity(cart.id, productId, quantity);

        return await this.getCart(userId);
    }

    async removeFromCart(userId: number, productId: number) {

        const cart = await this.repository.getActiveCart(userId);
        if (!cart) throw new Error('Carrito no encontrado');

        await this.repository.removeProduct(cart.id, productId);

        return await this.getCart(userId);
    }

    async saveCart(userId: number) {

        const cart = await this.repository.getActiveCart(userId);
        if (!cart) throw new Error('Carrito no encontrado');

        await this.repository.updateCartStatus(cart.id, 'saved');

        return { message: 'Carrito guardado para después' };
    }
}