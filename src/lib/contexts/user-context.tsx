import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IChildren from "../pages/layout/IChildren";
import { auth } from "../../firebase/firebase-config";
import { User } from "../types/user-type";

interface UserContextType {
  user: User | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({children} : IChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser as User | null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [location]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
