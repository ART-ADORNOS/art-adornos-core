import {useNotification} from "../../../../shared/providers/alertProvider";
import {useEffect, useState} from "react";
import getIndustryAll from "../../service/user/getIndustryAll";


const useGetIndustryAll = () => {
    const {showNotification} = useNotification();
    const [industry, setIndustry] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUserIndustry = async () => {
            try {
                const data = await getIndustryAll();
                setIndustry(data);
            } catch {
                showNotification("Error al cargar la información de las industrias", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchUserIndustry();

    }, [showNotification]);

    return {industry, loading};
}

export default useGetIndustryAll;