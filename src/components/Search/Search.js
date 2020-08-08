import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchInput from "./SearchInput";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      "margin-bottom": theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function Search({ show, disableHide, desc, setSearchedTerm }) {
  const classes = useStyles();
  const [showButs, setShowButs] = useState(show);
  const [search, setSearch] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = () => {
    setSearchedTerm(search);
    setSearch(null);
  };

  const showButtons = () => {
    if (disableHide) return;
    setShowButs(true);
  };

  return (
    <div className="search-container">
      {desc && (
        <Typography variant="body1" className="search-heading">
          {desc}
        </Typography>
      )}

      <div className={classes.root}>
        <SearchInput handleChange={handleChange} showButtons={showButtons} />
        {showButs && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={submitSearch}
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
          </>
        )}
      </div>
    </div>
  );
}
