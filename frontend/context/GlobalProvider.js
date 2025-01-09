import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [state, setState] = useState({
        token: '',
    });

    const [refreshViews, setRefreshViews] = useState(false);

    const triggerRefreshViews = () => setRefreshViews(!refreshViews);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                state,
                setState,
                refreshViews,
                triggerRefreshViews
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;