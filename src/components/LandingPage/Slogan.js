import React from "react";
import { Typography } from "@material-ui/core";
import icon from "../../images/controller.svg";

export default function Slogan() {
  return (
    <div className="slogan">
      <div className="content">
        <Typography variant="h3">Games are where we go to dream</Typography>
        <img src={icon} alt="playstation controller" className="slogan-icon" />
      </div>
    </div>
  );
}
