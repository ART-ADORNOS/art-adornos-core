const updateCartQuantity = (carts, productId, type) => {
    return carts.map(cart => {
        if (cart.id === productId) {
            let newQuantity;
            if (type === "inc") {
                newQuantity = cart.quantity + 1;
            } else {
                newQuantity = cart.quantity > 1 ? cart.quantity - 1 : 1;
            }

            return {
                ...cart,
                quantity: newQuantity,
            };
        }
        return cart;
    });
}

export default updateCartQuantity;
