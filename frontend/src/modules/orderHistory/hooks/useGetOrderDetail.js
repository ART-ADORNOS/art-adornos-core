import {useNotification} from "../../../shared/providers/alertProvider";
import {getOrderDetail} from "../service/getOrderDetail";
import {useState} from "react";


const useGetOrderDetail = () => {
    const {showNotification} = useNotification();
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetOrderDetails = async (orderId: number) => {
        setLoading(true);
        try {
            const response = await getOrderDetail(orderId);
            if (response.status === 200) {
                setOrderDetail(response.data);
            }
        } catch (error) {
            showNotification("Error al obtener los detalles de la orden", "error");
        }finally {
            setLoading(false);
        }
    };
    return {orderDetail, handleGetOrderDetails, loading};
}


export {useGetOrderDetail};