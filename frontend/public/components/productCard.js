export function ProductCard(product) {

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <img src="${product.image_url}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">$${product.price}</span>

        <div class="actions">
            <button class="add-cart">🛒</button>
            <button class="wishlist">❤</button>
        </div>
    `;

    card.querySelector(".add-cart").addEventListener("click", () => {
        addToCart(product.id);
    });

    return card;
}