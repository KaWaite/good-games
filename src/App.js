import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";
import "./css/main.scss";

// Route types
import { ProtectedRoute } from "./router/ProtectedRoute";
import { RedirectRoute } from "./router/RedirectRoute";

// Component imports
const TopBar = lazy(() => import("./components/TopBar"));
const Landing = lazy(() => import("./components/LandingPage/Landing"));
const Results = lazy(() => import("./components/Results/Results"));
const GameWiki = lazy(() => import("./components/GameWiki/GameWiki"));
const Login = lazy(() => import("./components/User/Login"));
const SignUp = lazy(() => import("./components/User/SignUp"));
const UserProfile = lazy(() => import("./components/User/UserProfile"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Footer = lazy(() => import("./components/Footer"));
const Error404 = lazy(() => import("./components/Errors/Error404"));
const Error500 = lazy(() => import("./components/Errors/Error500"));

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // token authorization check on initial load
  const handleAuthorization = () => {
    if (localStorage.token) {
      if (user) {
        setIsLoading(false);
        return;
      }
      fetchTokenInfo();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAuthorization();
    // eslint-disable-next-line
  }, []);

  // fetch token
  const fetchTokenInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
        handleAuthorization();
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
    setIsLoading(false);
  };

  // functions - search
  const resetSearch = () => {
    setSearch(null);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = () => {
    setSearchedTerm(search);
    return resetSearch();
  };

  return (
    <Suspense
      fallback={
        <ReactLoading
          type={"bars"}
          color="#f44336"
          height="auto"
          width="300px"
          className="loading"
        />
      }
    >
      <Router>
        <div className="App">
          <TopBar user={user} handleAuthorization={handleAuthorization} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Landing
                  handleChange={handleChange}
                  submitSearch={submitSearch}
                />
              )}
            />
            <Route
              path="/results"
              render={() => (
                <Results
                  searchedTerm={searchedTerm}
                  handleChange={handleChange}
                  submitSearch={submitSearch}
                />
              )}
            />
            <Route path="/game/all" render={() => <Results />} />
            <Route
              path="/game/:id"
              render={(props) => <GameWiki {...props} />}
            />
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
              handleChange={handleChange}
              submitSearch={submitSearch}
              user={user}
              isLoading={isLoading}
              component={Dashboard}
            />
            <ProtectedRoute
              path="/profile"
              user={user}
              isLoading={isLoading}
              component={UserProfile}
            />

            {/* Error Routes */}
            <Route path="/oops" render={() => <Error500 />} />
            <Route render={() => <Error404 />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
