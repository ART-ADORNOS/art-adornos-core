import Navbar from "../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import React from "react";

const OrderHistoryList = () => {

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
                            Historial de Pedidos
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistoryList;