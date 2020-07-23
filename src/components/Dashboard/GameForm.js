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

import GameCard from "../Results/GameCard";

export default function GameForm(props) {
  const [open, setOpen] = useState(false);
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
        console.log(data);
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
      title: results[e.target.id].title,
      image_url: results[e.target.id].image_url,
    });
    setResults([]);
  };

  const addGame = () => {
    props.setPlayGames([...props.playGames, formData]);
    handleClose();
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
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
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
                elevation={`elevation="0"`}
              />
              {/* <ListChoiceRadio /> */}
            </>
          )}
          <div className="match-list">
            {results.map((game, i) => (
              <h4
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
            onClick={addGame}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
