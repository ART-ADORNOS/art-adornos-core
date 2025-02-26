import Navbar from "../../../shared/components/layout/header/Navbar";
import React, { useContext, useRef, useState } from "react";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import { StartupContext } from "../../startup/context/StartupProvider";
import { Link } from "react-router-dom";

const ProductList = () => {
    const { selectedStartup } = useContext(StartupContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar />
            <div className="flex items-center justify-between w-full px-4 py-2 overflow-visible">
                <GoBackButton redirectTo="/dashboard-seller" />
                <div className="relative mr-4" ref={dropdownRef}>
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                        aria-controls="dropdown-menu"
                    >
                        + Crear
                        <span className="ml-1">▼</span>
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
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    <div className="text-center sm:text-left">
                        <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent animate-fade-in font-serif">
                            {selectedStartup?.name}
                        </h1>
                        <p className="mt-8 text-2xl sm:text-3xl text-gray-700 dark:text-gray-200 max-w-3xl leading-loose font-semibold animate-fade-in delay-300 font-serif">
                            {selectedStartup?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;