import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";

export const router = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
