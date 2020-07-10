import React, { useState, useEffect } from "react";
import GameWikiTop from "./GameWikiTop";
import axios from "axios";

export default function GameWiki(props) {
  const [gameInfo, setGameInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const fetchGame = async () => {
      const data = await axios.get(`/game/${params.id}`);
      let url = await data.data.title;
      setGameInfo(data.data);
      setImageUrl(
        `../../images/covers/${url.toLowerCase().replace(/\s/g, "")}.jpg`
      );
    };
    fetchGame();
  }, [params.id]);

  return (
    <div className="game-wiki">
      <GameWikiTop
        title={gameInfo.title}
        release_date={gameInfo.release_date}
        description={gameInfo.description}
        imageUrl={gameInfo.image_url}
      />
      <div className="content">
        <h2>{gameInfo.release_date}</h2>
      </div>
    </div>
  );
}
