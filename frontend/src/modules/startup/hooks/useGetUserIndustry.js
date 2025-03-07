import { useEffect, useState } from "react";
import { getUserIndustry } from "../services/getUserIndustryService";
import { useNotification } from "../../../shared/providers/alertProvider";

const useGetUserIndustry = () => {
    const { showNotification } = useNotification();
    const [industry, setIndustry] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchUserIndustry = async () => {
            try {
                const data = await getUserIndustry();
                if (isMounted) {
                    setIndustry(data.industries || []);
                }
            } catch (error) {
                if (isMounted) {
                    showNotification("Error al cargar la información de las industrias", "error");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUserIndustry();

        return () => {
            isMounted = false;
        };
    }, []);

    return { industry, loading };
};

export default useGetUserIndustry;
