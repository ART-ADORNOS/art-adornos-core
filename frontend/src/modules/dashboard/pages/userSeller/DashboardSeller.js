import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AuthContext from '../../../../shared/providers/AuthContext';
import Navbar from '../../../../shared/components/layout/header/Navbar';
import {useNotification} from "../../../../shared/providers/alertProvider";
import AddButton from "../../components/buttons/AddButton";

const DashboardSeller = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const {showNotification} = useNotification();
    useEffect(() => {
        if (location.state?.updateSuccess) {
            showNotification("Perfil actualizado con éxito", "success");
            navigate('', {replace: true, state: {}});
        }
    }, [location.state, navigate]);
    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar dashboardTyype="userSeller"/>
            <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0">
                    ¡Bienvenido, <span className="text-blue-600">{user?.username}</span>! 👋
                </div>
                <AddButton redirectTo="/register-startup" title="Emprendimiento"/>
            </div>
        </div>
    );
};

export default DashboardSeller;