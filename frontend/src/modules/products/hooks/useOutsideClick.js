import {useEffect, useRef, useState} from "react";


const useOutsideClick = (initialState = false) => {
    const [isMenuOpen, setIsMenuOpen] = useState(initialState);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [isMenuOpen]);
    return {isMenuOpen, setIsMenuOpen, menuRef};
};

export default useOutsideClick;