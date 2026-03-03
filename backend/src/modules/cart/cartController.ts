import { Request, Response } from 'express';
import { CartService } from './cartService';

const service = new CartService();

export class CartController {

    async getCart(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const cart = await service.getCart(userId);
        res.json(cart);
    }

    async addToCart(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const { productId, quantity } = req.body;

        const cart = await service.addToCart(userId, productId, quantity);
        res.json(cart);
    }

    async updateQuantity(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const { productId, quantity } = req.body;

        const cart = await service.updateQuantity(userId, productId, quantity);
        res.json(cart);
    }

    async remove(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const { productId } = req.body;

        const cart = await service.removeFromCart(userId, productId);
        res.json(cart);
    }

    async save(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const result = await service.saveCart(userId);
        res.json(result);
    }
}