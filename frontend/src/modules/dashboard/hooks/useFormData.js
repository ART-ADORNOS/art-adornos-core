import { useState, useEffect } from "react";

const useFormData = (user) => {
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        username: user?.username || "",
    });

    const [errors, setErrors] = useState({ email: false });

    useEffect(() => {
        setFormData({
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            username: user?.username || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "email") {
            setErrors({
                ...errors,
                email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            });
        }
    };

    return { formData, errors, handleChange };
};

export default useFormData;
