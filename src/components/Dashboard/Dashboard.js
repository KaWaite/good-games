import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, Divider } from "@material-ui/core";
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
  const [user, setUser] = useState({});

  const classes = useStyles();

  // functions
  const fetchTokenInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
        props.handleAuthorization();
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTokenInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`dashboard ${classes.root}`}>
      <div className="dashboard-content">
        <Typography variant="h3" component="h1">
          Goodday, {user.username}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} md={6}>
            <CurrentList />
          </Grid>
          <Grid item xs={12} sm={3} md={6}>
            <div className="content">
              <ul>
                <li>Recommendations</li>
                <li>Gaming Challenge</li>
                <li>Add Friends/Games</li>
                <li>Groups</li>
                <li>Best games of 2019</li>
                <li>Settings</li>
              </ul>
              <Search
                handleChange={props.handleChange}
                submitSearch={props.submitSearch}
                show={false}
              />
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
