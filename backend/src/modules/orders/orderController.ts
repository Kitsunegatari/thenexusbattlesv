import { Request, Response } from 'express';
import { OrderService } from './orderService';
import { AuthRequest } from '../auth/authMiddleware';

const service = new OrderService();

export class OrderController {

    async checkout(req: Request, res: Response) {
        try {

            const userId = Number(req.params.userId);
            const result = await service.checkout(userId, req.body);

            res.json(result);

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrders(req: AuthRequest, res: Response) {
    const userId = req.user.userId;
    const orders = await service.getUserOrders(userId);
    res.json(orders);
    }
}