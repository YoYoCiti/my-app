import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
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
