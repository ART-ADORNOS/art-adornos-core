import {useNotification} from "../../../shared/providers/alertProvider";
import {getIndustry} from "../services/getIndustryService";
import {useEffect, useState} from "react";


const useGetIndustry = () => {
    const {showNotification} = useNotification();
    const [industryOptions, setIndustryOptions] = useState([]);

    useEffect(() => {
        const fetchIndustry = async () => {
            try {
                const data = await getIndustry();
                setIndustryOptions(data);
            } catch (error) {
                showNotification("Error al cargar la información de las industrias", "error");
            }
        };

        fetchIndustry().catch((error) => console.error("Error en fetchIndustry:", error));

    }, [showNotification]);
    return {industryOptions};

};
export default useGetIndustry;