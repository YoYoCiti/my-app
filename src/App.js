import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import Planner from "./pages/Planner";
import Progress from "./pages/Progress";
import Forum from "./pages/Forum";
import PrivateRoute from "./config/PrivateRoute";
import HeaderBar from "./components/HeaderBar";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <HeaderBar />
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
