import URLS_EXTERNALS from "../../../core/constants/routes/externals";

export function handleWhatsAppClick(filteredCarts) {
    if (!filteredCarts.length) return;

    const phone = filteredCarts[0].phone_owner;
    const total = filteredCarts
        .reduce((acc, cart) => acc + cart.price * cart.quantity, 0)
        .toFixed(2);

    const messageLines = [
        "📋 *Solicitud de Cotización*",
        "",
        ...filteredCarts.map(cart =>
            `• *Producto:* ${cart.product}\n  *Cantidad:* ${cart.quantity}\n  *Precio unitario:* $${cart.price}`
        ),
        "",
        "―".repeat(20),
        `*Total estimado:* $${total}`,
        "",
        "¿Podría enviarme la cotización formal? ¡Muchas gracias! 🙌"
    ];

    const fullMessage = messageLines.join("\n\n");

    const encodedMessage = encodeURIComponent(fullMessage);
    const url = `${URLS_EXTERNALS.WHATSAPP_BASE_URL}${URLS_EXTERNALS.WHATSAPP_COUNTRY_CODE}${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
}
