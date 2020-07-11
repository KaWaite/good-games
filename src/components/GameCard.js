import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
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
    paddingTop: 15,
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
  const { id, title, release_date, developer, rating, image_url } = props;

  return (
    <Card className={`game-card ${classes.root}`}>
      <CardActionArea
        className={classes.cover}
        component={Link}
        to={`/game/${id}`}
      >
        <CardMedia
          className={classes.media}
          image={image_url}
          title="game art"
        />
        {/* <CardMedia
          className={classes.media}
          image={require(`../images/covers/${props.title
            .toLowerCase()
            .replace(/\s/g, "")}.jpg`)}
          title="game art"
        /> */}
      </CardActionArea>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {developer}
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {release_date}
          </Typography>
          <Typography variant="body2" component="p">
            {rating}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
