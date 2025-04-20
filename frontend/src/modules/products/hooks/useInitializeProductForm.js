import {useEffect} from "react";

const useInitializeProductForm = (state, setFormData) => {
    useEffect(() => {
        if (state) {
            const {productName, productDescription, productPrice, productCategory, productStock, productImage} = state;
            setFormData(prevData => ({
                ...prevData,
                name: productName || '',
                description: productDescription || '',
                price: productPrice || '',
                stock: productStock || '',
                category: productCategory || '',
                image: productImage || ''
            }));
        }
    }, [state, setFormData]);
};

export default useInitializeProductForm;