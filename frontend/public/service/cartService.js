import api from "./api.js";

export async function getCart() {
    const res = await api.get("/cart");
    return res.data;
}

export async function addToCart(product_id) {
    await api.post("/cart/add", {
        product_id,
        quantity: 1
    });
}

export async function updateCart(product_id, quantity) {
    await api.put("/cart/update", {
        product_id,
        quantity
    });
}

export async function removeFromCart(product_id) {
    await api.delete("/cart/remove", {
        data: { product_id }
    });
}

export async function checkout() {
    await api.post("/orders/checkout");
}