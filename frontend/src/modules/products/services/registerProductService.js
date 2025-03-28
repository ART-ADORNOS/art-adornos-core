import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_PRODUCT} from "../../../core/constants/product/urlsProduct";


const registerProductService = async (formData) => {
    try{
        return (await apiStore.post(`${BASE_URLS_PRODUCT.REGISTER_PRODUCT}`, formData)).data;
    }catch(err){
        throw err;
    }
}

export default registerProductService;