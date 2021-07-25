import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import logo from "../../img/Planit_Brand_dark.svg";

import "./HeaderBar.css";

function HeaderBar() {
  const { signout, currentUser } = useAuth();

  const history = useHistory();

  async function handleLogOut() {
    await signout();
    history.push("/login");
  }

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#20215b" }}
      elevation="disabled"
    >
      <Toolbar>
        <div className="title">
          <img src={logo} alt="Planit Logo" onClick={() => history.push("/")} />
        </div>
        {currentUser && (
          <Button color="inherit" size="large" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
