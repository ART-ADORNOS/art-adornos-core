import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_CATEGORY} from "../../../core/constants/category/urlsCategory";


const deleteCategoryService = async (categoryId) => {
    try {
        const response = await apiStore.delete(`${BASE_URLS_CATEGORY.DELETE_CATEGORY}${categoryId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error("Failed to delete category. Please try again later.");
    }
}

export default deleteCategoryService;