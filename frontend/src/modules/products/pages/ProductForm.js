import Navbar from "../../../shared/components/organisms/Navbar";
import GoBackButton from "../../../shared/components/molecules/GoBackButton";
import {useLocation, useNavigate} from "react-router-dom";
import useRegisterProduct from "../hooks/useRegisterProduct";
import ProductInput from "../components/ProductInput";
import Alert from "../components/Alert";
import useInitializeProductForm from "../hooks/useInitializeProductForm";
import ROUTES from "../../../core/constants/routes/routes";
import ButtonSubmit from "../../../shared/components/atoms/ButtonSubmit";
import ButtonCancel from "../../../shared/components/atoms/ButtonCancel";


const ProductForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {
        formData,
        handleChange,
        handleSubmit,
        categories,
        setFormData,
        showAlert,
        closeAlert
    } = useRegisterProduct(state?.productId);
    useInitializeProductForm(state, setFormData);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <GoBackButton redirectTo="/product-list"/>
            <section className="text-center my-2 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold">{state ? 'Editar Producto' : 'Registro de Producto'}</h1>
            </section>
            {showAlert && <Alert message="La imagen es obligatoria" onClose={closeAlert}/>}

            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 pd-20">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
                    <form onSubmit={(e) => handleSubmit(e, navigate)}
                          className="bg-white p-10 rounded-lg shadow-md mb-20">
                        <ProductInput
                            formData={formData}
                            handleChange={handleChange}
                            categories={categories}
                        />
                        <div className="mt-6 flex gap-x-6">
                            <ButtonSubmit text={state ? 'Actualizar' : 'Registrar'}/>
                            <ButtonCancel route={ROUTES.PRODUCT_LIST}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
        ;
};

export default ProductForm;