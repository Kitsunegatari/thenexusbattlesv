import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import app from './app';

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

dotenv.config();