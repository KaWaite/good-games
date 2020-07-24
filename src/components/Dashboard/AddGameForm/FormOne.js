import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";

import GameCard from "../../Results/GameCard";

export default function FormOne(props) {
  return (
    <>
      <DialogTitle id="form-dialog-title">Add Game</DialogTitle>
      <DialogContent>
        {!props.formData.length > 0 ? (
          <>
            <DialogContentText>
              Search game to be added. Then choose which list you would like it
              to be added to.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Game Title"
              type="text"
              fullWidth
              onChange={props.handleChange}
            />
          </>
        ) : (
          <>
            <GameCard
              title={props.formData.title}
              image_url={props.formData.image_url}
              elevation={`elevation="0"`}
            />
          </>
        )}
        <div className="match-list">
          {props.results.map((game, i) => (
            <h4
              id={i}
              onClick={props.addGameToForm}
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
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={props.addGame}
        >
          Add
        </Button>
      </DialogActions>
    </>
  );
}
