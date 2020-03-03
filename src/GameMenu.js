import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function GameMenu() {
  return <div className="homepage">
    <Link to="/character"><button>Start game</button></Link>
  </div>
}

export default GameMenu;