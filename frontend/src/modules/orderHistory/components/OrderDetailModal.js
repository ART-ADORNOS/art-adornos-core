import React from "react";

const OrderDetailModal = ({orderDetail, onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-gray-800 w-11/12 max-w-md rounded-xl shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Detalles del Pedido
                    </h2>
                    <button
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <ul className="space-y-3 max-h-96 overflow-y-auto">
                    {orderDetail?.map((item) => {
                        const price = Number(item.price) || 0;
                        const total = price * (Number(item.quantity) || 0);

                        return (
                            <li
                                key={item.id}
                                className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <div className="flex items-center gap-3">
                                    {item.image_product && (
                                        <img
                                            src={item.image_product}
                                            alt={item.product_name}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                                            {item.product_name}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                            Cantidad: {item.quantity}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                            ${price.toFixed(2)} / ud.
                                        </span>
                                    </div>
                                </div>
                                <span className="font-medium">${total.toFixed(2)}</span>
                            </li>
                        );
                    })}
                </ul>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export {OrderDetailModal};
