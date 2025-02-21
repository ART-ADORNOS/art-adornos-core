import {BASE_URLS_STARTUP} from "../../../../core/constants/startup/urlsStartup";
import apiStartups from "../../../../core/api/startup";

export const getStartup = async () => {
    const response = await apiStartups.get(BASE_URLS_STARTUP.GET_STARTUP);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al cargar la información de la startup');
    }

}