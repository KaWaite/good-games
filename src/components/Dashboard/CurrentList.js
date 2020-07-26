import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

import CurrentListItem from "./CurrentListItem";
import GameForm from "./GameForm";

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

  const deleteGame = async (id) => {
    try {
      const updatedList = (
        await axios.delete(`${process.env.REACT_APP_API_URL}/user/game/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        })
      ).data;
      setUserGameData(updatedList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="current-list">
      <Typography variant="h6">
        Currently playing{" "}
        <span className="current-list-badge">{userGameData.length}/5</span>
      </Typography>
      {userGameData.map((game, i) => {
        if (i === 0) {
          return (
            <CurrentListItem
              title={game.game.title}
              image_url={game.game.image_url}
              key={game.game._id}
              game_id={game.game._id}
              play_time={game.play_time}
              deleteGame={deleteGame}
              defaultExpanded={true}
            />
          );
        } else {
          return (
            <CurrentListItem
              title={game.game.title}
              image_url={game.game.image_url}
              key={game.game._id}
              game_id={game.game._id}
              play_time={game.play_time}
              deleteGame={deleteGame}
            />
          );
        }
      })}
      <GameForm userGameData={userGameData} setUserGameData={setUserGameData} />
    </section>
  );
}
