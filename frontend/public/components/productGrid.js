export function ProductGrid(products) {
    return `
        <div class="product-grid">
            ${products.map(p => ProductCard(p)).join('')}
        </div>
    `;
}