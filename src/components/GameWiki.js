import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GameWiki(props) {
  const [gameInfo, setGameInfo] = useState([]);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const fetchGame = async () => {
      const data = await axios.get(`/game/${params.id}`);
      setGameInfo(data.data);
    };
    fetchGame();
  }, []);

  return (
    <div className="content">
      <h1>{gameInfo.title}</h1>
      <h2>{gameInfo.release_date}</h2>
    </div>
  );
}
