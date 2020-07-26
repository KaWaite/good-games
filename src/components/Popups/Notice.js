import React from "react";
import Popover from "@material-ui/core/Popover";

export default function SimplePopover(props) {
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
        {props.info}
      </Popover>
    </div>
  );
}
