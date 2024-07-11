import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import IChildren from "../pages/layout/IChildren";

const ProtectedRoute = ({children} : IChildren) => {

    const user  = useUser();
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return children;
}

export default ProtectedRoute;