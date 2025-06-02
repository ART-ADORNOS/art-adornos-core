import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_CART} from "../../../core/constants/carts/urlsCarts";

const registerCartService = async (formData) => {
    const response = await apiStore.post(BASE_URLS_CART.REGISTER_CART, formData);
    if (response.status === 200) return response.data;

}

export default registerCartService;