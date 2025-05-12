import {useState, useContext} from "react";
import {useNotification} from "../../../shared/providers/alertProvider";
import AuthContext from "../../../shared/providers/AuthContext";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../../core/constants/routes/routes";
import USER_TYPE from "../../../core/constants/user/userType";

export function useLogin() {
    const {login} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const {showNotification} = useNotification();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await login(credentials.username, credentials.password, USER_TYPE.USER);
            success
                ? navigate(ROUTES.DASHBOARD)
                : showNotification("Credenciales incorrectas. Inténtalo de nuevo.", "error");
        } catch {
            showNotification("Error en el inicio de sesión. Por favor, inténtalo más tarde.", "error");
        }
    };

    return {credentials, handleChange, handleSubmit};
}
