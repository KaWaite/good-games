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
        <div className="search-container">
          <p>Search the Good Games database to get started.</p>
          <div className={classes.root}>
            <Search handleChange={props.handleChange} />
            <Button
              className="button"
              variant="contained"
              color="secondary"
              component={Link}
              to="results"
            >
              search
            </Button>
            <Button
              className="button"
              variant="contained"
              color="primary"
              component={Link}
              to="game/all"
            >
              see all games
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
