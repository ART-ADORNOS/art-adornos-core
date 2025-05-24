const useFilteredCarts = (carts, selectedStartup) => {
    const uniqueStartups = ["Todos", ...new Set(carts.map(c => c.name_startup))];

    const filteredCarts = selectedStartup === "Todos"
        ? carts
        : carts.filter(cart => cart.name_startup === selectedStartup);

    return {
        filteredCarts,
        uniqueStartups,
    };
};

export default useFilteredCarts;
