import { useEffect } from 'react';

const useInitializeForm = (state, setFormData) => {
    useEffect(() => {
        if (state) {
            const {startupName, startupDescription, startupIndustry} = state;
            setFormData(prevData => ({
                ...prevData,
                name: startupName || '',
                description: startupDescription || '',
                industry: startupIndustry || '',
            }));
        }
    }, [state, setFormData]);
};

export default useInitializeForm;
