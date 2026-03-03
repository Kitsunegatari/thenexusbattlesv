export function CheckoutForm() {
    return `
        <form id="checkout-form">
        <input placeholder="Nombre del titular" required />
        <input placeholder="Número de tarjeta" maxlength="16" required />
        <input placeholder="MM/YY" required />
        <input placeholder="CVV" maxlength="3" required />
        <button type="submit">
            Confirmar Pago
        </button>
        </form>
    `;
}