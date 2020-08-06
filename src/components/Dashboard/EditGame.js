import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  //   InputLabel,
  //   Input,
  //   MenuItem,
  //   FormControl,
  //   Select,
  Typography,
  //   Chip,
  IconButton,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
// import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "300px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    margin: theme.spacing(1),
  },
}));

export default function EditGame({
  title,
  id,
  play_time,
  setGameListData,
  type,
}) {
  const [playTime, setPlayTime] = useState();
  const [trophies, setTrophies] = useState(["trophy1", "trophy blah"]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "play_time":
        setPlayTime(e.target.value);
        break;
      default:
        if (trophies[e.target.value]) {
          console.log("Hey you got that already");
        } else {
          let newTrophies = [...trophies];
          newTrophies.push(e.target.value);
          setTrophies(newTrophies);
        }
        break;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateGameData();
    handleClose();
  };

  const updateGameData = async () => {
    try {
      const headers = {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.token}`,
      };
      const updatedData = {
        _id: id,
        play_time: playTime,
        // trophies: trophies,
      };
      const results = (
        await axios.post(
          `${process.env.REACT_APP_API_URL}/user/games/${type}/update`,
          updatedData,
          {
            headers: headers,
          }
        )
      ).data;
      setGameListData(results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        <Typography variant="button">Update</Typography>
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update {title} info</DialogTitle>
        <IconButton
          aria-label="close"
          style={{ position: "absolute", right: "3px", top: "3px" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              autoFocus
              fullWidth
              id="play_time"
              label="Play Time"
              margin="dense"
              type="number"
              placeholder={play_time.toString()}
              onChange={handleChange}
            />

            {/* <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">
                Completed Trophies
              </InputLabel>
              <Select
                labelId="completed_trophies"
                id="trophies"
                // multiple
                // value={trophies}
                onChange={handleChange}
                input={<Input />}
                // MenuProps={MenuProps}
              >
                {trophyList.map((trophy) => (
                  <MenuItem
                    key={trophy}
                    value={trophy}
                    style={getStyles(trophy, trophy, theme)}
                  >
                    {trophy}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.chips}>
              {trophies.map((trophy) => (
                <Chip
                  key={trophy}
                  label={trophy}
                  className={classes.chip}
                  onDelete={handleDelete}
                />
              ))}
            </div> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
