import ProtectedRoute from "../middleware/protected-route";
import AddPost from "../pages/add/add-post-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import HomePage from "../pages/home/home-page";
import PostDetailPage from "../pages/post/post-detail-page";
import YoursPage from "../pages/yours/yours-page";

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
    element: (
      <ProtectedRoute>
        <AddPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/yours",
    element: (
      <ProtectedRoute>
        <YoursPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <ProtectedRoute>
        <PostDetailPage />
      </ProtectedRoute>
    ),
  },
];
