import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const data = await axios.get("/games");
    console.log(data.data);
    setGames(data.data);
  };

  return (
    <div className="main">
      {/* <h2>Results for: {props.Search}</h2> */}
      <Table results={games} />
      {/* <ul>
        {results.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  );
}
