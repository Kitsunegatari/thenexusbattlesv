export function CartPanel(cartItems) {
    return `
        <div class="cart-panel">
        ${cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" />
                <div>${item.name}</div>
                <div>${item.quantity}</div>
                <div>${item.subtotal}</div>
            </div>
        `).join('')}

        <div class="total">
            Total: ${calculateTotal(cartItems)}
        </div>

        <button onclick="goToCheckout()">
            Proceder al pago
        </button>
        </div>
    `;
}