import React, { useState, useEffect } from "react";
import Joi from "joi";
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
  }, [errorMessage]);

  // Joi user validation schema
  const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(25).required(),
    password: Joi.string().trim().min(8).required(),
  });

  // functions
  const handleChange = (prop) => (event) => {
    setFormInfo({ ...formInfo, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    if(validUser()){
      // send data to server...
      console.log("false....");
    }
  };

  const validUser = () => {
    const result = schema.validate(formInfo);
    if (!result.error) {
      console.log("YAY NO ERRORS");
      return true;
    } else {
      setErrorMessage(result.error.details[0].message);
      setOpen(true);
      return false;
    }
  };

  return (
    <div className="form-container">
    <Fade in={open}>
        <Alert severity="error" elevation={6} variant="filled" className={classes.error}>
          {errorMessage}
        </Alert>
      </Fade>
      <Paper className="form">
        <Typography variant="h1">Login</Typography>
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            onChange={handleChange("username")}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            onChange={handleChange("password")}
          />
          <Button variant="contained" color="secondary" size="medium" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
