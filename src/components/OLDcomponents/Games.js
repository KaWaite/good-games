import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const fetchGames = async () => {
    const data = await axios.get("/game/all");
    setGames(data.data);
  };

  return (
    <div className="content">
      <Table results={games} />
    </div>
  );
}
