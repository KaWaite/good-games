import React, { useState, useEffect } from "react";
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

export default function Login(props) {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

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
    password: Joi.string().trim().min(8).required(),
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
    setLoggingIn(true);
    login();
  };

  const login = async () => {
    if (validUser()) {
      try {
        // send data to server...
        const result = (
          await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            formInfo
          )
        ).data;
        localStorage.token = result.token;
        setTimeout(() => {
          props.setUser(result.user);
          props.setIsLoggedIn(true);
        }, 1000);
      } catch (err) {
        setLoggingIn(false);
        setAlertMessage(err.response.data.message);
        setOpen(true);
      }
    }
  };

  const validUser = () => {
    const result = schema.validate(formInfo);
    if (!result.error) {
      return true;
    } else {
      setLoggingIn(false);
      // Joi error for username regex too detailed, set to custom error
      if (result.error.details[0].path[0] === "username") {
        setAlertMessage("Username is invalid.");
      } else {
        setAlertMessage("Password is invalid.");
      }
      setOpen(true);
      return false;
    }
  };

  return (
    <div className="form-container">
      {/* While logging in, show loading image */}
      {loggingIn ? (
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
            <Typography variant="h1">Login</Typography>
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
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={formInfo.password}
                onChange={handleChange("password")}
              />
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </>
      )}
    </div>
  );
}
