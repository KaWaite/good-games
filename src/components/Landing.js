import React from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

export default function Landing(props) {
  const handleClick = (e) => {
    console.log("clicked");
  };

  return (
    <div className="landing">
      <h1 className="header">GG</h1>
      <div className="inner">
        <h2>Search the Good Games database to get started.</h2>
        <FormControl fullWidth className="search">
          <InputLabel htmlFor="standard-adornment-amount">
            Search game...
          </InputLabel>
          <Input id="standard-adornment-amount" onChange={props.handleChange} />
          <Button className="button" onClick={handleClick}>
            <Link className="link" to="results">
              search
            </Link>
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
