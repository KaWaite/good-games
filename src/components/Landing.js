import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      "margin-bottom": theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function Landing(props) {
  const classes = useStyles();

  useEffect(() => {
    props.resetSearch();
  }, []);

  return (
    <div className="landing">
      <div className="content">
        <div className="left">
          <Typography variant="subtitle1">Welcome to</Typography>
          <Typography variant="h1" component="h2">
            GOOD GAMES
          </Typography>
        </div>
        <div className="search-container">
          <p>Search the Good Games database to get started.</p>
          <form
            className={classes.root}
            action="results"
            onSubmit={props.onSubmit}
            noValidate
            autoComplete="off"
          >
            <Search onChange={props.handleChange} />
            <Button className="button" variant="contained" color="secondary">
              <Link className="link" to="results">
                search
              </Link>
            </Button>
            <Button className="button" variant="contained" color="primary">
              <Link className="link" to="games">
                see all games
              </Link>
            </Button>
          </form>
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
