import {useNotification} from "../../../shared/providers/alertProvider";
import {useEffect, useState} from "react";
import {getOrder} from "../service/getOrderService";


const useGetOrder = () => {
    const {showNotification} = useNotification();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchOrder = async () => {
            try {
                const response = await getOrder();
                if (response.status === 200) {
                    setOrder(response.data);
                }
            } catch {
                showNotification("Error al cargar la información del carrito", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();

    }, []);
    return {order, loading};
}


export {useGetOrder};