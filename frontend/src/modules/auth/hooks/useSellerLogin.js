import { useState, useContext } from "react";
import { useNotification } from "../../../shared/providers/alertProvider";
import AuthContext from "../../../shared/providers/AuthContext";
import { useNavigate } from "react-router-dom";

export function useSellerLogin() {
  const { showNotification } = useNotification();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await login(credentials.username, credentials.password, "seller");
      success
        ? navigate("/dashboard-seller")
        : showNotification("Credenciales incorrectas. Inténtalo de nuevo.", "error");
    } catch (error) {
      if (error.message === "NOT_SELLER") {
        showNotification("Acceso denegado. Solo los vendedores pueden acceder a esta página.", "error");
      } else {
        showNotification("Error en el inicio de sesión. Por favor, inténtalo más tarde.", "error");
      }
    }
  };

  return { credentials, handleChange, handleSubmit };
}
