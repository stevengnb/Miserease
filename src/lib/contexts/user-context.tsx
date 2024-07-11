
import { doc, getDoc } from "firebase/firestore";
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
        const unsubscribe = auth.onAuthStateChanged(async (currentUser : any) => {

            if(currentUser) {
                const docSnap = await getDoc(doc(db, "users", currentUser.uid));
                if (docSnap.exists()) { 
                    currentUser["email"] = docSnap.data()["email"];
                    currentUser["age"] = docSnap.data()["age"];
                    currentUser["gender"] = docSnap.data()["gender"];
                    currentUser["role"] = docSnap.data()["role"];
                }
            }

            //@ts-ignore
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [location])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}