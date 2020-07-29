import React from "react";
import { Route, Redirect } from "react-router-dom";

export const RedirectRoute = ({
  component: Component,
  user,
  isLoading,
  redirectRoute,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return;
        }
        if (!user) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={redirectRoute} />;
        }
      }}
    />
  );
};
