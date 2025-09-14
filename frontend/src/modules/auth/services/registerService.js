import axios from "../../../../core/api/axios";
import {BASE_URLS_USER} from "../../../../core/constants/user/urlsUser";

const registerUser = async (formData) => {
    await axios.post(BASE_URLS_USER.REGISTER_USER, formData);
};
export default registerUser;