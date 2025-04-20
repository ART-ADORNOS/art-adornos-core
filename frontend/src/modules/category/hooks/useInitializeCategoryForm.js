import {useEffect} from "react";


const useInitializeCategoryForm = (state, setFormData) => {
    useEffect(() => {
        if (state) {
            const {categoryName, categoryDescription} = state;
            setFormData(prevData => ({
                ...prevData,
                name: categoryName || '',
                description: categoryDescription || '',
            }));
        }
    }, [state, setFormData]);
};

export default useInitializeCategoryForm;