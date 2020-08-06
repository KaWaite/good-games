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
  Typography,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CloseIcon from "@material-ui/icons/Close";

import GameCard from "../Results/GameCard";
import Notice from "../Popups/Notice";

export default function GameForm({ gameListData, setGameListData, type }) {
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(null);
  const [noticeInfo, setNoticeInfo] = useState("");
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

  const handleBack = () => {
    setFormData();
    setSearch("");
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
    });
    setResults([]);
  };

  const addToCurrentGamesList = async (e) => {
    if (
      !formData ||
      gameListData.filter((gamedata) => gamedata.game.title === formData.title)
        .length > 0
    ) {
      setNoticeInfo(
        <Typography className="game-form-notice" variant="body1">
          Sorry, that game is either already in your list or not in our
          database.
        </Typography>
      );
      setShowNotice(true);
    } else if (gameListData.length >= 5) {
      setNoticeInfo(
        <Typography className="game-form-notice" variant="body1">
          Sorry, we only allow currently being played games to reach a{" "}
          <strong>max of 5 games</strong>. We believe in getting{" "}
          <strong>full enjoyment</strong> out of games, and that 5 is the max
          before someone is potentially only playing out of habit or attempting
          to get through their backlog. Please{" "}
          <strong>enjoy the current lineup first</strong> before starting
          anything else.
        </Typography>
      );
      setShowNotice(true);
    } else {
      try {
        const headers = {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.token}`,
        };
        const updatedList = (
          await axios.post(
            `${process.env.REACT_APP_API_URL}/user/games/${type}/add`,
            formData,
            {
              headers: headers,
            }
          )
        ).data;
        if (typeof updatedList === "string") {
          setNoticeInfo(
            <Typography className="game-form-notice" variant="body1">
              {updatedList}
            </Typography>
          );
          setShowNotice(true);
        } else {
          setGameListData(updatedList);
          handleClose();
        }
        window.scrollTo(0, 0);
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
        <IconButton
          aria-label="close"
          style={{ position: "absolute", right: "3px", top: "3px" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {!formData ? (
          <>
            <DialogTitle id="form-dialog-title">Add Game</DialogTitle>
            <DialogContent className="game-form-content">
              <DialogContentText>
                Search game to be added.
                {/* Then choose which list you would like it to be added to. */}
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
          </>
        ) : (
          <>
            <DialogContent>
              <GameCard
                title={formData.title}
                image_url={formData.image_url}
                elevation={0}
              />
            </DialogContent>

            <DialogActions>
              <IconButton aria-label="delete" onClick={handleBack}>
                <KeyboardBackspaceIcon fontSize="large" />
              </IconButton>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={addToCurrentGamesList}
              >
                Add
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Notice
        showNotice={showNotice}
        setShowNotice={setShowNotice}
        info={noticeInfo}
      />
    </div>
  );
}
