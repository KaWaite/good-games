import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper component="textfield" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search game..."
        inputProps={{ "aria-label": "search game" }}
        onChange={props.onChange}
      />
    </Paper>
  );
}

{
  /* <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="filled-basic"
              variant="filled"
              color="primary"
              label="Search game.."
              onChange={props.handleChange}
              className="search-input"
            />
            
          </form> */
}
