import apiStartups from "../../../core/api/startup";
import {BASE_URLS_STARTUP} from "../../../core/constants/startup/urlsStartup";

const registerStartup = async (formData) => {
    try {
        await apiStartups.post(BASE_URLS_STARTUP.REGISTER_STARTUP, formData);
    } catch (err) {
        console.error("Error registrando la startup", err);
        throw err;
    }
};

export default registerStartup;
