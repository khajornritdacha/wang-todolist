import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateNewTaskPage from "../pages/CreateNewTaskPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TaskDetailPage from "../pages/TaskDetailPage";

import { NAVBAR_HEIGHT } from "../components/Navbar/constants";
import { Theme } from "@emotion/react";

const pageContainerStyle = (theme: Theme) => ({
  backgroundColor: `${theme.isDark ? theme.colors.secondary[0] : theme.white}`,
  color: `${theme.isDark ? theme.white : theme.black}`,
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
});

const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <main css={pageContainerStyle}>
        <Switch>
          <Route exact path={LOGIN_ROUTE} render={() => <LoginPage />} />
          <Route exact path={REGISTER_ROUTE} render={() => <RegisterPage />} />
          <Route exact path="/task/:id" render={() => <TaskDetailPage />} />
          <Route
            exact
            path="/createTask"
            component={() => <CreateNewTaskPage />}
          />

          <Route exact path="/" render={() => <HomePage />} />
          <Route path="*" component={() => <p>Page Not Found</p>} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}
