import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import IChildren from "../pages/layout/IChildren";
import Loader from "../../components/loader";

const ProtectedRoute = ({ children }: IChildren) => {
  const userContext = useUser();

  if (userContext?.loading) return <Loader />;

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
