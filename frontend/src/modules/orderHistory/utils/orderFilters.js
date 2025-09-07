

export const filterOrdersByTab = (orders, activeTab) => {
  if (!orders) return [];

  switch (activeTab) {
    case "Pending":
      return orders.filter(order => order.status === "Pendiente");
    case "In Progress":
      return orders.filter(order => order.status === "En espera");
    case "Completed":
      return orders.filter(order => order.status === "Completado");
    default:
      return orders;
  }
};