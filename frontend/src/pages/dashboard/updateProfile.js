import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import GoBackButton from "../../components/Buttons/goBack";
import AlertMessage from "../../components/Messages/AlertMessage";
import InputField from "../../components/Fields/InputField";

const UpdateProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        username: user?.username || "",
    });

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [errors, setErrors] = useState({
        email: false,
    });

    const [focus, setFocus] = useState({
        email: false,
    });

    const handleFocus = (field) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field) => {
        setFocus({ ...focus, [field]: false });
    };

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
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const success = await updateUser(formData);
            if (success) {
                navigate("/dashboard", {
                    state: {
                        updateSuccess: true,
                        message: "Perfil actualizado con éxito",
                        messageType: "success",
                        messageDuration: 3000,
                    },
                });
            } else {
                setMessage("Error al actualizar el perfil");
                setMessageType("error");
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 4000);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Error desconocido");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 4000);
        }
    };

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar />
            <GoBackButton redirectTo="/dashboard" />
            <section className="text-center my-16 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Actualizar perfil</h1>
                {showMessage && (
                    <AlertMessage message={message} type={messageType} onClose={() => setShowMessage(false)} />
                )}
                <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
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
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                            >
                                Actualizar
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateProfile;