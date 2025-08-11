import Navbar from "../../../shared/components/organisms/Navbar";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import React, {useState} from "react";
import PageTitle from "../../../shared/components/atoms/PageTitle";
import ROUTES from "../../../core/constants/routes/routes";

const OrderHistoryList = () => {
    const [activeTab, setActiveTab] = useState("Pending");

    const tabs = ['Pending', 'In Progress', 'Completed'];


    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={ROUTES.DASHBOARD}/>
            </div>

            <PageTitle title={"Historial de Pedidos"}/>

            <div className="container mx-auto px-6 sm:px-12 pb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">

                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-6">

                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">SC</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Customer: Sophia Clark
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Date: 2024-01-15 | Total: $150
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>

                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">EB</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Customer: Ethan Bennett
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Date: 2024-01-16 | Total: $200
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>

                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">OC</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Customer: Olivia Carter
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Date: 2024-01-17 | Total: $100
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderHistoryList;