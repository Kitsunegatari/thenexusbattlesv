import express from 'express';
import productRoutes from './modules/products/productRoutes';
import cartRoutes from './modules/cart/cartRoutes';
import orderRoutes from './modules/orders/orderRoutes';
import authRoutes from './modules/auth/authRoutes';
import { errorHandler } from './shared/middleware/errorMiddleware';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.use(morgan('dev'));

export default app;