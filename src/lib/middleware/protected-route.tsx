import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import IChildren from "../pages/layout/IChildren";
import Loader from "../../components/loader";

const ProtectedRoute = ({children} : IChildren) => {

    const {user, loading}  = useUser();

    if (loading) return <Loader />
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return children;
}

export default ProtectedRoute;