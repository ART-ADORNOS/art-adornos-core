import apiStore from "../../../core/api/ApiStore";
import {BASE_URLS_STARTUP} from "../../../core/constants/startup/urlsStartup";

const registerStartupService  = async (formData) => {
    try {
        await apiStore.post(BASE_URLS_STARTUP.REGISTER_STARTUP, formData);
    } catch (err) {
        console.error("Error registrando la startup", err);
        throw err;
    }
};

export default registerStartupService ;
