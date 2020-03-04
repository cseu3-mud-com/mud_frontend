import React from 'react';
import GameCharCreator from './character/GameCharCreator';
import GameMenu from './game/GameMenu';
import GameMapServer from './game/GameMapServer';
import SignupForm from "./auth/SignupForm";
import LoginForm from "./auth/LoginForm";
import PrivateRoute from "./hooks/usePrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './globalStyles';
import Styl from './styledComponents';

const theme = {
  fonts: {
    primary: "'Roboto Mono', monospace, sans-serif",
    secondary: "'Trade Winds', cursive, sans-serif",
  },
  colors: {
    white: '#fff'
  },
  pageBackground: '#000'
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styl.Page>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={SignupForm} />
            <PrivateRoute path="/menu" component={GameMenu} />
            <PrivateRoute path="/map" component={GameMapServer} />
            <PrivateRoute path="/character" component={GameCharCreator} />
          </Switch>
        </Router>
      </Styl.Page>
    </ThemeProvider>
  );
}

export default App;
