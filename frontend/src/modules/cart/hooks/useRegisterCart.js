import {useNotification} from "../../../shared/providers/alertProvider";
import registerCartService from "../service/registerCartService";


const useRegisterCart = () => {
    const {showNotification} = useNotification();
    const handleSubmit = async (e, data) => {
        e.preventDefault();

        try {
            await registerCartService(data);
            showNotification("Carrito creado con éxito", "success");

        } catch (err) {
            showNotification("Error al crear el carrito", "error");
        }
    };
    return {handleSubmit};
}

export default useRegisterCart;