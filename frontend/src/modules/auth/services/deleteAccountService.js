import {BASE_URLS_USER} from "../../../core/constants/user/urlsUser";
import api from "../../../core/api/axios";


export const deleteAccountService = async () => {
    try {
        return await api.delete(BASE_URLS_USER.DELETE_USER)
    } catch (error) {
        throw error
    }
}