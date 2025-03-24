import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../../../shared/providers/AuthContext';
import Navbar from '../../../../shared/components/layout/header/Navbar';
import CardStartup from "../../../startup/components/card/CardStartup";
import FilterSidebar from "../../components/FilterSidebar";
import useFilter from "../../hooks/useFilter";
import Loader from "../../components/Loader";
import useFetchStartups from "../../hooks/userSeller/useFetchStartups";
import useGetUserIndustry from "../../../startup/hooks/useGetUserIndustry";
import WelcomeHeader from "../../components/WelcomeHeader";
import USER_TYPE from "../../../../core/constants/user/userType";

const DashboardSeller = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const {activeFilters, toggleFilter} = useFilter();
    const {startupData, loading} = useFetchStartups();
    const {industry} = useGetUserIndustry();

    const filteredStartups = activeFilters.length > 0
        ? startupData.filter(startup =>
            startup.industry.some(ind => activeFilters.includes(ind))
        )
        : startupData;

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar dashboardTyype="userSeller"/>
            <WelcomeHeader
                username={user?.username}
                redirectTo="/register-startup"
                title="Emprendimiento"
            />

            <div className="w-full px-8 py-4 ">
                <FilterSidebar
                    industry={industry}
                    activeFilters={activeFilters}
                    toggleFilter={toggleFilter}
                />
            </div>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-10">
                    <Loader/>
                    <Loader/>
                    <Loader/>
                </div>
            ) : (
                filteredStartups.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-10">
                        {filteredStartups.map((startup, index) => (
                            <div key={index}>
                                <CardStartup startup={startup} usertype={USER_TYPE.SELLER}/>
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
                )
            )}
        </div>
    );
};

export default DashboardSeller;