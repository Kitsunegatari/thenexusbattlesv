export function CartIcon(panel) {

    const icon = document.createElement("div");
    icon.className = "cart-icon";
    icon.innerHTML = "🛒";

    icon.addEventListener("click", () => {
        panel.classList.toggle("hidden");
    });

    return icon;
}