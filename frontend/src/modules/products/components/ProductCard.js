import {IoEllipsisVertical, IoPencil, IoTrash} from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";
import DeleteModal from "../../../shared/components/ui/Modals/DeleteModal";
import React, {useState} from "react";
import {useDeleteProduct} from "../hooks/useDeleteProduct";
import {Link} from "react-router-dom";


const ProductCard = ({product}) => {
    const {id, name, description, category, price, stock} = product;
    const {isMenuOpen, setIsMenuOpen, menuRef} = useOutsideClick();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteProduct, isDeleting} = useDeleteProduct(id);

    const handleDetailsClick = () => {
        const product = {id, name, description, category, price, stock};
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    }

    const handleDeleteRequest = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        await deleteProduct();
        setIsModalOpen(false);
    };
    if (!product) {
        return <div className="p-4 border rounded-lg shadow-md">Producto no disponible</div>;
    }

    return (
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div
                className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {name}
                </h5>
            </div>
            <div className="p-6 pt-0 flex justify-between items-center relative">
                <Link
                    to={`/product-detail/${id}`}
                    onClick={handleDetailsClick}
                >
                    <button data-ripple-light="true" type="button"
                            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Mas detalles
                    </button>
                </Link>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="absolute right-4 bottom-6 p-2 rounded-full hover:bg-gray-100"
                >
                    <IoEllipsisVertical size={20}/>
                </button>
            </div>
            {isMenuOpen && (
                <div ref={menuRef}
                     className="absolute bottom-14 right-4 bg-gray-800 text-white rounded-md shadow-lg w-35">
                    <ul className="p-2 space-y-1">
                        <Link
                            to="/register-product"
                            state={{
                                productId: id,
                                productName: name,
                                productDescription: description,
                                productCategory: category,
                                productPrice: price,
                                productStock: stock
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-blue-500 cursor-pointer rounded-md">
                            <IoPencil size={18}/>
                            Editar
                        </Link>
                        <li
                            onClick={handleDeleteRequest}
                            className="flex items-center gap-2 p-2 hover:bg-red-500 cursor-pointer rounded-md">
                            <IoTrash size={18}/>
                            Eliminar
                        </li>
                    </ul>
                </div>
            )}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message={`¿Estás seguro de que deseas eliminar el producto "${name}"?`}
            />
        </div>
    );
};

export default ProductCard;
