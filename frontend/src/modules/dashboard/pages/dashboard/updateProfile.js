import React, {useContext, useState} from "react";
import AuthContext from "../../../../shared/providers/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../../shared/components/ui/Buttons/goBack";
import InputField from "../../../../shared/components/ui/Fields/InputField";
import {useNotification} from "../../../../shared/providers/alertProvider";

const UpdateProfile = () => {
    const {user, updateUser} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        username: user?.username || "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const {showNotification} = useNotification();
    const dashboardRedirect = location.state?.fromDashboard === "userSeller"
        ? "/dashboard-seller"
        : "/dashboard"

    const [errors, setErrors] = useState(
        {email: false})

    const handleChange = (e) => {
        const {name, value} = e.target;
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
        const noChanges =
            formData.first_name === user.first_name &&
            formData.last_name === user.last_name &&
            formData.email === user.email &&
            formData.username === user.username;
        if (noChanges) {
            showNotification("No se realizaron cambios", "info"); return;
        }
        try {
            const success = await updateUser(formData);
            if (success) {
                showNotification("Perfil actualizado con éxito", "success");
                navigate(dashboardRedirect, {state: {updateSuccess: true}});
            } else {
                showNotification("Error al actualizar el perfil", "error");
            }
        } catch (err) {
            showNotification(err.response?.data?.message || "Error desconocido", "error");

        }
    };

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <GoBackButton redirectTo={dashboardRedirect}/>
            <section className="text-center my-16 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Actualizar perfil</h1>
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
                                error={errors.email}
                                errorMessage="Por favor, introduce un correo electrónico válido."
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