import { ProductCard } from "./productCard.js";
import { getProducts } from "../services/productService.js";

export async function ProductGrid() {

    const grid = document.createElement("div");
    grid.className = "product-grid";

    const products = await getProducts(1,16);

    products.data.forEach(product => {
        grid.appendChild(ProductCard(product));
    });

    return grid;
}