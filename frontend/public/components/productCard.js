export function ProductCard(product) {
    return `
        <div class="product-card ${product.isOwned ? 'owned' : ''}">
        
        ${product.is_promo ? 
            `<div class="promo-badge">-${product.discount_percentage}%</div>` 
            : ''}

        <img src="${product.image_url}" />

        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="price">
            ${product.currency} ${product.price}
        </div>

        <div class="actions">
            <button onclick="addToCart(${product.id})">
            🛒 Añadir
            </button>

            <button onclick="toggleWishlist(${product.id})">
            ❤️
            </button>
        </div>
        </div>
    `;
}