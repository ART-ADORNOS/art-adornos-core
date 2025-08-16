import Navbar from "../../../shared/components/organisms/Navbar";
import React, {Fragment, useRef, useState} from "react";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {useGetProducts} from "../hooks/useGetProducts";
import {useGetCategories} from "../../category/hooks/useGetCategory";
import CategorySidebar from "../../category/components/CategorySidebar";
import Loader from "../../../shared/components/molecules/Loader";
import USER_TYPE from "../../../core/constants/user/userType";
import BoxOfCardsAnimation from '../../dashboard/components/animations/BoxOfCardsAnimation';
import ROUTES from "../../../core/constants/routes/routes";
import {useDashboardType} from "../../../shared/providers/dashboardTypeProvider";


const ProductList = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedStartup = JSON.parse(localStorage.getItem("selectedStartupData"));
    const {products, loadingTwo} = useGetProducts(selectedStartup?.id);
    const {categories, loading} = useGetCategories(selectedStartup?.id);
    const {dashboardType} = useDashboardType()
    const redirect = dashboardType === USER_TYPE.SELLER ? ROUTES.DASHBOARD_SELLER : ROUTES.DASHBOARD;
    const isLoading = loading || loadingTwo;


    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={redirect}/>

                {dashboardType === USER_TYPE.SELLER && (<div className="relative mr-4" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-full shadow-lg transition-all duration-300"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Crear
                        </button>

                        {isDropdownOpen && (
                            <div
                                id="dropdown-menu"
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50"
                            >
                                <Link
                                    to="/register-category"
                                    className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Nueva Categoría
                                </Link>
                                <Link
                                    to="/register-product"
                                    className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Nuevo Producto
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center h-96 w-full">
                    <Loader/>
                </div>
            ) : (
                <Fragment>
                    <div className="container mx-auto px-14 sm:px-8 py-12">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="text-center sm:text-left">
                                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                                    {selectedStartup?.name}
                                </h1>
                                <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                                    {selectedStartup?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {dashboardType === USER_TYPE.SELLER && categories.length > 0 && (
                        <div className="w-full px-14 py-2 ">
                            <CategorySidebar categories={categories}/>
                        </div>)
                    }

                    {products.length > 0 ? (
                        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product}/>))}
                            </div>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center h-64 text-center text-gray-700 dark:text-gray-300">
                            {dashboardType === USER_TYPE.SELLER ? (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="text-6xl mb-3">📭</span>
                                    <p className="text-lg font-semibold">No se encontraron productos.</p>
                                    <p>¡Anímate a crear tu catálogo para tu emprendimiento!</p>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center pb-20 justify-center h-64 text-center text-gray-700 dark:text-gray-300">
                                    <BoxOfCardsAnimation/>
                                    <p className="text-xl font-bold mt-4 tracking-wide text-gray-800 dark:text-gray-200 shadow-md">
                                        Aun no hay productos publicados.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </Fragment>
            )}
        </div>);
};

export default ProductList;