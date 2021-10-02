import React, { useEffect } from "react";
import { BrowserRouter, Switch, NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import { verifyTokenAsync } from "./asyncActions/authAsyncActions";
import Tracker from "./pages/Tracker/Tracker";

function App() {
  const authObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { authLoading, isAuthenticated } = authObj;

  // verify token on app load
  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, [dispatch]);

  // checking authentication
  if (authLoading) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink activeClassName="active" to="/tracker">
              Tracker
            </NavLink>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute
                path="/login"
                component={Login}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/tracker"
                component={Tracker}
                isAuthenticated={isAuthenticated}
              />
              <Redirect to={isAuthenticated ? "/dashboard" : "/login"} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
