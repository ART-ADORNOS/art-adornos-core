import axios from "../../../../core/api/axios";

const registerUser = async(formData) => {
    try {
        await axios.post("/register/", formData);
    } catch (err) {
        throw err;
    }
};
export default registerUser;