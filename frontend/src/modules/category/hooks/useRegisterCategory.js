import {useState} from "react";
import registerCategoryService from "../services/registerCategoryService";
import {useNotification} from "../../../shared/providers/alertProvider";
import updateCategoryService from "../services/updateCategoryService";
import ROUTES from "../../../core/constants/routes/routes";


const useRegisterCategory = (categoryId = null) => {
    const {showNotification} = useNotification();
    const startupId = localStorage.getItem("selectedStartupId");


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

        if (categoryId) {
            try {
                formData.start_up = formData.start_up || startupId;
                await updateCategoryService(categoryId, formData);
                showNotification("Categoría actualizada con éxito", "success");
                navigate(ROUTES.PRODUCT_LIST);
            } catch {
                showNotification("Error al actualizar la categoría", "error");
            }
        } else {
            try {
                formData.start_up = formData.start_up || startupId;
                await registerCategoryService(formData);
                setFormData({
                    start_up: "",
                    name: "",
                    description: ""
                });
                navigate(ROUTES.PRODUCT_LIST);
                showNotification("Categoría creada con éxito", "success");

            } catch {
                showNotification("Error al crear la categoría", "error");
            }
        }

    };

    return {
        formData,
        handleChange,
        handleSubmit,
        setFormData
    };
}

export default useRegisterCategory;
