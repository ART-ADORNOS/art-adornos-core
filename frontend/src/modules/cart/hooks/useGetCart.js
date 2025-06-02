import {useEffect, useState} from "react";
import {useNotification} from "../../../shared/providers/alertProvider";
import {getCart} from "../service/getCart";

const useGetCart = () => {
    const {showNotification} = useNotification();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchCategories = async () => {
            try {
                const data = await getCart();
                setCarts(data);
            } catch {
                showNotification("Error al cargar la información del carrito", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories().catch(() => {
            showNotification("Error en el servidor", "error");
        });

    }, [showNotification]);

    return {carts, loading};
};

export {useGetCart};
