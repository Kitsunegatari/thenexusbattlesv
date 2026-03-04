import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import app from './app';



app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

// 🔥 ESTA PARTE ES LA QUE TE FALTA
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});