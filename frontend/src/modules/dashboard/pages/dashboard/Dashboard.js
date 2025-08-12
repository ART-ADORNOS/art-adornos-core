import React, {useContext, useEffect} from 'react';
import Navbar from '../../../../shared/components/organisms/Navbar';
import useGetStartup from "../../hooks/user/useGetStartup";
import AuthContext from "../../../../shared/providers/AuthContext";
import WelcomeHeader from "../../components/WelcomeHeader";
import Loader from "../../components/Loader";
import CardStartup from "../../../startup/components/card/CardStartup";
import useFilter from "../../hooks/useFilter";
import FilterSidebar from "../../components/FilterSidebar";
import useGetIndustryAll from "../../hooks/user/useGetIndustryAll";
import {getFilteredStartups, useIndustryKeys} from "../../utils/filterUtils";
import USER_TYPE from "../../../../core/constants/user/userType";
import useUsertype from "../../../products/hooks/useUsertype";
import ROUTES from "../../../../core/constants/routes/routes";
import {useDashboardType} from "../../../../shared/providers/dashboardTypeProvider";

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const {activeFilters, toggleFilter} = useFilter();
    const {startups, loading} = useGetStartup();
    const {industry} = useGetIndustryAll();
    const industryKeys = useIndustryKeys(industry);
    const filteredStartups = getFilteredStartups(startups, activeFilters);
    const [usertype] = useUsertype(USER_TYPE.USER);
    const {setDashboardType} = useDashboardType();


    useEffect(() => {
        setDashboardType(USER_TYPE.USER);
    }, [setDashboardType]);


    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar dashboardTyype={USER_TYPE.USER}/>
            <WelcomeHeader
                username={user?.username}
                redirectTo={ROUTES.CART_ORDERS_LIST}
            />
            <div className="w-full px-8 py-4 ">
                <FilterSidebar
                    industry={industryKeys}
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
                                <CardStartup startup={startup} usertype={usertype}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center h-64 text-center text-gray-700 dark:text-gray-300">
                        <span className="text-6xl mb-3">📭</span>
                        <p className="text-lg font-semibold">No se encontraron startups.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Dashboard;