import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      "margin-bottom": theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function Welcome(props) {
  const classes = useStyles();

  useEffect(() => {
    props.resetSearch();
  }, []);

  return (
    <div className="welcome">
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
