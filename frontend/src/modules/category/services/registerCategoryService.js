import {BASE_URLS_CATEGORY} from "../../../core/constants/category/urlsCategory";
import apiStore from "../../../core/api/ApiStore";


const registerCategoryService = async (formData) => {
    try{
        await apiStore.post(BASE_URLS_CATEGORY.REGISTER_CATEGORY, formData);
    }catch(err){
        console.error("Error registrando la categoría", err);
        throw err;
    }
}

export default registerCategoryService;