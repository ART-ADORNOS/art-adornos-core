import {useEffect} from 'react';
import industryMap from "../../../core/constants/industry/industryMap";

const useInitializeForm = (state, setFormData) => {
    useEffect(() => {
        if (state) {
            const {startupName, startupDescription, startupIndustry, startupIcon} = state;
            setFormData(prevData => ({
                ...prevData,
                name: startupName || '',
                description: startupDescription || '',
                industry: Array.isArray(startupIndustry) ? industryMap[startupIndustry[0]] || '' : '',
                icon: startupIcon || ''
            }));
        }
    }, [state, setFormData]);
};

export default useInitializeForm;
