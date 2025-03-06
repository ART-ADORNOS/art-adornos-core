import { useEffect, useState } from "react";
import { getCategory } from "../services/getCategory";
import { useNotification } from "../../../shared/providers/alertProvider";

const useGetCategories = (startupId) => {
    const { showNotification } = useNotification();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (!startupId) return;

            try {
                const data = await getCategory(startupId);
                setCategories(data);
            } catch (error) {
                showNotification("Error al cargar la información de las categorías", "error");
            }
        };

        fetchCategories().catch((error) => {
            showNotification("Error en el servidor", "error");
        });

    }, [startupId, showNotification]);

    return { categories };
};

export { useGetCategories };
