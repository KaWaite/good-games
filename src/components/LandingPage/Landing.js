import React from "react";
import Welcome from "./Welcome";
import Boiler from "./Boiler";

export default function Landing(props) {
  return (
    <div className="landing">
      <Welcome
        resetSearch={props.resetSearch}
        handleChange={props.handleChange}
      />
      <Boiler />
    </div>
  );
}
