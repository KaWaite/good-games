import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  IconButton,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CloseIcon from "@material-ui/icons/Close";

import Notice from "../Popups/Notice";

export default function GameWikiAddGame(props) {
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(null);
  const [noticeInfo, setNoticeInfo] = useState("");
  const [game, setGame] = useState(props.game);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowNotice(false);
  };

  //   const addGameToForm = (e) => {
  //     e.preventDefault();
  //     setFormData({
  //       _id: results[e.target.id]._id,
  //       title: results[e.target.id].title,
  //       image_url: results[e.target.id].image_url,
  //     });
  //     setResults([]);
  //   };

  //   const addToCurrentGamesList = async (e) => {
  //     if (
  //       !formData ||
  //       props.userGameData.filter(
  //         (gamedata) => gamedata.game.title === formData.title
  //       ).length > 0
  //     ) {
  //       setNoticeInfo(
  //         <Typography className="game-form-notice" variant="body1">
  //           Sorry, that game is either already in your list or not in our
  //           database.
  //         </Typography>
  //       );
  //       setShowNotice(true);
  //     } else if (props.userGameData.length >= 5) {
  //       setNoticeInfo(
  //         <Typography className="game-form-notice" variant="body1">
  //           Sorry, we only allow currently being played games to reach a{" "}
  //           <strong>max of 5 games</strong>. We believe in getting{" "}
  //           <strong>full enjoyment</strong> out of games, and that 5 is the max
  //           before someone is potentially only playing out of habit or attempting
  //           to get through their backlog. Please{" "}
  //           <strong>enjoy the current lineup first</strong> before starting
  //           anything else.
  //         </Typography>
  //       );
  //       setShowNotice(true);
  //     } else {
  //       try {
  //         const headers = {
  //           "content-type": "application/json",
  //           authorization: `Bearer ${localStorage.token}`,
  //         };
  //         const updatedList = (
  //           await axios.post(
  //             `${process.env.REACT_APP_API_URL}/user/add`,
  //             formData,
  //             {
  //               headers: headers,
  //             }
  //           )
  //         ).data;
  //         props.setUserGameData(updatedList);
  //         handleClose();
  //         window.scrollTo(0, 0);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     fetchResults();
  //     // eslint-disable-next-line
  //   }, [search]);

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
        <FavoriteIcon /> Add game
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

        <DialogContent dividers>
          <Typography>{props.title}</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            // onClick={addToCurrentGamesList}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Notice
        showNotice={showNotice}
        setShowNotice={setShowNotice}
        info={noticeInfo}
      />
    </div>
  );
}
