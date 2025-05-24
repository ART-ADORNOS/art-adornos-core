// hooks/useProfileUpdate.js
import {useLocation, useNavigate} from "react-router-dom";
import {useNotification} from "../../../shared/providers/alertProvider";
import {useContext} from "react";
import AuthContext from "../../../shared/providers/AuthContext";
import ROUTES from "../../../core/constants/routes/routes";
import USER_TYPE from "../../../core/constants/user/userType";

const useProfileUpdate = (formData, user) => {
    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {showNotification} = useNotification();

    const dashboardRedirect = location.state?.fromDashboard === USER_TYPE.SELLER
        ? ROUTES.DASHBOARD_SELLER
        : ROUTES.DASHBOARD;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const noChanges =
            formData.first_name === user.first_name &&
            formData.last_name === user.last_name &&
            formData.email === user.email &&
            formData.phone === user.phone &&
            formData.username === user.username;
        if (noChanges) {
            showNotification("No se realizaron cambios", "info");
            return;
        }
        try {
            const success = await updateUser(formData);
            if (success) {
                showNotification("Perfil actualizado con éxito", "success");
                navigate(dashboardRedirect, {state: {updateSuccess: true}});
            } else {
                showNotification("Error al actualizar el perfil", "error");
            }
        } catch (err) {
            showNotification(err.response?.data?.message || "Error desconocido", "error");
        }
    };

    return {handleUpdate};
};

export default useProfileUpdate;
