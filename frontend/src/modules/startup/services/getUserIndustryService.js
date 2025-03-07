import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_STARTUP} from "../../../core/constants/startup/urlsStartup";


export const getUserIndustry = async () => {
    const response = await apiStore.get(BASE_URLS_STARTUP.GET_USER_INDUSTRY);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al cargar la información de la industria');
    }
}