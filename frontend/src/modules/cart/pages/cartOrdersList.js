import Navbar from "../../../shared/components/organisms/Navbar";
import React, {useEffect, useState} from "react";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import {useGetCart} from "../hooks/useGetCart";
import Loader from "../../../shared/components/molecules/Loader";
import {IoMdCart} from "react-icons/io";
import WhatsAppButton from "../components/WhatsAppButton";
import {RiDeleteBin5Fill} from "react-icons/ri";
import useDeleteProductCart from "../hooks/useDeleteProductCart";
import HorizontalNavBar from "../components/HorizontalNavBar";
import useFilteredCarts from "../hooks/useFilteredCarts";
import DeleteModal from "../../../shared/components/molecules/DeleteModal";
import {AnimatePresence, motion} from "framer-motion";
import updateCartQuantity from "../utils/updateCartQuantity";
import calculateTotals from "../utils/calculateTotals";
import PageTitle from "../../../shared/components/atoms/PageTitle";
import ROUTES from "../../../core/constants/routes/routes";
import useRegisterOrder from "../../orderHistory/hooks/useRegisterOrder";

const CartOrdersList = () => {
    const {carts: fetchedCarts, loading} = useGetCart();
    const [carts, setCarts] = useState([]);
    const {deleteProductCart, isDeleting} = useDeleteProductCart();
    const [selectStartup, setSelectedStartup] = useState("Todos");
    const {filteredCarts, uniqueStartups,} = useFilteredCarts(carts, selectStartup);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState({id: null, product: ""});
    const [deleteRow, setDeleteRow] = useState(null);
    const {handleRegisterOrder} = useRegisterOrder();

    const openModalConfirmation = (id, product) => {
        setDataProduct({id, product});
        setIsModalOpen(true);
    };

    const handleDeleteRequest = async (productCartId) => {
        setDeleteRow(productCartId);
        await new Promise((resolve) => setTimeout(resolve, 300));
        await deleteProductCart(productCartId);
        setCarts(prev => prev.filter(cart => cart.id !== productCartId));
        setIsModalOpen(false);
    }

    const handleUpdateQuantity = (productId, type) => {
        setCarts(prev => updateCartQuantity(prev, productId, type));
    }

    useEffect(() => {
        if (fetchedCarts.length > 0) {
            setCarts(fetchedCarts);
        }
    }, [fetchedCarts]);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={ROUTES.DASHBOARD}/>
            </div>

            <PageTitle title={"Lista de Pedidos"}/>

            {filteredCarts.length > 0 && (
                <div className="flex justify-start mb-14 ml-20">
                    <HorizontalNavBar
                        items={uniqueStartups}
                        onFilter={(startup) => setSelectedStartup(startup)}
                        selected={selectStartup}
                    />
                </div>
            )}

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
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                        Productos
                                    </th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">
                                        Cantidad
                                    </th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">
                                        Precio
                                    </th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">
                                        Acción
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <AnimatePresence>
                                    {filteredCarts.length > 0 ? (
                                        filteredCarts.map((cart) => (
                                            <motion.tr
                                                key={cart.id}
                                                initial={{opacity: 0, y: -10}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, x: 100}}
                                                transition={{duration: 0.3}}
                                            >
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
                                                            onClick={() => handleUpdateQuantity(cart.id, "dec")}
                                                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                                                            -
                                                        </button>
                                                        <span className="font-medium">{cart.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(cart.id, "inc")}
                                                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center font-semibold text-gray-800 dark:text-gray-200">
                                                    ${cart.price}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() =>
                                                            openModalConfirmation(cart.id, cart.product)
                                                        }
                                                        title="Eliminar"
                                                    >
                                                        <RiDeleteBin5Fill className="w-6 h-6"/>
                                                    </button>
                                                </td>
                                            </motion.tr>
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
                                </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-4">
                          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Total: $ {calculateTotals(filteredCarts)}
                          </span>
                        </div>
                    </div>
                </div>
            )}

            {selectStartup !== "Todos" && (
                <div className="flex justify-end mb-14 mr-20">
                    <WhatsAppButton onClick={(e) => handleRegisterOrder(e, filteredCarts)}/>
                </div>
            )}

            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => handleDeleteRequest(dataProduct.id)}
                message={`¿Estás seguro de que deseas eliminar el producto ${dataProduct.product}?`}
            />
        </div>
    );
};

export default CartOrdersList;
