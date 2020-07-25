import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import GameCard from "../../Results/GameCard";
import Notice from "../../Popups/Notice";

export default function GameForm(props) {
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(null);
  const [formData, setFormData] = useState();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    if (search.length === 0) {
      setResults([]);
    } else {
      try {
        const data = (
          await axios.get(
            `${process.env.REACT_APP_API_URL}/game/find?lookup=${search}`
          )
        ).data;
        setResults(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowNotice(false);
    setResults([]);
    setSearch("");
    setFormData();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const addGameToForm = (e) => {
    e.preventDefault();
    setFormData({
      _id: results[e.target.id]._id,
      title: results[e.target.id].title,
      image_url: results[e.target.id].image_url,
      // listOrder: props.playGames.length + 1,
    });
    setResults([]);
  };

  const addToCurrentGamesList = async (e) => {
    if (
      !formData ||
      props.userGameData.filter(
        (gamedata) => gamedata.game.title === formData.title
      ).length > 0
    ) {
      setShowNotice(true);
    } else {
      try {
        const headers = {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.token}`,
        };
        const updatedList = (
          await axios.post(
            `${process.env.REACT_APP_API_URL}/user/add`,
            formData,
            {
              headers: headers,
            }
          )
        ).data;
        props.setUserGameData(updatedList);
        handleClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <Fab
        size="small"
        color="secondary"
        variant="extended"
        aria-label="add"
        className="plus-button"
        onClick={handleClickOpen}
      >
        <AddIcon /> Add game
      </Fab>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="add game form"
      >
        <DialogTitle id="form-dialog-title">Add Game</DialogTitle>
        <DialogContent>
          {!formData ? (
            <>
              <DialogContentText>
                Search game to be added. Then choose which list you would like
                it to be added to.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Game Title"
                type="text"
                fullWidth
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <GameCard
                title={formData.title}
                image_url={formData.image_url}
                elevation={0}
              />
            </>
          )}
          <div className="match-list">
            {results.map((game, i) => (
              <h4
                key={i}
                id={i}
                onClick={addGameToForm}
                onMouseOver={(e) => (e.target.style.fontWeight = "700")}
                onMouseLeave={(e) => (e.target.style.fontWeight = "500")}
              >
                {game.title}
              </h4>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={addToCurrentGamesList}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Notice
        showNotice={showNotice}
        setShowNotice={setShowNotice}
        info="Sorry, that game is either already in your list or not in our database."
      />
    </div>
  );
}
