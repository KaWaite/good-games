import React, { useState, useEffect } from "react";
import GameWikiTop from "./GameWikiTop";
import axios from "axios";

export default function GameWiki(props) {
  const [gameInfo, setGameInfo] = useState([]);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const fetchGame = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/game/${params.id}`
      );
      setGameInfo(data.data);
    };
    fetchGame();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <div className="game-wiki">
      <GameWikiTop
        title={gameInfo.title}
        release_date={gameInfo.release_date}
        description={gameInfo.description}
        image_url={gameInfo.image_url}
      />
      {/* <div className="content">
        <h2>Another Section</h2>
      </div> */}
    </div>
  );
}
