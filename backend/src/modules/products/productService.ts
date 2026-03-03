import { ProductRepository } from './productRepository';
import { ProductFilters } from './productType';

export class ProductService {

    private readonly repository = new ProductRepository();

    async getProduct(id: number) {
        const product = await this.repository.findById(id);

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        return product;
    }

    async searchProducts(query: string) {

        if (!query || query.length < 2) {
            throw new Error('Debe ingresar al menos 2 caracteres');
        }

        return await this.repository.search(query);
    }

    async getFilteredProducts(filters: ProductFilters) {
        return await this.repository.filter(filters);
    }

    async getPaginatedProducts(page: number = 1, limit: number = 16) {
        return await this.repository.filter({ page, limit });
    }
}