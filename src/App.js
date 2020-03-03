import React from "react";
import "./App.css";
import GameCharCreator from "./GameCharCreator";
import GameMenu from "./GameMenu";
import GameMap from "./GameMap";
import Landing from "./Landing";
import SignupForm from "./SignupForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignupForm} />
        {/* <GameMenu /> */}
        {/* </Route> */}
        <Route path="/character">
          <GameCharCreator />
        </Route>
        <Route path="/map">
          <GameMap />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
