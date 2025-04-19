import {useEffect, useRef, useState} from "react";
import {getCategory} from "../services/getCategory";
import {useNotification} from "../../../shared/providers/alertProvider";

const useGetCategories = (startupId) => {
    const {showNotification} = useNotification();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const startupIdRef = useRef(startupId);
    const idST = localStorage.getItem("selectedStartupId");


    useEffect(() => {
        setLoading(true);
        const fetchCategories = async () => {
            try {
                startupIdRef.current = startupId || idST;
                const data = await getCategory(startupId);
                setCategories(data);
            } catch (error) {
                showNotification("Error al cargar la información de las categorías", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories().catch(() => {
            showNotification("Error en el servidor", "error");
        });

    }, [startupId, showNotification, idST]);

    return {categories, loading};
};

export {useGetCategories};
