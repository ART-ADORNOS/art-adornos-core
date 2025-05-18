import URLS_EXTERNALS from "../../../core/constants/routes/externals";

export function handleWhatsAppClick(filteredCarts) {
    if (!filteredCarts.length) return;
    const phone = filteredCarts[0].phone_owner;
    const total = filteredCarts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2);

    const message =
        "📝 *Solicitud de Cotización*\n\n" +
        filteredCarts.map(cart =>
            `• *Producto:* ${cart.product}\n  *Cantidad:* ${cart.quantity}\n  *Precio:* $${cart.price}`
        ).join('\n\n') +
        `\n\n${'—'.repeat(20)}\n` +
        `*Total estimado:* $${total}\n` +
        "¿Podría enviarme la cotización formal? ¡Gracias! 🙏";

    const url = `${URLS_EXTERNALS.WHATSAPP_BASE_URL}${URLS_EXTERNALS.WHATSAPP_COUNTRY_CODE}${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}