import Navbar from "../../../shared/components/layout/header/Navbar";
import React from "react";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";

const ProductList = () => {

    return (<div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
        <Navbar/>
        <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0">
                ¡Emprendimento, <span className="text-blue-600"> aqui va el nombre</span>
            </div>
        </div>
        <GoBackButton redirectTo="/dashboard-seller"/>
    </div>);
};

export default ProductList;