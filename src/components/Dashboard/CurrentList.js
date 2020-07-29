import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

import CurrentListItem from "./CurrentListItem";
import GameForm from "./GameForm";

export default function CurrentList() {
  const [userGameData, setUserGameData] = useState([]);
  const [isDone, setIsDone] = useState(false);

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
      setIsDone(true);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    fetchCurrentUserGameData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isDone]);

  return (
    <section className="current-list">
      {isDone && (
        <>
          <Typography variant="h6">
            Currently playing{" "}
            <span className="current-list-badge">{userGameData.length}/5</span>
          </Typography>
          {userGameData.map((game, i) => {
            if (i === 0) {
              return (
                <CurrentListItem
                  game={game}
                  setUserGameData={setUserGameData}
                  key={game._id}
                  deleteGame={deleteGame}
                  defaultExpanded={true}
                />
              );
            } else {
              return (
                <CurrentListItem
                  game={game}
                  setUserGameData={setUserGameData}
                  key={game.game._id}
                  deleteGame={deleteGame}
                />
              );
            }
          })}
          <GameForm
            userGameData={userGameData}
            setUserGameData={setUserGameData}
          />
        </>
      )}
    </section>
  );
}
