import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_CATEGORY} from "../../../core/constants/category/urlsCategory";


export const getCategory = async (startupId) => {
    const response = await apiStore.get(`${BASE_URLS_CATEGORY.GET_CATEGORY}${startupId}`);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al cargar la información de la categoría');
    }
}