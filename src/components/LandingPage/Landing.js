import React from "react";
import Welcome from "./Welcome";
import Slogan from "./Slogan";
import AccountBenefits from "./AccountBenefits";

export default function Landing(props) {
  return (
    <div className="landing">
      <Welcome
        resetSearch={props.resetSearch}
        handleChange={props.handleChange}
      />
      <Slogan />
      <AccountBenefits />
    </div>
  );
}
