import {useContext, useState} from "react";
import registerProductService from "../services/registerProductService";
import {StartupContext} from "../../startup/context/StartupProvider";
import {useNotification} from "../../../shared/providers/alertProvider";
import {useGetCategories} from "../../category/hooks/useGetCategory";
import updateProductService from "../services/updateProductService";

const useRegisterProduct = (productId = null) => {
    const {selectedStartup} = useContext(StartupContext);
    const { categories } = useGetCategories(selectedStartup?.id);
    const {showNotification} = useNotification();

    const [formData, setFormData] = useState({
        start_up: "",
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e, navigate) => {
        e.preventDefault();

        if (productId) {
            try {
                formData.start_up = formData.start_up || selectedStartup?.id;
                await updateProductService(productId, formData);
                showNotification("Producto actualizado exitosamente", "success");
                navigate("/product-list");
            } catch (err) {
                showNotification("Error al actualizar el producto", "error");
            }
        } else {
            try {
                formData.start_up = formData.start_up || selectedStartup?.id;
                await registerProductService(formData);
                setFormData({
                    start_up: "",
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    stock: "",
                });
                showNotification("Producto registrado exitosamente", "success");
                navigate("/product-list");
            } catch (err) {
                showNotification("Error al registrar el producto", "error");
            }
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        categories,
    };
}

export default useRegisterProduct;