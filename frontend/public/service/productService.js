import api from "./api.js";

export async function getProducts() {
    const res = await api.get("/products?page=1&limit=16");
    return res.data.data;
}