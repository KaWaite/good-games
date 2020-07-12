import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      "margin-bottom": theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();

  return (
    <div className="search-container">
      <Typography variant="body1" className="search-heading">
        {props.desc}
      </Typography>
      <div className={classes.root}>
        <SearchInput handleChange={props.handleChange} />
        <Button
          variant="contained"
          color="secondary"
          onClick={props.submitSearch}
          component={Link}
          to="results"
        >
          search
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="game/all"
        >
          see all games
        </Button>
      </div>
    </div>
  );
}
