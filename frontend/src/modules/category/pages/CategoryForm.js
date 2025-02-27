import Navbar from "../../../shared/components/layout/header/Navbar";
import {useNavigate} from "react-router-dom";
import useRegisterCategory from "../hooks/useRegisterCategory";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";


const CategoryForm = () => {
    const navigate = useNavigate();
    const {formData, handleChange, handleSubmit} = useRegisterCategory();

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <GoBackButton redirectTo="/product-list"/>
            <section className="text-center my-2 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">Registro de Categoría</h1>
            </section>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 pd-20">
            </div>
        </div>
    )
}

export default CategoryForm;