import { Router } from 'express';
import { OrderController } from './orderController';
import { authMiddleware } from '../auth/authMiddleware';

const router = Router();
const controller = new OrderController();


router.use(authMiddleware);

router.get('/', controller.getOrders);
router.post('/checkout', controller.checkout);
router.post('/:userId/checkout', controller.checkout);

export default router;