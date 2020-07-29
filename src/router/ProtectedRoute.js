import React from "react";
import { Route, Redirect } from "react-router-dom";

const FALLBACK = "/login";

export const ProtectedRoute = ({
  component: Component,
  user,
  isLoading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return;
        }
        if (user) {
          return <Component user={user} {...rest} {...props} />;
        } else {
          return <Redirect to={FALLBACK} />;
        }
      }}
    />
  );
};
