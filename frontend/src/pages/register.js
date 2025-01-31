import React, { useState, useEffect, useMemo } from "react";
import InputField from "../components/Fields/InputField";
import AlertMessage from "../components/Messages/AlertMessage";
import Navbar from "../components/Navbar";
import GoBackButton from "../components/Buttons/goBack";

const Register = ({
  initialData = {},
  onSubmit = () => {},
  isUpdateMode = false,
}) => {
  const memoizedInitialData = useMemo(() => {
    return {
      first_name: initialData.first_name,
      last_name: initialData.last_name,
      email: initialData.email,
      username: initialData.username,
    };
  }, [
    initialData.first_name,
    initialData.last_name,
    initialData.email,
    initialData.username,
  ]);

  const [formData, setFormData] = useState({
  first_name: initialData.first_name || "",
  last_name: initialData.last_name || "",
  email: initialData.email || "",
  username: initialData.username || "",
  password: "",
  confirm_password: "",
});


  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    passwordMatch: false,
  });

  useEffect(() => {
    if (memoizedInitialData && typeof memoizedInitialData === "object") {
      const currentData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
      };

      const newData = {
        first_name: memoizedInitialData.first_name,
        last_name: memoizedInitialData.last_name,
        email: memoizedInitialData.email,
        username: memoizedInitialData.username,
      };

      if (JSON.stringify(currentData) !== JSON.stringify(newData)) {
        setFormData((prev) => ({
          ...prev,
          ...memoizedInitialData,
          password: "",
          confirm_password: "",
        }));
      }
    }
  }, [
    memoizedInitialData,
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.username,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "email") {
        newErrors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (name === "confirm_password") {
        newErrors.passwordMatch = formData.password !== value;
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.email || errors.passwordMatch) {
      setMessage("Corrige los errores antes de enviar");
      setMessageType("error");
      setShowMessage(true);
      return;
    }

    try {
      if (typeof onSubmit === "function") {
        const success = await onSubmit(formData);

        if (success) {
          setMessage(
            isUpdateMode
              ? "Perfil actualizado correctamente."
              : "Usuario registrado correctamente."
          );
          setMessageType("success");

          if (!isUpdateMode) {
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              username: "",
              password: "",
              confirm_password: "",
            });
          }
        }
      }
    } catch (error) {
      setMessage("Error en la conexión con el servidor");
      setMessageType("error");
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
      <Navbar />
      <GoBackButton redirectTo="/dashboard" />

      <section className="text-center my-16 mx-8 flex-auto">
        <h1 className="text-5xl font-extrabold">
          {isUpdateMode ? "Actualizar Perfil" : "Registro de usuarios"}
        </h1>

        {showMessage && (
          <AlertMessage
            message={message}
            type={messageType}
            onClose={() => setShowMessage(false)}
          />
        )}

        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
              <InputField
                label="Nombre"
                name="first_name"
                type="text"
                required
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
              />

              <InputField
                label="Apellido"
                name="last_name"
                type="text"
                required
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
              />

              <InputField
                label="Correo electrónico"
                name="email"
                type="email"
                required
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                errorMessage="Correo electrónico inválido"
              />

              <InputField
                label="Nombre de usuario"
                name="username"
                type="text"
                required
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />

              {!isUpdateMode && (
                <>
                  <InputField
                    label="Contraseña"
                    name="password"
                    type="password"
                    required
                    minLength="6"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Confirmar contraseña"
                    name="confirm_password"
                    type="password"
                    required
                    placeholder="Confirmar contraseña"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    error={errors.passwordMatch}
                    errorMessage="Las contraseñas no coinciden"
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full bg-orange-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                disabled={errors.email || errors.passwordMatch}
              >
                {isUpdateMode ? "Actualizar" : "Registrar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
