import {useContext, useState} from "react";
import registerProductService from "../services/registerProductService";
import {StartupContext} from "../../startup/context/StartupProvider";
import {useNotification} from "../../../shared/providers/alertProvider";
import {useGetCategories} from "../../category/hooks/useGetCategory";
import updateProductService from "../services/updateProductService";

const useRegisterProduct = (productId = null) => {
    const {selectedStartup} = useContext(StartupContext);
    const idST = localStorage.getItem("selectedStartupId");
    const {categories} = useGetCategories(selectedStartup?.id || idST);
    const {showNotification} = useNotification();
    const [showAlert, setShowAlert] = useState(false);
    const closeAlert = () => {
        setShowAlert(false);
    };

    const [formData, setFormData] = useState({
        start_up: "",
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: null,
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "image") {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e, navigate) => {
        e.preventDefault();
        if (!formData.image) {
            setShowAlert(true);
            return;
        }

        const categoryId = categories.find((cat) => cat.name === formData.category)?.id;

        const form = new FormData();
        form.append("start_up", idST);
        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("category", categoryId || "");
        form.append("price", formData.price);
        form.append("stock", formData.stock);
        if (formData.image instanceof File) {
            form.append("image", formData.image);
        }

        if (productId) {
            try {
                await updateProductService(productId, form);
                showNotification("Producto actualizado exitosamente", "success");
                navigate("/product-list");
            } catch (err) {
                showNotification("Error al actualizar el producto", "error");
            }
        } else {
            try {
                await registerProductService(form);
                setFormData({
                    start_up: "",
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    stock: "",
                    image: null,
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
        showAlert,
        closeAlert
    };
}

export default useRegisterProduct;