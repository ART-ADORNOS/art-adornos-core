import {useState} from "react";
import {useNotification} from "../../../shared/providers/alertProvider";
import registerUser from "../services/register/registerService";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../../core/constants/routes/routes";
import isEmail from 'validator/lib/isEmail';

export function useRegister() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        is_seller: false,
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        passwordMatch: false,
    });

    const [focus, setFocus] = useState({
        email: false,
        password: false,
        confirm_password: false,
    });

    const {showNotification} = useNotification();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;

        setFormData((prevData) => {
            const newData = {
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            };

            if (name === "confirm_password") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordMatch: newData.password !== value,
                }));
            }
            return newData;
        });

        if (name === "email") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: !isEmail(value),
            }));
        }
    };

    const handleFocus = (field) => {
        setFocus({...focus, [field]: true});
    };

    const handleBlur = (field) => {
        setFocus({...focus, [field]: false});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(v => !v)) {
            showNotification("Por favor, rellena todos los campos", "error");
            return;
        }

        try {
            await registerUser(formData);
            showNotification("Registro exitoso. Redirigiendo al login...", "success");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                phone: "",
                address: "",
                city: "",
                country: "",
                is_seller: false,
                password: "",
                confirm_password: "",
            });
            navigate(ROUTES.LOGIN);
        } catch (err) {
            let errorMessage = "Error desconocido";
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.email) {
                    errorMessage = `Correo electrónico: ${err.response.data.email[0]}`;
                } else if (err.response.data.username) {
                    errorMessage = `Nombre de usuario: ${err.response.data.username[0]}`;
                } else if (err.response.data.password) {
                    errorMessage = `Contraseña: ${err.response.data.password[0]}`;
                }
            }
            showNotification(errorMessage, "error");
        }
    };

    return {
        formData,
        errors,
        focus,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
    };
}
