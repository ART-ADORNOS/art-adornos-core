import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const getProductDetailService = async (productId) => {
    try {
        const response = await apiStore.get(`${BASE_URLS_PRODUCT.DETAIL_PRODUCT}${productId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new error(`Error al obtener los detalles del producto`);
    }
}

export default getProductDetailService;