import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./config/PrivateRoute";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import Planner from "./pages/Planner";
import Progress from "./pages/Progress";
import Forum from "./pages/Forum";
import "./pages/style.css";

function App() {
  return (
    <Router>
      <AppBar position="static" style={{ backgroundColor: deepPurple }}>
        <Toolbar>
          <Typography variant="h5">Plan-et</Typography>
        </Toolbar>
      </AppBar>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={PageMain} />
          <Route path="/signup" component={PageSignUp} />
          <Route path="/login" component={PageLogin} />
          <PrivateRoute path="/planner" component={Planner} />
          <PrivateRoute path="/progress" component={Progress} />
          <PrivateRoute path="/forum" component={Forum} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
