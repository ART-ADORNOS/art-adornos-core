// hooks/useDashboard.js
import {useContext} from "react";
import AuthContext from "../../../../shared/providers/AuthContext";

const useDashboard = () => {
    const { user } = useContext(AuthContext);
    return { user };
};

export default useDashboard;
