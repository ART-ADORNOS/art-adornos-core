import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const registerProductService = async (formData) => {
    try{
        await apiStore.post(BASE_URLS_PRODUCT.REGISTER_PRODUCT, formData);
    }catch(err){
        throw err;
    }
}

export default registerProductService;