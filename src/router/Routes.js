import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RedirectRoute } from "./RedirectRoute";

const Landing = lazy(() => import("../components/LandingPage/Landing"));
const Results = lazy(() => import("../components/Results/Results"));
const GameWiki = lazy(() => import("../components/GameWiki/GameWiki"));
const Login = lazy(() => import("../components/User/Login"));
const SignUp = lazy(() => import("../components/User/SignUp"));
const UserProfile = lazy(() => import("../components/User/UserProfile"));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const Error404 = lazy(() => import("../components/Errors/Error404"));
const Error500 = lazy(() => import("../components/Errors/Error500"));

const Routes = ({
  searchedTerm,
  setSearchedTerm,
  user,
  setUser,
  isLoading,
}) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => <Landing setSearchedTerm={setSearchedTerm} />}
    />
    <Route
      path="/results"
      render={() => (
        <Results
          searchedTerm={searchedTerm}
          setSearchedTerm={setSearchedTerm}
        />
      )}
    />
    <Route path="/game/all" render={() => <Results />} />
    <Route path="/game/:id" render={(props) => <GameWiki {...props} />} />
    <RedirectRoute
      path="/login"
      user={user}
      setUser={setUser}
      redirectRoute="/dashboard"
      component={Login}
    />
    <RedirectRoute
      path="/join-the-dark-side"
      user={user}
      setUser={setUser}
      redirectRoute="/dashboard"
      component={SignUp}
    />
    {/* Protected Routes */}
    <ProtectedRoute
      path="/dashboard"
      user={user}
      setSearchedTerm={setSearchedTerm}
      isLoading={isLoading}
      component={Dashboard}
    />
    <ProtectedRoute path="/profile" user={user} component={UserProfile} />

    {/* Error Routes */}
    <Route path="/oops" render={() => <Error500 />} />
    <Route render={() => <Error404 />} />
  </Switch>
);

export default Routes;
