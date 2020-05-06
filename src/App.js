import React from "react";
import "./css/main.scss";

// Component imports
import TopBar from "./components/TopBar";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
      <TopBar />
      <Landing />
    </div>
  );
}

export default App;
