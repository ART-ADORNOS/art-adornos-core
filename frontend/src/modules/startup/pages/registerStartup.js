import Navbar from "../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import {useNavigate} from "react-router-dom";
import InputField from "../../../shared/components/ui/Fields/InputField";
import useRegisterStartup from "../hooks/useRegisterStartup";

const RegisterStartup = () => {
    const navigate = useNavigate();
    const {formData, handleChange, handleSubmit, industryOptions} = useRegisterStartup();

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
        <Navbar/>
        <GoBackButton redirectTo="/dashboard-seller"/>
        <section className="text-center my-2 mx-8 flex-auto">
            <h1 className="text-5xl font-extrabold">Registro de Emprendimiento</h1>
        </section>
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 pd-20">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => handleSubmit(e, navigate)}
                      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-20">
                    <InputField
                        label="Nombre"
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
    </div>);
};

export default RegisterStartup;
