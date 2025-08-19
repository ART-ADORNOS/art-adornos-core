import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_ORDER} from "../../../core/constants/order/urlsOrder";


const registerOrderService = async (order) => {
    const response = await apiStore.post(BASE_URLS_ORDER.REGISTER_ORDER, order);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Failed to register order: ${response.status} ${response.statusText || ''}`);
    }
}

export default registerOrderService;