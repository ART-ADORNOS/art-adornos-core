import Navbar from "../../../shared/components/organisms/Navbar";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import React, {useState} from "react";
import PageTitle from "../../../shared/components/atoms/PageTitle";
import ROUTES from "../../../core/constants/routes/routes";
import {useDashboardType} from "../../../shared/providers/dashboardTypeProvider";
import USER_TYPE from "../../../core/constants/user/userType";
import TABS from "../../../core/constants/tabLabels";
import {useGetOrder} from "../hooks/useGetOrder";
import Loader from "../../../shared/components/molecules/Loader";
import {FaUser} from "react-icons/fa";
import {useGetOrderDetail} from "../hooks/useGetOrderDetail";
import {OrderDetailModal} from "../components/OrderDetailModal";

const OrderHistoryList = () => {
    const {order: fetchOrders, loading} = useGetOrder();
    const [activeTab, setActiveTab] = useState("Pending");
    const tabs = TABS
    const {dashboardType} = useDashboardType();
    const [showModal, setShowModal] = useState(false);
    const redirectTo = dashboardType === USER_TYPE.USER ? ROUTES.DASHBOARD : ROUTES.DASHBOARD_SELLER;
    const {orderDetail, handleGetOrderDetails, loadingDetail} = useGetOrderDetail()

    const handleOpenModal = (orderId: number) => {
        void handleGetOrderDetails(orderId);
        setShowModal(true);
    }

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <GoBackButton redirectTo={redirectTo}/>
            </div>

            <PageTitle title={"Historial de Pedidos"}/>

            <div className="container mx-auto px-6 sm:px-12 pb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">

                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (<button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                {tab}
                            </button>))}
                        </nav>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-6">
                        {loading ? (<Loader/>) : fetchOrders.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                                No orders found.
                            </p>
                        ) : (fetchOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                        {order.customer_initials}
                                    </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <FaUser className="text-blue-500"/>
                                                    {order.customer_name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Enviado: {order.created_at} | Total: ${order.total_amount}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleOpenModal(order.id)}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>)
                            )
                        )}
                    </div>
                    {showModal && (
                        <OrderDetailModal orderDetail={orderDetail}/>
                    )}
                </div>
            </div>
        </div>);
}

export default OrderHistoryList;