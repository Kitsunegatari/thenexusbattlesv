import { Request, Response } from 'express';
import { AuthService } from './authService';

const service = new AuthService();

export class AuthController {

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const token = await service.register(name, email, password);
            res.json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await service.login(email, password);
            res.json({ token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}