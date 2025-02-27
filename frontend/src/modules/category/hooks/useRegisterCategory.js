import {useState} from "react";
import registerCategoryService from "../services/registerCategoryService";


const useRegisterCategory = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e, navigate) => {
        e.preventDefault();
        try {
            await registerCategoryService(formData);
            setFormData({
                name: "",
                description: ""
            });
            navigate('/product-list');

        } catch (err) {
            console.error(err);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}

export default useRegisterCategory;
