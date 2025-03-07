import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../shared/providers/AuthContext';
import Navbar from '../../../../shared/components/layout/header/Navbar';
import { useNotification } from "../../../../shared/providers/alertProvider";
import AddButton from "../../../../shared/components/buttons/AddButton";
import { getStartup } from "../../../startup/services/startupGet";
import CardStartup from "../../../startup/components/card/CardStartup";
import FilterSidebar from "../../components/FilterSidebar";
import useGetUserIndustry from "../../../startup/hooks/useGetUserIndustry";
import useFilter from "../../hooks/useFilter";

const DashboardSeller = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [startupData, setStartupData] = useState([]);
    const { showNotification } = useNotification();
    const { industry } = useGetUserIndustry();
    const { activeFilters, toggleFilter } = useFilter();

    useEffect(() => {
        if (location.state?.updateSuccess) {
            showNotification("Perfil actualizado con éxito", "success");
            navigate('', { replace: true, state: {} });
        }

        const fetchStartup = async () => {
            try {
                const data = await getStartup();
                const normalizedData = data.map(startup => ({
                    ...startup,
                    industry: Array.isArray(startup.industry) ? startup.industry : [startup.industry]
                }));
                setStartupData(normalizedData);
            } catch (error) {
                showNotification("Error al cargar la información de la startup", "error");
            }
        };
        fetchStartup();
    }, [location.state?.updateSuccess, navigate, showNotification]);


    const filteredStartups = activeFilters.length > 0
        ? startupData.filter(startup =>
            startup.industry.some(ind => activeFilters.includes(ind))
        )
        : startupData;

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar dashboardTyype="userSeller" />
            <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0">
                    ¡Bienvenido, <span className="text-blue-600">{user?.username}</span>! 👋
                </div>
                <AddButton redirectTo="/register-startup" title="Emprendimiento" />
            </div>
            <div className="w-full px-8 py-4 ">
                <FilterSidebar
                    industry={industry}
                    activeFilters={activeFilters}
                    toggleFilter={toggleFilter}
                />
            </div>
            {filteredStartups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-10">
                    {filteredStartups.map((startup, index) => (
                        <div key={index}>
                            <CardStartup startup={startup} />
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="flex flex-col items-center justify-center h-64 text-center text-gray-700 dark:text-gray-300">
                    <span className="text-6xl mb-3">📭</span>
                    <p className="text-lg font-semibold">No se encontraron startups.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¡Anímate a crear tu catalogo para tu emprendimiento!
                    </p>
                    <button
                        onClick={() => navigate('/register-startup')}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
                    >
                        Crear Startup 🚀
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardSeller;