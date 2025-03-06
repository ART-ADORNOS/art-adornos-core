import {useNotification} from "../../../shared/providers/alertProvider";
import {useEffect, useState} from "react";
import getProducts from "../services/productService";


const useGetProducts = (startupId) => {
    const [products, setProducts] = useState([]);
    const {showNotification} = useNotification();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!startupId) return;

            try {
                const data = await getProducts(startupId);
                setProducts(data);
            } catch (error) {
                showNotification("Error al cargar los productos", "error");
            }

        };

        fetchProducts().catch((error) => {
            showNotification("Error en el servidor", "error");
        });

    }, [startupId, showNotification]);

    return {products};
};

export {useGetProducts};