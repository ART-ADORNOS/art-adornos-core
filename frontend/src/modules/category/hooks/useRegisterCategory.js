import {useContext, useState} from "react";
import registerCategoryService from "../services/registerCategoryService";
import {useNotification} from "../../../shared/providers/alertProvider";
import {StartupContext} from "../../startup/context/StartupProvider";


const useRegisterCategory = () => {
    const {selectedStartup} = useContext(StartupContext);
    const { showNotification } = useNotification();

    const [formData, setFormData] = useState({
        start_up: "",
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
            formData.start_up = formData.start_up || selectedStartup?.id;
            await registerCategoryService(formData);
            setFormData({
                start_up: "",
                name: "",
                description: ""
            });
            navigate('/product-list');
            showNotification("Categoría creada con éxito", "success");

        } catch (err) {
            showNotification("Error al crear la categoría", "error");
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}

export default useRegisterCategory;
