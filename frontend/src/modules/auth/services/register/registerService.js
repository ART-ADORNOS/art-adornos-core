import axios from "../../../../core/api/axios";

const registerUser = async(formData) => {
    try {
        await axios.post("/register/", formData);
    } catch (err) {
        console.error("Error registrando el usuario", err);
        throw err;
    }
};
export default registerUser;