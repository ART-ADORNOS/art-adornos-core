import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_ORDER} from "../../../core/constants/order/urlsOrder";


export const getOrder = async () => {
    try {
        return await apiStore.get(`${BASE_URLS_ORDER.GET_ORDERS}`);
    } catch (error) {
        throw error
    }
}