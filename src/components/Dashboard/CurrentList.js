import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

import CurrentListItem from "./CurrentListItem";
import GameForm from "./AddGameForm/GameForm";

export default function CurrentList() {
  const [userGameData, setUserGameData] = useState([]);

  const fetchCurrentUserGameData = async () => {
    try {
      const response = (
        await axios.get(`${process.env.REACT_APP_API_URL}/user/games/current`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        })
      ).data;
      setUserGameData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCurrentUserGameData();
  }, []);

  //   const deleteGame = (i) => {
  //     const newPlayGames = [...playGames];
  //     newPlayGames.splice(i, 1);
  //     setPlayGames(newPlayGames);
  //   };

  return (
    <section className="current-list">
      <Typography variant="h5">
        Currently playing - {userGameData.length}
      </Typography>
      {userGameData.map((game, i) => {
        if (i === 0) {
          return (
            <CurrentListItem
              title={game.game.title}
              image_url={game.game.image_url}
              key={game.game._id}
              play_time={game.play_time}
              //   deleteGame={deleteGame}
              defaultExpanded={true}
            />
          );
        } else {
          return (
            <CurrentListItem
              title={game.game.title}
              image_url={game.game.image_url}
              key={game.game._id}
              play_time={game.play_time}
              //   deleteGame={deleteGame}
            />
          );
        }
      })}
      {/* <CurrentList defaultExpanded="defaultExpanded" /> */}
      <GameForm userGameData={userGameData} setUserGameData={setUserGameData} />
    </section>
  );
}
