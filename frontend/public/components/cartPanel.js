import { fetchCart, updateQuantity, removeItem } from "../services/cartService.js";
import { getCart, setCart, subscribeCart } from "../state/cartStore.js";

async function loadCart() {
    const data = await fetchCart();
    setCart(data);
}

export function CartPanel() {

    const panel = document.createElement("div");
    panel.className = "cart-panel hidden";

    function render(cart) {

        panel.innerHTML = `
            <h3>Mi Carrito</h3>

            <div class="cart-items">
                ${cart.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image_url}" />
                        <div class="info">
                            <p>${item.name}</p>
                            <span>$${item.price}</span>
                            
                            <div class="quantity-control">
                                <button class="minus" data-id="${item.product_id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="plus" data-id="${item.product_id}">+</button>
                            </div>
                        </div>

                        <button class="remove" data-id="${item.product_id}">X</button>
                    </div>
                `).join("")}
            </div>

            <div class="cart-footer">
                <h4>Total: $${cart.total}</h4>
                <button id="checkoutBtn">Finalizar Compra</button>
            </div>
        `;

        attachEvents();
    }

    function attachEvents() {

        panel.querySelectorAll(".plus").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await updateQuantity(id, 1);
                loadCart();
            });
        });

        panel.querySelectorAll(".minus").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await updateQuantity(id, -1);
                loadCart();
            });
        });

        panel.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await removeItem(id);
                loadCart();
            });
        });

        panel.querySelector("#checkoutBtn")?.addEventListener("click", () => {
            window.location.href = "/checkout.html";
        });
    }

    subscribeCart(render);

    loadCart();

    return panel;
}