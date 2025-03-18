import {useNotification} from "../../../shared/providers/alertProvider";
import {useEffect, useState} from "react";
import getProducts from "../services/productService";


const useGetProducts = (startupId) => {
    const [products, setProducts] = useState([]);
    const {showNotification} = useNotification();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            const startupId = localStorage.getItem("selectedStartupId");
            if (!startupId) return;
            try {
                const data = await getProducts(startupId);
                setProducts(data);
            } catch (error) {
                showNotification("Error al cargar los productos", "error");
            }finally{
                setLoading(false);
            }
        };

        fetchProducts().catch(() => {
            showNotification("Error en el servidor", "error");
        });

    }, [showNotification, startupId]);

    return {products, loading};
};

export {useGetProducts};