import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_ORDER} from "../../../core/constants/order/urlsOrder";


export const getOrderDetail = async (orderId) => {
    try {
        return await apiStore.get(`${BASE_URLS_ORDER.GET_ORDER_DETAIL}${orderId}/`);
    } catch (error) {
        throw error
    }
}