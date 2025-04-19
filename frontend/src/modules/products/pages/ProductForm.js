import Navbar from "../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import {useLocation, useNavigate} from "react-router-dom";
import useRegisterProduct from "../hooks/useRegisterProduct";
import {useEffect} from "react";
import ProductInput from "../components/ProductInput";
import Alert from "../components/Alert";


const ProductForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {formData, handleChange, handleSubmit, categories, setFormData, showAlert, closeAlert} = useRegisterProduct(state?.productId);

    useEffect(() => {
        if (state) {
            const {productName, productDescription, productPrice, productCategory, productStock, productImage} = state;
            setFormData(prevData => ({
                ...prevData,
                name: productName || '',
                description: productDescription || '',
                price: productPrice || '',
                stock: productStock || '',
                category: productCategory || '',
                image: productImage || ''
            }));
        }
    }, [state, setFormData]);

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
                        <div className="mt-6">
                            <button type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                {state ? 'Actualizar' : 'Registrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};

export default ProductForm;