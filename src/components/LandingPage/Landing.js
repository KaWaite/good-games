import React from "react";
import Welcome from "./Welcome";
import Slogan from "./Slogan";
import AccountBenefits from "./AccountBenefits";

import "./styles.scss";

export default function Landing({ setSearchedTerm }) {
  return (
    <div className="landing">
      <Welcome setSearchedTerm={setSearchedTerm} />
      <Slogan />
      <AccountBenefits />
    </div>
  );
}
