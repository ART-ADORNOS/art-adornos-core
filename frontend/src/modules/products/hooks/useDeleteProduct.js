import {useNotification} from "../../../shared/providers/alertProvider";
import {useState} from "react";
import deleteProductService from "../services/deleteProductService";


const useDeleteProduct = (productId) => {
    const {showNotification} = useNotification();
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteProduct = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteProductService(productId);
            if (result) {
                showNotification("Producto eliminado con éxito", "success");
            }
        } catch (error) {
            showNotification("Error al eliminar el producto", "error");
        } finally {
            setIsDeleting(false);
        }
    };
    return {deleteProduct, isDeleting};
}

export {useDeleteProduct};