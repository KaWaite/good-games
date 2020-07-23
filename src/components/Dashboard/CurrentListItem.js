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
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
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
  image: {
    height: "150px",
  },
}));

export default function CurrentList(props) {
  const classes = useStyles();

  // functions
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.parentNode.parentNode.parentNode);
  };

  return (
    <div className={classes.root}>
      <Accordion {...props} className={classes.card}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Playing Time: 20hrs
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <img src={props.image_url} alt="cover" className={classes.image} />
          </div>
          {/* <div className={classes.column}>
            <Chip
              label="Barbados"
              onDelete={() => {
                alert("HEY");
              }}
            />
          </div> */}
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            aria-label="Remove from list"
            onClick={handleDelete}
          >
            <Typography variant="button">X</Typography>
          </Button>
          <Button variant="contained" size="small" color="primary">
            <Typography variant="button">Update</Typography>
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
