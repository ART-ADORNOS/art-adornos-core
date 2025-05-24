import {IoEllipsisVertical, IoPencil, IoTrash} from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";
import DeleteModal from "../../../shared/components/ui/Modals/DeleteModal";
import React, {useState} from "react";
import {useDeleteProduct} from "../hooks/useDeleteProduct";
import {Link} from "react-router-dom";
import USER_TYPE from "../../../core/constants/user/userType";
import Loader from "../../../shared/components/ui/Loaders/Loader";
import {FaShoppingCart} from "react-icons/fa";
import ROUTES from "../../../core/constants/routes/routes";
import useRegisterCart from "../../cart/hooks/useRegisterCart";


const ProductCard = ({product, usertype}) => {
    const {id, name, description, category, price, stock, image} = product;
    const {isMenuOpen, setIsMenuOpen, menuRef} = useOutsideClick();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteProduct, isDeleting} = useDeleteProduct(id);
    usertype = usertype || localStorage.getItem('usertype') || '';
    const {handleSubmit} = useRegisterCart();


    const handleDeleteRequest = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        await deleteProduct();
        setIsModalOpen(false);
    };

    const handleAddToCart = (e) => {
        const data = {
            product_id: id,
            quantity: 1
        }
        handleSubmit(e, data);
    }

    if (!product) {
        return <div className="p-4 border rounded-lg shadow-md">Producto no disponible</div>;
    }

    if (isDeleting) {
        return <Loader/>;
    }

    return (
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div
                className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-tr from-orange-500 to-purple-500">
                <img src={image} alt="producto" className="w-full h-full object-cover rounded-md shadow-md"/>
            </div>
            <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {name}
                </h5>
            </div>
            <div className="p-6 pt-0 flex justify-between items-center relative">
                <Link
                    to={`${ROUTES.PRODUCT_DETAIL}/${id}`}
                >
                    <button data-ripple-light="true" type="button"
                            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Mas detalles
                    </button>
                </Link>
                {usertype === USER_TYPE.SELLER ? (
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="absolute right-4 bottom-6 p-2 rounded-full hover:bg-gray-100"
                    >
                        <IoEllipsisVertical size={20}/>
                    </button>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
                    >
                        <FaShoppingCart size={20}/>
                    </button>
                )}
            </div>
            {isMenuOpen && (
                <div ref={menuRef}
                     className="absolute bottom-14 right-4 bg-gray-800 text-white rounded-md shadow-lg w-35">
                    <ul className="p-2 space-y-1">
                        <li>
                            <Link
                                to={`${ROUTES.REGISTER_PRODUCT}`}
                                state={{
                                    productId: id,
                                    productName: name,
                                    productDescription: description,
                                    productCategory: category,
                                    productPrice: price,
                                    productStock: stock,
                                    productImage: image
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-blue-500 cursor-pointer rounded-md">
                                <IoPencil size={18}/>
                                Editar
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleDeleteRequest}
                                className="flex items-center gap-2 p-2 hover:bg-red-500 cursor-pointer rounded-md"
                            >
                                <IoTrash size={18}/>
                                Eliminar
                            </button>
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
