import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HeaderBar from "./components/HeaderBar";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import { deepPurple, purple } from "@material-ui/core/colors";

function App() {
  return (
    <Router>
        <AppBar position="static" style={{backgroundColor: deepPurple}}>
          <Toolbar>
            <Typography variant="h5" >
              Plan-et
            </Typography>
          </Toolbar>
        </AppBar>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={PageMain} />
          <Route path="/signup" component={PageSignUp} />
          <Route path="/login" component={PageLogin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
