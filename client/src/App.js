import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./stylesheets/app.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
