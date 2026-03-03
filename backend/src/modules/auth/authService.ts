import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './authRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secure_secret_key_here';

export class AuthService {

    private readonly repository = new AuthRepository();

    async register(name: string, email: string, password: string) {

        const existing = await this.repository.findByEmail(email);
        if (existing) throw new Error('El usuario ya existe');

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await this.repository.createUser(
            name,
            email,
            hashedPassword
        );

        return this.generateToken(userId, email);
    }

    async login(email: string, password: string) {

        const user = await this.repository.findByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Credenciales inválidas');

        return this.generateToken(user.id, user.email);
    }

    private generateToken(userId: number, email: string) {

        return jwt.sign(
            { userId, email },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
    }
}