import {useEffect, useState} from "react";
import {useNotification} from "../../../shared/providers/alertProvider";
import getProductDetailService from "../services/getProductDetailService";


const useProductDetail = (productId) => {
    const [product, setProduct] = useState(null);
    const {showNotification} = useNotification();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (!productId){
            showNotification("Producto no disponible", "error");
            return;
        }
        const fetchProduct = async () => {
            try {
                const data = await getProductDetailService(productId);
                setProduct(data);
            } catch (error) {
                showNotification("Error al cargar el producto", "error");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct().catch(() => {
            showNotification("Error en el servidor", "error");
        });

    }, [productId, showNotification]);

    return {product, loading};
}

export default useProductDetail;