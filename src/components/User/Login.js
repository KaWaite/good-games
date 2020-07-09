import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Login() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-container">
      <Paper className="form">
        <Typography variant="h1">Login</Typography>
        <form className={classes.root} noValidate autoComplete="off" action="#">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
          />
          <Button variant="contained" color="primary" size="small">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
