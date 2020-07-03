import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.scss";

// Component imports
import TopBar from "./components/TopBar";
import Landing from "./components/Landing";
import Results from "./components/Results";
import Games from "./components/Games";
import Login from "./components/Login";
import Error404 from "./components/Error404";

function App() {
  let [Search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // useEffect(() => {
  //   console.log(Search);
  // }, [Search]);

  return (
    <Router>
      <div className="App">
        <TopBar handleChange={handleChange} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Landing handleChange={handleChange} />}
          />
          <Route path="/results" render={() => <Results Search={Search} />} />
          <Route path="/games" render={() => <Games />} />
          <Route path="/login" render={() => <Login />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
