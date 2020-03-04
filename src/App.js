import React from 'react';
import './App.css';
import GameCharCreator from './character/GameCharCreator';
import GameMenu from './game/GameMenu';
import GameMap from './game/GameMap';
import GameMapServer from './game/GameMapServer';
import Landing from "./auth/Landing";
import SignupForm from "./auth/SignupForm";
import LoginForm from "./auth/LoginForm";
import PrivateRoute from "./hooks/usePrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={LoginForm} />
        <PrivateRoute path="/gamemenu" component={GameMenu} />
        <PrivateRoute path="/character" component={GameCharCreator} />
        <PrivateRoute path="/map" component={GameMap} />
        <PrivateRoute path="/mapServer" component={GameMapServer} />
      </Switch>
    </Router>
  );
}

export default App;
