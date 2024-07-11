
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IChildren from "../pages/layout/IChildren";
import { auth, db } from "../../firebase/firebase-config";
import { User } from "../types/user-type";

export const UserContext = createContext<User | null>(null);

export default function UserContextProvider({children} : IChildren) {

    const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        // @ts-ignore
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [location]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => {
    return useContext(UserContext);
}