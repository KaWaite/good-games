import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  // IconButton,
  // InputBase,
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";

import logo from "../images/logo2.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: 0,
  },
  dashboardButton: {
    marginLeft: theme.spacing(3),
    // background: "brown",
  },
  grow: {
    flexGrow: 1,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function TopBar(props) {
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("token");
    props.handleAuthorization();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="topbar">
        <Toolbar variant="dense" className="topbar-content">
          <Button
            edge="start"
            title="Good Games - home"
            className={classes.menuButton}
            aria-label="good games home button"
            component={Link}
            to="/"
          >
            <img src={logo} alt="good games logo" className="logo" />
          </Button>
          {props.isLoggedIn ? (
            <>
              <Button
                className={classes.dashboardButton}
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </Button>
              <div className={classes.grow} />
              <Button onClick={logout} component={Link} to="/">
                Logout
              </Button>
            </>
          ) : (
            <>
              <div className={classes.grow} />
              <Button color="primary" component={Link} to="/join-the-dark-side">
                Join
              </Button>
              <Button color="primary" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
