import { createContext, useState, useContext, useEffect } from "react";
import { Platform } from "react-native";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  // Initialize state from sessionStorage or default values
  const getInitialState = () => {
    const savedState = Platform.OS === 'web' ? sessionStorage.getItem('globalState') : '';
    return savedState ? JSON.parse(savedState) : { token: '' };
  };

  const getInitialLoginState = () => {
    const savedLogin = Platform.OS === 'web' ? sessionStorage.getItem('isLoggedIn') : '';
    return savedLogin ? JSON.parse(savedLogin) : false;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);
  const [state, setState] = useState(getInitialState);
  const [refreshViews, setRefreshViews] = useState(false);

  const triggerRefreshViews = () => setRefreshViews(!refreshViews);

  // Persisting the state to sessionStorage whenever it changes
  useEffect(() => {
    if (Platform.OS === 'web')
        sessionStorage.setItem('globalState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (Platform.OS === 'web')
        sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        state,
        setState,
        refreshViews,
        triggerRefreshViews,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
