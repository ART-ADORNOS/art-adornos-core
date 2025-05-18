import Navbar from "../../../shared/components/layout/header/Navbar";
import React from "react";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import {useGetCart} from "../hooks/useGetCart";
import Loader from "../../../shared/components/ui/Loaders/Loader";
import {IoMdCart} from "react-icons/io";
import WhatsAppButton from "../components/WhatsAppButton";
import {RiDeleteBin5Fill} from "react-icons/ri";
import useDeleteProductCart from "../hooks/useDeleteProductCart";
import HorizontalNavBar from "../components/HorizontalNavBar";
import useFilteredCarts from "../hooks/useFilteredCarts";
import {handleWhatsAppClick} from "../utils/whatsappUtils";

const CartOrdersList = () => {
    const {carts, loading} = useGetCart();
    const {deleteProductCart, isDeleting} = useDeleteProductCart();
    const handleDeleteRequest = (productCartId) => {
        deleteProductCart(productCartId);
    };
    const {filteredCarts, uniqueStartups, handleFilter, selectedStartup,} = useFilteredCarts(carts);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={"/dashboard"}/>
            </div>

            <div className="container mx-auto px-6 sm:px-12 py-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="text-center sm:text-left">
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                            Lista de Pedidos
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex justify-start mb-14 ml-20">
                <HorizontalNavBar items={uniqueStartups} onFilter={handleFilter}/>
            </div>

            {loading || isDeleting ? (
                <div className="flex items-center justify-center h-96 w-full">
                    <Loader/>
                </div>
            ) : (
                <div className="container mx-auto px-6 sm:px-12 pb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Productos</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Cantidad</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Precio</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">Acción</th>
                                </tr>
                                </thead>

                                {filteredCarts.length > 0 ? (
                                    filteredCarts.map((cart) => (
                                        <tr key={cart.id}>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={cart.image_product}
                                                        alt="Producto"
                                                        className="w-16 h-16 object-cover rounded mr-4"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                            {cart.product}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="inline-flex items-center space-x-2">
                                                    <button
                                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">-
                                                    </button>
                                                    <span className="font-medium">{cart.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">+
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center font-semibold text-gray-800 dark:text-gray-200">
                                                ${cart.price}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteRequest(cart.id)}
                                                    title="Eliminar"
                                                >
                                                    <RiDeleteBin5Fill className="w-6 h-6"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-10">
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <IoMdCart className="text-6xl mb-3 text-gray-400"/>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                                                    No hay pedidos disponibles
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>

                        <div className="flex justify-end mt-4">
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Total: ${filteredCarts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end mb-14 mr-20">
                <button
                    onClick={() => handleWhatsAppClick(filteredCarts)}
                >
                    <WhatsAppButton/>
                </button>
            </div>
        </div>
    );
};

export default CartOrdersList;