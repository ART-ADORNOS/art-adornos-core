import deleteCategoryService from "../services/deleteCategoryService";
import {useNotification} from "../../../shared/providers/alertProvider";
import {useState} from "react";


const useDeleteCategory = () => {
    const {showNotification} = useNotification();
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteCategory = async (categoryId) => {
        if (!categoryId) return;

        setIsDeleting(true)
        try {
            const result = await deleteCategoryService(categoryId);
            if (result) {
                showNotification("Categoría eliminada con éxito", "success");
            }
        } catch {
            showNotification("Error al eliminar la categoría", "error");
        } finally {
            setIsDeleting(false);
        }
    };
    return {deleteCategory, isDeleting};
}

export {useDeleteCategory};