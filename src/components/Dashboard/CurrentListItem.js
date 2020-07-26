import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AreYouSureAlert from "./AreYouSureAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "4px auto",
  },
  card: {
    background: "rgba(54, 54, 54, 0.8)",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "50%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function CurrentListItem(props) {
  const { title, image_url, game_id, play_time, deleteGame, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion {...rest} className={classes.card}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Playing Time: {play_time} hours
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <img
              src={image_url}
              alt="cover"
              className="current-list-item-image"
              onClick={() => alert("yahooo")}
            />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Special Trophy Obtained 4/2
              <br />
              Extra Special Trophy Obtained 4/1
              <br />
              Special Trophy Obtained 3/25
              <br />
              Special Trophy Obtained 3/13
              <br />
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions className="button-container">
          <AreYouSureAlert deleteGame={deleteGame} id={game_id} />
          <Button variant="contained" size="small" color="primary">
            <Typography variant="button">Update</Typography>
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
