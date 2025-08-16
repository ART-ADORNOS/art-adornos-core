import Navbar from "../../../shared/components/organisms/Navbar";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import {FaBoxOpen, FaDollarSign, FaTags} from "react-icons/fa";
import useProductDetail from "../hooks/useProductDetail";
import {useParams} from "react-router-dom";
import Loader from "../../../shared/components/molecules/Loader";

const ProductDetail = () => {
    const {id} = useParams();
    const {product, loading} = useProductDetail(id);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo="/product-list"/>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-96 w-full">
                    <Loader/>
                </div>
            ) : (

                <div className="flex-grow flex items-center justify-center p-4">
                    <div
                        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                        {product?.image ? (
                            <img src={product?.image} alt="producto"
                                 className="w-full h-full object-cover rounded-md shadow-md"/>
                        ) : (
                            <div className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-8">
                                <span className="text-gray-500 dark:text-gray-400 text-6xl">📷</span>
                            </div>
                        )}

                        <div className="p-8 flex flex-col justify-center">
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg text-center w-3/4 ">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product?.name}</h1>
                            </div>

                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                                {product?.description}
                            </p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                                <div className="flex flex-col items-center">
                                    <FaTags className="text-blue-500 text-3xl"/>
                                    <span
                                        className="mt-2 text-gray-700 dark:text-gray-300 font-semibold text-lg">Categoría</span>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{product?.category}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <FaDollarSign className="text-green-500 text-3xl"/>
                                    <span
                                        className="mt-2 text-gray-700 dark:text-gray-300 font-semibold text-lg">Precio</span>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">${product?.price}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <FaBoxOpen className="text-yellow-500 text-3xl"/>
                                    <span
                                        className="mt-2 text-gray-700 dark:text-gray-300 font-semibold text-lg">Stock</span>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{product?.stock} unidades</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>);

};

export default ProductDetail;