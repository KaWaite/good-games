import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: 0,
    paddingTop: 0,
  },
  cover: {
    width: 151,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 10,
  },
  media: {
    height: 157,
  },
});

export default function GameCard(props) {
  const classes = useStyles();

  return (
    <Card className={`game-card ${classes.root}`}>
      <CardActionArea className={classes.cover}>
        <CardMedia
          className={classes.media}
          image={require("../images/logo2.svg")}
          title="game art"
        />
      </CardActionArea>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.developer}
          </Typography>
          <Typography variant="body2" component="p">
            {props.rating}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>
    </Card>
  );
}
