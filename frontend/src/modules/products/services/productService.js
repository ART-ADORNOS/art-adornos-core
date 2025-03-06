import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const getProducts = async (startupId) => {
    try {
        const response = await apiStore.get(`${BASE_URLS_PRODUCT.GET_PRODUCT}${startupId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos", error);
        throw error;
    }
}

export default getProducts;