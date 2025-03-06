import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const deleteProductService =async (ProductId) => {
    try{
        const response = await apiStore.delete(`${BASE_URLS_PRODUCT.DELETE_PRODUCT}${ProductId}`);
        return response;
    }catch(err){
        throw err;
    }
}

export default deleteProductService;