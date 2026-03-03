import { Router } from 'express';
import { ProductController } from './productController';

const router = Router();
const controller = new ProductController();

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/filter', controller.filter);
router.get('/:id', controller.getById);

export default router;