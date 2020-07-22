import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import { Button, Typography } from "@material-ui/core";

import CurrentList from "../Dashboard/CurrentList";
import SearchInput from "../Search/SearchInput";

export default function Dashboard(props) {
  const [userName, setUserName] = useState("asdfasdfsf");

  // functions
  const fetchTokenInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      setUserName(response.data.user.username);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTokenInfo();
  }, []);

  return (
    <div className="dashboard">
      <SearchInput />

      <div className="content">
        {/* <h2>dashboard page</h2> */}
        <h1>Goodday, {userName}</h1>
      </div>
      <section>
        <header>Currently playing</header>
        <CurrentList defaultExpanded="defaultExpanded" />
        <CurrentList />
        <CurrentList />
        <CurrentList />
      </section>
      <div className="content">
        <ul>
          <li>Recommendations</li>
          <li>Gaming Challenge</li>
          <li>Add Friends/Games</li>
          <li>Groups</li>
          <li>Best games of 2019</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
}
