import {useNotification} from "../../../shared/providers/alertProvider";
import {useState} from "react";
import deleteProductCartService from "../service/deleteProductCartService";


const useDeleteProductCart = () => {
    const {showNotification} = useNotification();
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteProductCart = async (productCartId) => {
        setIsDeleting(true)
        try {
            const result = await deleteProductCartService(productCartId);
            if (result) {
                showNotification("Producto eliminado del carrito con éxito", "success");
            }
        } catch (error) {
            showNotification("Error al eliminar el producto del carrito", "error");
        } finally {
            setIsDeleting(false);
        }
    };
    return {deleteProductCart, isDeleting};

}

export default useDeleteProductCart;