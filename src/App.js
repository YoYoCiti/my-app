import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageForgotPassword from "./pages/PageForgotPassword";
import Planner from "./pages/Planner";
import Progress from "./pages/Progress";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import PrivateRoute from "./config/PrivateRoute";
import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./pages/MainStyle.css";
import { AuthProvider } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
import { unionBy } from "lodash";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  function AuthenicatedRoutes() {
    const [moduleData, setModuleData] = useState([]);

    useEffect(() => {
      const urls = [
        "https://api.nusmods.com/v2/2021-2022/moduleInfo.json",
        "https://api.nusmods.com/v2/2020-2021/moduleInfo.json",
      ];
      Promise.all(
        urls.map((url) => fetch(url).then((response) => response.json()))
      ).then((results) => {
        setModuleData(unionBy(results[0], results[1], "moduleCode"));
      });
    }, []);

    return (
      <>
        <HeaderBar />
        <div className="planit-margin-wrapper planner-backg">
          <Sidebar className="sub1" />
          <div className="sub2">
            <Switch>
              <PrivateRoute exact path="/" component={PageMain} />
              <PrivateRoute path="/planner">
                <Planner moduleData={moduleData} />
              </PrivateRoute>
              <PrivateRoute path="/progress" component={Progress} />
              <PrivateRoute path="/forum">
                <Forum moduleData={moduleData} />
              </PrivateRoute>
              <Route path="/board/:id" component={ForumPost} />
            </Switch>
          </div>
        </div>
      </>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={PageSignUp} />
          <Route path="/login" component={PageLogin} />
          <Route path="/forgot-password" component={PageForgotPassword} />
          <Route component={AuthenicatedRoutes} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
