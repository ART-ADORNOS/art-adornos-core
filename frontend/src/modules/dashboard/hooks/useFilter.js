import {useState} from "react";


const useFilter = () => {
    const [activeFilters, setActiveFilters] = useState([]);

    const toggleFilter = (industry) => {
        setActiveFilters((prev) =>
            prev.includes(industry)
                ? prev.filter((item) => item !== industry)
                : [...prev, industry]
        );
    }
    return {
        activeFilters,
        toggleFilter,
    };

}

export default useFilter;