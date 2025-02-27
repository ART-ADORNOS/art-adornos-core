import { useState, useEffect } from "react";
import axios from "axios";

const useIndustryOptions = () => {
    const [industryOptions, setIndustryOptions] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/store/api/industry-choices/")
            .then(response => setIndustryOptions(response.data))
            .catch(error => console.error("Error cargando industrias", error));
    }, []);
    return { industryOptions };
};
export default useIndustryOptions;
