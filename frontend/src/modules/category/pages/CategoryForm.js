import Navbar from "../../../shared/components/organisms/Navbar";
import {useLocation, useNavigate} from "react-router-dom";
import useRegisterCategory from "../hooks/useRegisterCategory";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import InputField from "../../../shared/components/atoms/InputField";
import useInitializeCategoryForm from "../hooks/useInitializeCategoryForm";
import ButtonSubmit from "../../../shared/components/atoms/ButtonSubmit";
import ButtonCancel from "../../../shared/components/atoms/ButtonCancel";
import ROUTES from "../../../core/constants/routes/routes";


const CategoryForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {formData, handleChange, handleSubmit, setFormData} = useRegisterCategory(state?.categoryId);
    useInitializeCategoryForm(state, setFormData);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <GoBackButton redirectTo={ROUTES.PRODUCT_LIST}/>
            <section className="text-center my-2 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Registro de Categoría</h1>
            </section>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 pd-20">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e) => handleSubmit(e, navigate)}
                          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-20">
                        <InputField
                            label="Nombre"
                            name="name"
                            type="text"
                            placeholder="Nombre de la categoría"
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
                        <div className="mt-6 flex gap-x-6">
                            <ButtonSubmit text="Registrar"/>
                            <ButtonCancel route={ROUTES.PRODUCT_LIST}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;