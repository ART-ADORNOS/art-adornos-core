import {useNotification} from "../../../shared/providers/alertProvider";
import {useState} from "react";


const useRegisterCart = () => {
    const {showNotification} = useNotification();

    const [formData, setFormData] = useState({
        product_id: "",
        quantity: 1
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
            console.log(formData);
            // await registerCartService(formData);
            setFormData({
                product_id: 0,
                quantity: 0
            });
            showNotification("Carrito creado con éxito", "success");

        } catch (err) {
            showNotification("Error al crear el carrito", "error");
        }
    };
    return {
        formData,
        handleChange,
        handleSubmit,
        setFormData
    };
}

export default useRegisterCart;