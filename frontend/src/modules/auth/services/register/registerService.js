import axios from "../../../../core/api/axios";

const registerUser = async (formData) => {
    await axios.post("/register/", formData);
};
export default registerUser;