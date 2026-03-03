import { Router } from 'express';
import { CartController } from './cartController';
import { authMiddleware } from '../auth/authMiddleware';

const router = Router();
const controller = new CartController();


router.use(authMiddleware);

router.get('/', controller.getCart);
router.post('/add', controller.addToCart);
router.put('/update', controller.updateQuantity);
router.delete('/remove', controller.remove);
router.post('/save', controller.save);

export default router;