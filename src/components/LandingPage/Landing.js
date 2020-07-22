import React from "react";
import Welcome from "./Welcome";
import Slogan from "./Slogan";
import AccountBenefits from "./AccountBenefits";

import "./styles.scss";

export default function Landing(props) {
  return (
    <div className="landing">
      <Welcome
        handleChange={props.handleChange}
        submitSearch={props.submitSearch}
      />
      <Slogan />
      <AccountBenefits />
    </div>
  );
}
