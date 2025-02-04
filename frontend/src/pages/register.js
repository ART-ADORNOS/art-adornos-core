import React, { useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import InputField from "../components/Fields/InputField";
import AlertMessage from "../components/Messages/AlertMessage";
import GoBackButton from "../components/Buttons/goBack";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        passwordMatch: false,
    });
    const [focus, setFocus] = useState({
        email: false,
        password: false,
        confirm_password: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "email") {
            setErrors({
                ...errors,
                email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            });
        }
        if (name === "confirm_password") {
            setErrors({
                ...errors,
                passwordMatch: formData.password !== value,
            });
        }
    };

    const handleFocus = (field) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field) => {
        setFocus({ ...focus, [field]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/register/", formData);
            setMessage(response.data.message || "Registro exitoso. Redirigiendo al login...");
            setMessageType("success");
            setShowMessage(true);

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: "",
                confirm_password: "",
            });

            setTimeout(() => {
                navigate('/login');
            }, 1000);
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

            setMessage(errorMessage);
            setMessageType("error");
            setShowMessage(true);

            setTimeout(() => setShowMessage(false), 4000);
        }
    };

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar />
            <GoBackButton redirectTo="/login" />
            <section className="text-center my-16 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Registro de usuarios</h1>
                {showMessage && (
                    <AlertMessage message={message} type={messageType} onClose={() => setShowMessage(false)} />
                )}
                <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                            <InputField
                                label="Nombre"
                                name="first_name"
                                type="text"
                                placeholder="Nombre"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Apellido"
                                name="last_name"
                                type="text"
                                placeholder="Apellido"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus("email")}
                                onBlur={() => handleBlur("email")}
                                error={errors.email}
                                errorMessage="Por favor, introduce un correo electrónico válido."
                                className={errors.email && focus.email ? "border-pink-500" : "border-gray-300"}
                            />
                            <InputField
                                label="Nombre de usuario"
                                name="username"
                                type="text"
                                placeholder="Nombre de usuario"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Contraseña"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Confirmar contraseña"
                                name="confirm_password"
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                error={errors.passwordMatch}
                                errorMessage="Las contraseñas no coinciden."
                                className={errors.passwordMatch ? "border-pink-500" : "border-gray-300"}
                            />
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                            >
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;