import {createContext, useContext, useState} from "react";

const DashboardTypeContext = createContext();

export const DashboardTypeProvider = ({children}) => {
    const [dashboardType, setDashboardType] = useState(null);

    return (
        <DashboardTypeContext.Provider value={{dashboardType, setDashboardType}}>
            {children}
        </DashboardTypeContext.Provider>
    );
}


export const useDashboardType = () => useContext(DashboardTypeContext);
