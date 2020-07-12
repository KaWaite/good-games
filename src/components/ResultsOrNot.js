import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GameCard from "./GameCard";
import Search from "./Search/Search";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "8px 0",
  },
  titleContainer: {
    marginTop: 15,
  },
}));

export default function ResultsOrNot(props) {
  const classes = useStyles();
  const results = props.results;

  if (results.length > 0) {
    return (
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
              release_date={game.release_date}
              developer={game.developer}
              rating={game.rating}
              image_url={game.image_url}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <div>
        <Search
          desc={`Sorry, ${props.term} is not in our database. 
          Please try again`}
          handleChange={props.handleChange}
          submitSearch={props.submitSearch}
        />
      </div>
    );
  }
}
