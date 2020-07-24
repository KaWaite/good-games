import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    background: "orange",
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setShowNotice(null);
  };

  const open = Boolean(props.showNotice);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>{props.info}</Typography>
      </Popover>
    </div>
  );
}
