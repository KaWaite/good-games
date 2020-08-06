import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

import GameListItem from "./GameListItem";
import GameForm from "./GameForm";

export default function GameList({ type, title, total }) {
  const [gameListData, setGameListData] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const fetchGameListData = async () => {
    try {
      const response = (
        await axios.get(`${process.env.REACT_APP_API_URL}/user/games/${type}`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        })
      ).data;
      setGameListData(response);
      setIsDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGame = async (id) => {
    try {
      const updatedList = (
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/user/games/${type}/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
      ).data;
      setGameListData(updatedList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGameListData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isDone]);

  return (
    <section className="list">
      {isDone && (
        <>
          <Typography variant="h6">
            {title}{" "}
            <span className="list-badge">
              {gameListData.length}/{total}
            </span>
          </Typography>
          {gameListData.map((game, i) => {
            if (i === 0 && type === "current") {
              return (
                <GameListItem
                  game={game}
                  setGameListData={setGameListData}
                  key={game._id}
                  deleteGame={deleteGame}
                  type={type}
                  defaultExpanded={true}
                />
              );
            } else {
              return (
                <GameListItem
                  game={game}
                  setGameListData={setGameListData}
                  key={game.game._id}
                  deleteGame={deleteGame}
                  type={type}
                />
              );
            }
          })}
          <GameForm
            gameListData={gameListData}
            setGameListData={setGameListData}
            type={type}
          />
        </>
      )}
    </section>
  );
}
