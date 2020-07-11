import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GameCard from "./GameCard";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "8px 0",
  },
  titleContainer: {
    marginTop: 15,
  },
  loading: {
    margin: "0 auto",
  },
}));

export default function Results(props) {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  let term = props.search;

  // useEffects
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

  // functions
  const fetchResults = async () => {
    const data = await axios.get(`/game/search?lookup=${term}`);
    setResults(data.data);
    setIsDone(true);
  };

  const fetchGames = async () => {
    const data = await axios.get("/game/all");
    setResults(data.data);
    setIsDone(true);
  };

  return (
    <div className="results">
      <div className="results-container">
        {!isDone ? (
          <ReactLoading
            type={"cylon"}
            color="red"
            className={classes.loading}
          />
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.titleContainer}>
              <Paper className={classes.paper}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
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
                  release_date={game.release_date}
                  developer={game.developer}
                  rating={game.rating}
                  image_url={game.image_url}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
