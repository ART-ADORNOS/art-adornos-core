import React, {useContext, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AuthContext from '../../../../shared/providers/AuthContext';
import Navbar from '../../../../shared/components/layout/header/Navbar';
import {useNotification} from "../../../../shared/providers/alertProvider";

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
            <div className="flex justify-end p-4">
                <button
                    className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-[#FB923C] bg-[#FB923C] group hover:bg-[#FB923C] active:bg-[#FB923C] active:border-[#FB923C]"
                >
                <span
                    className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-2 transition-all duration-300"
                >
                    Add Item
                </span>
                    <span
                        className="absolute right-0 h-full w-10 rounded-lg bg-[#FB923C] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-16 transition-all duration-300"
                    >
                    <svg
                        className="svg w-8 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="12" x2="12" y1="5" y2="19"></line>
                        <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                </span>
                </button>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mt-6">
                Bienvenido, <span className="text-blue-600">{user?.email}</span> 👋
            </h1>
            {user?.is_seller ?
                <h2 className="text-2xl text-center">Eres vendedor ✅</h2> :
                <h2 className="text-2xl text-center">No eres vendedor ❌</h2>
            }
        </div>
    );
};


export default DashboardSeller;