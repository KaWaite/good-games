import React, { useState, useEffect } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from "axios";
import "./css/main.scss";

// Component imports
import TopBar from "./components/TopBar";
import Landing from "./components/LandingPage/Landing";
import Results from "./components/Results/Results";
import GameWiki from "./components/GameWiki/GameWiki";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import UserProfile from "./components/User/UserProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer";
import Error404 from "./components/Errors/Error404";
import Error500 from "./components/Errors/Error500";

// Guarded route
import { PrivateRoute } from "./router/_private";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState(null);
  const [user, setUser] = useState({});

  // functions
  const handleAuthorization = () => {
    if (localStorage.token) {
      setIsLoggedIn(true);
      fetchTokenInfo();
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleAuthorization();
    // eslint-disable-next-line
  }, []);

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
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchTokenInfo();
  //   // eslint-disable-next-line
  // }, [isLoggedIn]);

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

  // const loggedInRedirectDashboard = () => {

  // }

  return (
    <Router>
      <div className="App">
        <TopBar
          user={user}
          isLoggedIn={isLoggedIn}
          handleAuthorization={handleAuthorization}
        />
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
          <Route path="/game/:id" render={(props) => <GameWiki {...props} />} />
          <Route
            path="/login"
            render={() => {
              if (isLoggedIn) {
                return <Redirect to="/dashboard" />;
              } else {
                return <Login handleAuthorization={handleAuthorization} />;
              }
            }}
          />
          <Route
            path="/join-the-dark-side"
            render={() => {
              if (isLoggedIn) {
                return <Redirect to="/dashboard" />;
              } else {
                return <SignUp handleAuthorization={handleAuthorization} />;
              }
            }}
          />

          {/* User only Routes */}
          <Route
            path="/dashboard"
            render={() => {
              if (isLoggedIn) {
                return (
                  <Dashboard
                    handleChange={handleChange}
                    submitSearch={submitSearch}
                    user={user}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <PrivateRoute path="/profile" component={UserProfile} />

          {/* Error Routes */}
          <Route path="/oops" render={() => <Error500 />} />
          <Route render={() => <Error404 />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
