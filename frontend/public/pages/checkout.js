import { checkout } from "../services/cartService.js";

document
    .getElementById("checkoutBtn")
    .addEventListener("click", async () => {

    try {
        await checkout();
        alert("Compra realizada con éxito");
        window.location.href = "/shop.html";
    } catch (err) {
        console.error("Error en la compra:", err);
        alert("Error en la compra");
    }

});