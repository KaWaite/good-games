import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.scss";

// Component imports
import TopBar from "./components/TopBar";
import Landing from "./components/LandingPage/Landing";
import Results from "./components/Results";
import GameWiki from "./components/GameWiki/GameWiki";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

import Test from "./components/Test";

function App() {
  const [search, setSearch] = useState(null);

  // functions
  const resetSearch = () => {
    setSearch(null);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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
          <Route path="/results" render={() => <Results search={search} />} />
          <Route path="/game/all" render={() => <Results />} />
          <Route path="/game/:id" render={(props) => <GameWiki {...props} />} />
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
