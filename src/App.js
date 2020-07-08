import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.scss";

// Component imports
import TopBar from "./components/TopBar";
import Landing from "./components/LandingPage/Landing";
import Results from "./components/Results";
import Games from "./components/Games";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

import Test from "./components/Test";

function App() {
  let [Search, setSearch] = useState("");

  const resetSearch = () => {
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="App">
        <TopBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Landing resetSearch={resetSearch} handleChange={handleChange} />
            )}
          />
          <Route path="/results" render={() => <Results Search={Search} />} />
          <Route path="/games" render={() => <Games />} />
          <Route path="/account/login" render={() => <Login />} />
          <Route path="/account/join-the-dark-side" render={() => <SignUp />} />
          <Route path="/test" render={() => <Test />} />
          <Route render={() => <Error404 />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
