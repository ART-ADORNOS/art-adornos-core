import Navbar from "../../../shared/components/organisms/Navbar";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import React from "react";
import PageTitle from "../../../shared/components/atoms/PageTitle";
import ROUTES from "../../../core/constants/routes/routes";

const OrderHistoryList = () => {

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={ROUTES.DASHBOARD}/>
            </div>

            <PageTitle title={"Historial de Pedidos"}/>

            <div className="container mx-auto px-6 sm:px-12 pb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="overflow-x-auto">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistoryList;