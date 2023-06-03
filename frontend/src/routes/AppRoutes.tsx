import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import GuardedRoute from "./GuardedRoutes";
import HomePage from "../pages/HomePage";
import TaskDetailPage from "../pages/TaskDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/register";

interface AppRoutesProps {
  user?: string;
}

export default function AppRoutes({ user }: AppRoutesProps) {
  // user = "user";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            element={
              <GuardedRoute
                isRouteAccessible={!!user}
                redirectRoute={LOGIN_ROUTE}
              />
            }
          >
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/task" element={<TaskDetailPage />} />
        </Route>
        <Route
          element={<GuardedRoute isRouteAccessible={!user} redirectRoute="/" />}
        >
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        </Route>
        <Route
          element={<GuardedRoute isRouteAccessible={!user} redirectRoute="/" />}
        >
          <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
