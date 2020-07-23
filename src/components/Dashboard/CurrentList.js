import React, { useState } from "react";
import { Typography } from "@material-ui/core";

import CurrentListItem from "./CurrentListItem";
import GameForm from "./GameForm";

export default function CurrentList() {
  const [playGames, setPlayGames] = useState([
    {
      title: "The Witcher 3: Wild Hunt",
      image_url:
        "https://www.mobygames.com/images/covers/l/305108-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
    },
    {
      title: "The Last of Us",
      image_url:
        "https://images.pushsquare.com/games/ps4/last_of_us_remastered/cover_large.jpg",
    },
    {
      title: "Uncharted",
      image_url:
        "https://www.moregameslike.com/wp-content/uploads/2017/07/Uncharted-Drakes-Fortune.jpg",
    },
  ]);

  const deleteGame = (i) => {
    const newPlayGames = [...playGames];
    newPlayGames.splice(i, 1);
    setPlayGames(newPlayGames);
  };

  return (
    <section className="current-list">
      <Typography variant="h5">
        Currently playing - {playGames.length}
      </Typography>
      {playGames.map((game, i) => {
        if (i === 0) {
          return (
            <CurrentListItem
              title={game.title}
              image_url={game.image_url}
              key={i}
              gameKey={i}
              deleteGame={deleteGame}
              defaultExpanded={true}
            />
          );
        } else {
          return (
            <CurrentListItem
              title={game.title}
              image_url={game.image_url}
              key={i}
              gameKey={i}
              deleteGame={deleteGame}
            />
          );
        }
      })}
      {/* <CurrentList defaultExpanded="defaultExpanded" /> */}
      <GameForm playGames={playGames} setPlayGames={setPlayGames} />
    </section>
  );
}
