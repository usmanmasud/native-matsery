import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContex = createContext();

export const useGlobalContex = () => useContext(GlobalContex);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContex.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContex.Provider>
  );
};

export default GlobalProvider;
