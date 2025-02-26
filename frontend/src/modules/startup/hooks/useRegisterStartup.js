import { useState, useContext } from "react";
import AuthContext from "../../../shared/providers/AuthContext";
import useIndustryOptions from "../hooks/useIndustryOptions";
import registerStartupService  from "../services/startupService";

const useRegisterStartup = () => {
    const { user } = useContext(AuthContext);
    const { industryOptions } = useIndustryOptions();

    const [formData, setFormData] = useState({
        owner: "",
        name: "",
        description: "",
        industry: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e, navigate) => {
        e.preventDefault();
        try {
            if (formData.owner === "") {
                formData.owner = user?.id;
            }
            await registerStartupService(formData);
            setFormData({
                owner: "",
                name: "",
                description: "",
                industry: "",
            });
            navigate('/dashboard-seller');
        } catch (err) {
            console.error(err);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        industryOptions,
    };
};

export default useRegisterStartup;
