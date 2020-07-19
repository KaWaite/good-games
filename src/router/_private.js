import React from "react";
import { Route, Redirect } from "react-router-dom";
// import Auth from "../store/auth";

const FALLBACK = "/login";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={FALLBACK} />;
        }
      }}
    />
  );
};
