import { pool } from '../../config/database';
import { User } from './authTypes';

export class AuthRepository {

    async findByEmail(email: string): Promise<User | null> {

        const [rows]: any = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        return rows.length ? rows[0] : null;
    }

    async createUser(name: string, email: string, password: string) {

        const [result]: any = await pool.query(
            `INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)`,
            [name, email, password]
        );

        return result.insertId;
    }
}