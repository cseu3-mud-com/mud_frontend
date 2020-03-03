import React, { useState, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../hooks/useAxios';

function GameMenu() {
  const [init, setInit] = useState({})
  const gameInit = (e) => {
    e.preventDefault();
    axios(true).get('api/adv/init/').then(res => {
      console.log('INIT', res.data)
      setInit(res.data);
    })
  }
  return <div className="homepage">
    <Link to="/character"><button onClick={gameInit}>Start game</button></Link>
  </div>
}

export default GameMenu;