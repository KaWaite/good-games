import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

export default function Landing(props) {
  return (
    <div className="landing">
      <div className="content">
        <div className="left">
          <p>Welcome to</p>
          <h2>GOOD GAMES</h2>
          <p>Search the Good Games database to get started.</p>
        </div>
        <div className="right">
          {/* <FormControl fullWidth className="search">
            <InputLabel htmlFor="standard-adornment-amount">
              Search game...
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              onChange={props.handleChange}
            />
            <Button className="button">
              <Link className="link" to="results">
                search
              </Link>
            </Button>
            <Button className="button">
              <Link className="link" to="games">
                see all games
              </Link>
            </Button>
          </FormControl> */}
        </div>
      </div>
    </div>
  );
}

{
  /* <h1 className="header">GG</h1>
      <div className="content">
        <h2>Search the Good Games database to get started.</h2>
        <FormControl fullWidth className="search">
          <InputLabel htmlFor="standard-adornment-amount">
            Search game...
          </InputLabel>
          <Input id="standard-adornment-amount" onChange={props.handleChange} />
          <Button className="button">
            <Link className="link" to="results">
              search
            </Link>
          </Button>
          <Button className="button">
            <Link className="link" to="games">
              see all games
            </Link>
          </Button>
        </FormControl>
      </div> */
}
