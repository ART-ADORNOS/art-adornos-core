import {useContext, useState} from "react";
import AuthContext from "../../../shared/providers/AuthContext";
import registerStartupService from "../services/startupService";
import {useNotification} from "../../../shared/providers/alertProvider";
import updateStartupService from "../services/updateStartupService";
import ROUTES from "../../../core/constants/routes/routes";

const useRegisterStartup = (startupId = null) => {
    const {user} = useContext(AuthContext);
    const {showNotification} = useNotification();

    const [formData, setFormData] = useState({
        owner: "",
        name: "",
        description: "",
        industry: "",
        icon: "",
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
        if (startupId) {
            try {
                formData.owner ||= user?.id;
                formData.industry = Array.isArray(formData.industry) ? formData.industry[0] : formData.industry;
                await updateStartupService(startupId, formData);
                showNotification("Emprendimiento actualizado exitosamente", "success");
                navigate(ROUTES.DASHBOARD_SELLER);
            } catch (err) {
                showNotification("Error al actualizar el emprendimiento", "error");
            }
        } else {
            try {
                formData.owner ||= user?.id;
                await registerStartupService(formData);
                setFormData({
                    owner: "",
                    name: "",
                    description: "",
                    industry: "",
                    icon: "",
                });
                showNotification("Emprendimiento registrado exitosamente", "success");
                navigate(ROUTES.DASHBOARD_SELLER);
            } catch (err) {
                showNotification("Error al registrar el emprendimiento", "error");
            }
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
    };
};

export default useRegisterStartup;
