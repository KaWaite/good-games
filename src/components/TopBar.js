import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

import logo from "../images/logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="topbar">
        <Toolbar variant="dense" className="topbar-content">
          <img src={logo} alt="blah" className={`${classes.menuButton} logo`} />
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            color="primary"
            className={classes.title}
            component={Link}
            to="/"
          >
            GoodGames
          </Typography>
          <Button
            color="primary"
            component={Link}
            to="/account/join-the-dark-side"
          >
            Join
          </Button>
          <Button color="primary" component={Link} to="/account/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
