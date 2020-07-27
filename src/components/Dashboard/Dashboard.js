import React from "react";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Divider, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CurrentList from "./CurrentList";
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

export default function Dashboard(props) {
  const classes = useStyles();

  return (
    <div className={`dashboard ${classes.root}`}>
      <div className="dashboard-header">
        <Avatar
          src={require("../../images/iconfinder__Pokemon_1337519.svg")}
          className="dashboard-avatar"
        />
        <Typography variant="h3" component="h1">
          {props.user.username}
        </Typography>
      </div>
      <div className="dashboard-content">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} md={6}>
            <CurrentList />
          </Grid>
          <Grid item xs={12} sm={3} md={6}>
            <div className="content">
              <ul>
                <Search
                  handleChange={props.handleChange}
                  submitSearch={props.submitSearch}
                  show={false}
                />
                <li>Recommendations</li>
                <li>Gaming Challenge</li>
                <li>Add Friends/Games</li>
                <li>Groups</li>
                <li>Best games of 2019</li>
                <li>Settings</li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider />
      {/* Redirect when token is absent or expired/invalid */}
      {!props.user && <Redirect to="/login" />}
    </div>
  );
}
