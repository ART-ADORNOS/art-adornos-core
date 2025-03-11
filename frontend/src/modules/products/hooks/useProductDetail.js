import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


const useProductDetail = () => {
    const location = useLocation();
    const [product, setProduct] = useState(() => {
        return location.state || JSON.parse(localStorage.getItem("selectedProduct")) || {};
    });

    useEffect(() => {
        if (location.state) {
            localStorage.setItem("selectedProduct", JSON.stringify(location.state));
        }
    }, [location.state]);

    return product;
}

export default useProductDetail;