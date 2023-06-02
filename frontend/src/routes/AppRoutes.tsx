import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import GuardedRoute from "./GuardedRoutes";
import HomePage from "../pages/HomePage";

const LOGIN_ROUTE = "login";
const REGISTER_ROUTE = "register";

interface AppRoutesProps {
  user?: string;
}

export default function AppRoutes({ user }: AppRoutesProps) {
  user = "user";
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
          <Route
            element={
              <GuardedRoute isRouteAccessible={!user} redirectRoute="/" />
            }
          >
            <Route path={LOGIN_ROUTE} element={<p>Login Page</p>} />
          </Route>
          <Route
            element={
              <GuardedRoute isRouteAccessible={!user} redirectRoute="/" />
            }
          >
            <Route path={REGISTER_ROUTE} element={<p>Register Page</p>} />
          </Route>
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
