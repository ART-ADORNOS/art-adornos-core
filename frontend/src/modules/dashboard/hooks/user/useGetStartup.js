import {useNotification} from "../../../../shared/providers/alertProvider";
import {useEffect, useState} from "react";
import {getStartupService} from "../../service/user/getStartupService";


const useGetStartup = () => {
    const {showNotification} = useNotification();
    const [startups, setStartup] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchStartup = async () => {
            try {
                const data = await getStartupService();
                setStartup(data);
            } catch {
                showNotification("Error al cargar la información de la startup", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchStartup().catch((error) => console.error("Error en fetchStartup:", error));

    }, [showNotification]);

    return {startups, loading};
}

export default useGetStartup;