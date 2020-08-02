import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function GameWikiTop(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { title, release_date, description, image_url } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="game-wiki-top">
      <CardHeader
        className="game-wiki-title"
        title={title}
        subheader={release_date}
      />
      <CardMedia
        className="game-wiki-image"
        component="img"
        image={image_url}
        title={title}
      />
      <CardActions>
        <IconButton
          aria-label="add to gamelist"
          title="Add to gamelist"
          onClick={() => alert("bing")}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>This could be a paragraph.</Typography>
          <Typography paragraph>Another paragraph could be here.</Typography>
          <Typography paragraph>I like Bacon.</Typography>
          <Typography>A little extra espresso. Or is it eXpresso...</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
