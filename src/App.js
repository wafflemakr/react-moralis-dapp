import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "./history";

// Components
import SideBar from "./components/SideBar";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";

function App() {
  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Router history={history}>
      <>
        <SideBar />
        {routes}
      </>
    </Router>
  );
}

export default App;
