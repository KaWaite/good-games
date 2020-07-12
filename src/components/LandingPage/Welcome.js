import React, { useEffect } from "react";
import Search from "../Search/Search";
import { Typography } from "@material-ui/core";

export default function Welcome(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="welcome">
      <div className="content">
        <div className="left">
          <Typography variant="subtitle1">Welcome to</Typography>
          <Typography variant="h1">GOOD GAMES</Typography>
        </div>
        <Search
          desc="Search the Good Games database to get started."
          handleChange={props.handleChange}
          submitSearch={props.submitSearch}
        />
      </div>
    </div>
  );
}
