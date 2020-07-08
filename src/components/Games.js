import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const data = await axios.get("/game/all");
    console.log(data.data[0]);
    setGames(data.data);
  };

  return (
    <div className="content">
      <Table results={games} />
    </div>
  );
}
