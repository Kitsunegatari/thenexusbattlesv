let cart = {
    items: [],
    total: 0
};

const listeners = [];

export function getCart() {
    return cart;
}

export function setCart(newCart) {
    cart = newCart;
    listeners.forEach(listener => listener(cart));
}

export function subscribeCart(listener) {
    listeners.push(listener);
}