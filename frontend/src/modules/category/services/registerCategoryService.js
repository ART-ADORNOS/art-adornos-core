import {BASE_URLS_CATEGORY} from "../../../core/constants/category/urlsCategory";
import apiStore from "../../../core/api/ApiStore";


const registerCategoryService = async (formData) => {
    try {
        await apiStore.post(BASE_URLS_CATEGORY.REGISTER_CATEGORY, formData);
    } catch (err) {
        throw new Error("Error al registrar la categoría. Intente nuevamente más tarde.");
    }
}

export default registerCategoryService;