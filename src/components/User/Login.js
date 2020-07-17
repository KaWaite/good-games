import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Typography, Fade } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  error: {
    margin: "5px",
  }
}));

export default function Login() {
  const [formInfo, setFormInfo] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-container">
    <Fade in={open}>
        <Alert severity="error" elevation={6} variant="filled" className={classes.error}>
          {errorMessage}
        </Alert>
      </Fade>
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
