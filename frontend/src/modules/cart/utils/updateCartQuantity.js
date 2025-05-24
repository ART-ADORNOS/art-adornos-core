const updateCartQuantity = (carts, productId, type) => {
    return carts.map(cart =>
        cart.id === productId
            ? {
                ...cart,
                quantity:
                    type === "inc"
                        ? cart.quantity + 1
                        : cart.quantity > 1
                            ? cart.quantity - 1
                            : 1,
            }
            : cart
    );
}

export default updateCartQuantity;