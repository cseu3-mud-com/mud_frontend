import React from 'react';
import './App.css';
import GameCharCreator from './GameCharCreator';
import GameMenu from './GameMenu';
import GameMap from './GameMap';
import GameMapServer from './GameMapServer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <GameMenu />
        </Route>
        <Route path="/character">
          <GameCharCreator />
        </Route>
        <Route path="/map">
          <GameMap />
        </Route>
        <Route path="/mapServer">
          <GameMapServer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
