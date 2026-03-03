export function CartIcon(count) {
    return `
        <div class="cart-icon" onclick="toggleCart()">
        🛒 <span>${count}</span>
        </div>
    `;
}