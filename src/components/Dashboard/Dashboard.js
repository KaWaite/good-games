import React from "react";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Divider, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GameList from "./GameList";
import Search from "../Search/Search";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard({ user, setSearchedTerm }) {
  const classes = useStyles();

  return (
    <div className={`dashboard ${classes.root}`}>
      <div className="dashboard-header">
        <Avatar
          src={require("../../images/iconfinder__Pokemon_1337519.svg")}
          className="dashboard-avatar"
        />
        <Typography variant="h3" component="h1">
          {user.username}
        </Typography>
      </div>
      <div className="dashboard-content">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} md={6}>
            <GameList type="current" title="Currently Playing" total="5" />
          </Grid>
          <Grid item xs={12} sm={3} md={6}>
            <GameList type="wish" title="Wishlist" total="10" />
          </Grid>
          <Grid item xs={12} sm={3} md={6}>
            <div className="content">
              <ul>
                <Search setSearchedTerm={setSearchedTerm} show={false} />
                <li>Groups</li>
                <li>Gaming Challenge</li>
                <li>Best games of 2019</li>
                <li>Settings</li>
                <li>Add Friends</li>
                <li>Recommendations</li>
                <li>Want to play list</li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider />
      {/* Redirect when token is absent or expired/invalid */}
      {!user && <Redirect to="/login" />}
    </div>
  );
}
