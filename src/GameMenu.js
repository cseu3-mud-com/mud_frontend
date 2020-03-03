import React from 'react';
import { Link } from 'react-router-dom';

function GameMenu() {
  return <div className="homepage">
    <Link to="/character"><button>Start game</button></Link>
  </div>
}

export default GameMenu;