import { pool } from '../../config/database';
import { Product, ProductFilters } from './productType';

export class ProductRepository {

    async findById(id: number): Promise<Product | null> {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        const result = rows as Product[];
        return result.length ? result[0] : null;
    }

    async search(query: string): Promise<Product[]> {
        const [rows] = await pool.query(
            `SELECT * FROM products
                WHERE MATCH(name, description, abilities)
                AGAINST (? IN NATURAL LANGUAGE MODE)`,
            [query]
        );

        return rows as Product[];
    }

    async filter(filters: ProductFilters): Promise<Product[]> {

        let sql = `SELECT * FROM products WHERE 1=1`;
        const params: any[] = [];

        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            sql += ` AND price BETWEEN ? AND ?`;
            params.push(filters.minPrice, filters.maxPrice);
        }

        if (filters.type) {
            sql += ` AND type = ?`;
            params.push(filters.type);
        }

        if (filters.promo !== undefined) {
            sql += ` AND is_promo = ?`;
            params.push(filters.promo);
        }

        const page = filters.page || 1;
        const limit = filters.limit || 16;
        const offset = (page - 1) * limit;

        sql += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const [rows] = await pool.query(sql, params);
        return rows as Product[];
    }

    async countAll(): Promise<number> {
        const [rows]: any = await pool.query(
            'SELECT COUNT(*) as total FROM products'
        );

        return rows[0].total;
    }
}