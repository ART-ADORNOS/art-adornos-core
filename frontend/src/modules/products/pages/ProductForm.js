import Navbar from "../../../shared/components/layout/header/Navbar";
import GoBackButton from "../../../shared/components/ui/Buttons/goBack";
import {useLocation, useNavigate} from "react-router-dom";
import useRegisterProduct from "../hooks/useRegisterProduct";
import InputField from "../../../shared/components/ui/Fields/InputField";
import {useEffect} from "react";


const ProductForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {formData, handleChange, handleSubmit, categories, setFormData} = useRegisterProduct(state?.productId);

    useEffect(() => {
        if (state) {
            const {productName, productDescription, productPrice, productCategory, productStock} = state;
            setFormData(prevData => ({
                ...prevData,
                name: productName || '',
                description: productDescription || '',
                price: productPrice || '',
                stock: productStock || '',
                category: productCategory || '',
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
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 pd-20">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e) => handleSubmit(e, navigate)}
                          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-20">
                        <InputField
                            label="Nombre"
                            name="name"
                            type="text"
                            placeholder="Nombre del producto"
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
                            label="Categoría"
                            name="category"
                            type="text"
                            placeholder="Categoría"
                            value={formData.category}
                            onChange={handleChange}
                            options={categories.map(category => [category.name])}
                        />
                        <InputField
                            label="Precio"
                            name="price"
                            type="text"
                            placeholder="Precio"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Stock"
                            name="stock"
                            type="text"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                             {state ? 'Actualizar' : 'Registrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;