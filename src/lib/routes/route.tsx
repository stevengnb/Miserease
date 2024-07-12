import ProtectedRoute from "../middleware/protected-route";
import AddPost from "../pages/add/add-post";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import HomePage from "../pages/home/home-page";

export const router = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-post",
    element: <AddPost />,
  },
];
