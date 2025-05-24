const calculateTotals = (items) => {
    return (
        items.reduce((acc, item) =>
            acc + (item.price * (item.quantity || 1)), 0).toFixed(2)
    );
}

export default calculateTotals;