import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GameCard from "./GameCard";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  title: {
    textAlign: "center",
  },
  titleContainer: {
    marginTop: 15,
  },
}));

export default function Results(props) {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  let term = props.search;

  useEffect(() => {
    if (term) {
      fetchResults();
      window.scrollTo(0, 0);
    } else if (window.location.pathname === "/game/all" || !term) {
      fetchGames();
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, []);

  const fetchResults = async () => {
    const data = await axios.get(`/game/search?lookup=${term}`);
    setResults(data.data);
  };

  const fetchGames = async () => {
    const data = await axios.get("/game/all");
    setResults(data.data);
  };

  return (
    <div className="results-container">
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h2" className={classes.title}>
              We found {results.length} games
            </Typography>
          </Paper>
        </Grid>
        {results.map((game, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <GameCard
              className="game-card"
              id={game._id}
              title={game.title}
              developer={game.developer}
              rating={game.rating}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
