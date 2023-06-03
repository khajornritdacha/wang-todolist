import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import GuardedRoute from "./GuardedRoutes";
import HomePage from "../pages/HomePage";
import TaskDetailPage from "../pages/TaskDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";
import CreateNewTaskPage from "../pages/CreateNewTaskPage";

const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/register";

export default function AppRoutes() {
  const { email } = useAuth();
  console.log("email: " + email);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            element={
              <GuardedRoute
                isRouteAccessible={!!email}
                redirectRoute={LOGIN_ROUTE}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="/task" element={<TaskDetailPage />} />
            <Route path="/createTask" element={<CreateNewTaskPage />} />
          </Route>
        </Route>
        <Route
          element={
            <GuardedRoute isRouteAccessible={!email} redirectRoute="/" />
          }
        >
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        </Route>
        <Route
          element={
            <GuardedRoute isRouteAccessible={!email} redirectRoute="/" />
          }
        >
          <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
