import {useNotification} from "../../../shared/providers/alertProvider";
import registerOrderService from "../service/registerOrderService";

const useRegisterOrder = () => {
    const {showNotification} = useNotification();

    const handleRegisterOrder = async (e, dataOrder) => {
        e.preventDefault();

        try {
            await registerOrderService(dataOrder);
            showNotification("Orden registrada con éxito", "success");
        } catch (error) {
            showNotification("Error al registrar la orden", "error");
        }
    };
    return {handleRegisterOrder};
}

export default useRegisterOrder;