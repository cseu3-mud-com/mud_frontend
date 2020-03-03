import React, { useState, useContext } from 'react';
import MainContext from '../context';
import { Link } from 'react-router-dom';
import axios from '../hooks/useAxios';

function GameMenu() {
  const { init, setInit } = useContext(MainContext);
  const gameInit = (e) => {
    e.preventDefault();
    if (!init.uuid) {
      axios(true).get('api/adv/init/').then(res => {
        setInit(res.data);
      })
    }
  }
  return <div className="homepage">
    <Link to="/character"><button onClick={gameInit}>Start game</button></Link>
    <Link to="/mapServer">See Map</Link>
  </div>
}

export default GameMenu;