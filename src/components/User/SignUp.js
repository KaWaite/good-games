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
  },
}));

export default function SignUp() {
  const [formInfo, setFormInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    email: Joi.string().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).required(),
    password: Joi.string().trim().min(8).required(),
    confirmPassword: Joi.string().trim().min(8).required(),
  });

  // functions
  const handleChange = (prop) => (event) => {
    setFormInfo({ ...formInfo, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    if(validUser()){
      // send data to server...
      console.log("false....");
    }
  };

  const validUser = () => {
    if(formInfo.password !== formInfo.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setOpen(true);
      return false;
    } 

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
        <Typography variant="h1">Signup</Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            onChange={handleChange("username")}
          />
          <TextField 
            id="email" 
            label="Email" 
            variant="outlined" 
            size="small" 
            onChange={handleChange("email")}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            onChange={handleChange('password')}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            size="small"
            type="password"
            onChange={handleChange('confirmPassword')}
          />
          <Button variant="contained" color="primary" size="small" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
