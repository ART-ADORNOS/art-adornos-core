import {useContext, useState} from "react";
import registerProductService from "../services/registerProductService";
import {StartupContext} from "../../startup/context/StartupProvider";
import {useNotification} from "../../../shared/providers/alertProvider";
import {useGetCategories} from "../../category/hooks/useGetCategory";

const useRegisterProduct = () => {
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
            navigate('/product-list');
            showNotification("Producto registrado exitosamente", "success");
        } catch (err) {
            showNotification("Error al registrar el producto", "error");
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        categories,
    };
}

export default useRegisterProduct;