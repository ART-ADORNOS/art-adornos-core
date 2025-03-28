import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const updateProductService = async (ProductId, formData) => {
    try {
        return (await apiStore.put(`${BASE_URLS_PRODUCT.UPDATE_PRODUCT}${ProductId}`, formData)).data;
    } catch (error) {
        throw error;
    }

}

export default updateProductService;