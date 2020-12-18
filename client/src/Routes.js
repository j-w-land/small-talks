import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
const Routes = (props) => (
  <Router {...props}>
    <Header></Header>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/board">
        <Board />
      </Route>
      <Route exact path="/">
        <Board />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
