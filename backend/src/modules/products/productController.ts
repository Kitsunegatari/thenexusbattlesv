import { Request, Response } from 'express';
import { ProductService } from './productService';

const service = new ProductService();

export class ProductController {

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const product = await service.getProduct(id);
            res.json(product);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    async search(req: Request, res: Response) {
        try {
            const q = req.query.q as string;
            const results = await service.searchProducts(q);
            res.json(results);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async filter(req: Request, res: Response) {
        try {
            const filters = {
                minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                type: req.query.type as string,
                promo: req.query.promo ? req.query.promo === 'true' : undefined,
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 16
            };

            const products = await service.getFilteredProducts(filters);
            res.json(products);

        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 16;

        const products = await service.getPaginatedProducts(page, limit);
        res.json(products);
    }
}