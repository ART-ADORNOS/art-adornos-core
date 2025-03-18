import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_CATEGORY} from "../../../core/constants/category/urlsCategory";


const updateCategoryService = async (categoryId, formData) => {
    try {
        const response = await apiStore.put(`${BASE_URLS_CATEGORY.UPDATE_CATEGORY}${categoryId}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export default updateCategoryService;