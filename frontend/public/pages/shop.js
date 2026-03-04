import { getProducts } from "../services/productService.js";
import { 
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    checkout
} from "../services/cartService.js";

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");

async function loadProducts() {

    const products = await getProducts();

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image_url}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button>Agregar al carrito</button>
        `;

        card.querySelector("button")
            .addEventListener("click", async () => {
                await addToCart(product.id);
                loadCart();
            });

        productsContainer.appendChild(card);
    });
}

async function loadCart() {

    const cart = await getCart();

    cartContainer.innerHTML = `
        <h2>Carrito</h2>
        ${cart.items.map(item => `
            <div style="margin-bottom:15px;">
                <p>${item.name}</p>
                <p>$${item.price}</p>
                <button onclick="window.decrease(${item.product_id})">-</button>
                ${item.quantity}
                <button onclick="window.increase(${item.product_id})">+</button>
                <button onclick="window.removeItem(${item.product_id})">
                    Eliminar
                </button>
            </div>
        `).join("")}
        <hr>
        <h3>Total: $${cart.total}</h3>
        <button id="checkoutBtn">Finalizar Compra</button>
    `;

    document
        .getElementById("checkoutBtn")
        ?.addEventListener("click", async () => {
            await checkout();
            alert("Compra realizada con éxito");
            loadCart();
        });
}

window.increase = async (id) => {
    await updateCart(id, 1);
    loadCart();
};

window.decrease = async (id) => {
    await updateCart(id, -1);
    loadCart();
};

window.removeItem = async (id) => {
    await removeFromCart(id);
    loadCart();
};

loadProducts();
loadCart();