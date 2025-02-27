import React, {createContext, useState} from "react";


export const StartupContext = createContext();

const StartupProvider = ({children}) => {
    const [selectedStartup, setSelectedStartup] = useState(null);
    return (
        <StartupContext.Provider value={{selectedStartup, setSelectedStartup}}>
            {children}
        </StartupContext.Provider>
    );
};

export default StartupProvider;
