import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  error: {
    margin: "10px",
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
  }, []);

  // Alert component
  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

 const handleClose = (event) => {
    setOpen(false);
  };

  // functions
  const handleChange = (prop) => (event) => {
    setFormInfo({ ...formInfo, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
    console.log(formInfo);
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
  };


  return (
    <>
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} key="top-center" onClose={handleClose}>
      <Alert severity="error" className={classes.error}>{errorMessage}</Alert>
    </Snackbar>
    <div className="form-container">
      
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
    </>
  );
}
