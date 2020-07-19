import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";
import Joi from "joi";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Typography, Fade } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertMessage]);

  // Joi user validation schema
  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(25)
      .required(),
    email: Joi.string()
      .regex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      .required(),
    password: Joi.string().trim().min(8).required(),
    confirmPassword: Joi.string().trim().min(8).required(),
  });

  // functions
  const handleChange = (prop) => (event) => {
    setFormInfo({ ...formInfo, [prop]: event.target.value });
    if (open) {
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSigningUp(true);
    signup();
  };

  const signup = async () => {
    if (validUser()) {
      const newUser = {
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password,
      };
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/signup`,
          newUser
        );
        setTimeout(() => {
          setSuccess(true);
        }, 1000);
      } catch (err) {
        setSigningUp(false);
        setAlertMessage(err.response.data.message);
        setOpen(true);
      }
    }
  };

  const validUser = () => {
    if (formInfo.password !== formInfo.confirmPassword) {
      setSigningUp(false);
      setAlertMessage('"passwords" do not match');
      setOpen(true);
      return false;
    }

    const result = schema.validate(formInfo);
    if (!result.error) {
      return true;
    } else {
      setSigningUp(false);
      // Joi error sends too much info on email regex, so use this custom error
      if (
        result.error.details[0].path[0] === "email" &&
        result.error.details[0].type === "string.pattern.base"
      ) {
        setAlertMessage('"email" is not a valid email.');
      } else if (
        result.error.details[0].path[0] === "username" &&
        result.error.details[0].type === "string.pattern.base"
      ) {
        setAlertMessage(
          '"username" is not a valid username. Make sure there are no spaces and try again.'
        );
      } else {
        setAlertMessage(result.error.details[0].message);
      }
      setOpen(true);
      return false;
    }
  };

  return (
    <div className="form-container">
      {/* If signup is successful, redirect to login page */}
      {success && <Redirect to="/login" />}
      {/* While signing up, show loading image */}
      {signingUp ? (
        <ReactLoading
          type={"cylon"}
          color="#f44336"
          height="auto"
          width="400px"
          className="loading"
        />
      ) : (
        <>
          <Fade in={open}>
            <Alert
              severity="warning"
              elevation={6}
              variant="filled"
              className={classes.error}
            >
              {alertMessage}
            </Alert>
          </Fade>
          <Paper className="form">
            <Typography variant="h1">Signup</Typography>
            <form
              className={classes.root}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                size="small"
                value={formInfo.username}
                onChange={handleChange("username")}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="small"
                value={formInfo.email}
                onChange={handleChange("email")}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={formInfo.password}
                onChange={handleChange("password")}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type="password"
                value={formInfo.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Paper>
        </>
      )}
    </div>
  );
}
