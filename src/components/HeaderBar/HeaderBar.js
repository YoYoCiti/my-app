import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import "./HeaderBar.css";

function HeaderBar() {
  return (
    <AppBar position="sticky" style={{ backgroundColor: deepPurple }}>
      <Toolbar>
        <Typography variant="h5">Plan-et</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
