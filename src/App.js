import React from 'react';
import './App.css';
import GameCharCreator from './GameCharCreator';
import GameMenu from './GameMenu';
import GameMap from './GameMap';
import GameMapServer from './GameMapServer';
import Landing from "./Landing";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import PrivateRoute from "./usePrivateRoute";
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
