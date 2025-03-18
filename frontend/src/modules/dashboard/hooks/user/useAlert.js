import {useEffect, useState} from "react";

const useAlert = (location, navigate) => {
    const [alert, setAlert] = useState({show: false, message: "", type: ""});

    useEffect(() => {
        if (location.state?.updateSuccess) {
            setAlert({
                show: true, message: location.state?.message, type: location.state?.messageType,
            });
            navigate("", {replace: true, state: {}});
            setTimeout(() =>
                ((prev) => ({...prev, show: false})),
                location.state?.messageDuration || 3000);
        }
    }, [location.state, navigate]);

    return {alert, setAlert};
};

export default useAlert;
