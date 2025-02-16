import Navbar from "../../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../../shared/components/ui/Buttons/goBack";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import InputField from "../../../../shared/components/ui/Fields/InputField";
import AuthContext from "../../../../shared/providers/AuthContext";
import useIndustryOptions from "../../hooks/startup/useIndustryOptions";
import registerStartup from "../../services/startup/startupService";

const RegisterStartup = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const {industryOptions} = useIndustryOptions();

    const [formData, setFormData] = useState({
        owner: "",
        name: "",
        description: "",
        industry: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.owner === "") {
                formData.owner = user?.id;
            }
            await registerStartup(formData);
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

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <GoBackButton redirectTo="/dashboard-seller"/>
            <section className="text-center my-2 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Registro de Emprendimiento</h1>
            </section>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <InputField
                            label="Nombre del emprendimiento"
                            name="name"
                            type="text"
                            placeholder="Nombre del emprendimiento"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Descripción"
                            name="description"
                            type="text"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Industria"
                            name="industry"
                            type="text"
                            placeholder="Industria"
                            value={formData.industry}
                            onChange={handleChange}
                            options={industryOptions}
                        />
                        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterStartup;
