import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInit from './../context/init';

function GameMenu() {
  const [initState, initActions] = useInit();
  
  useEffect(() => {
    if (!initState.init.uuid) initActions.getInit();
  }, [initState, initActions]);

  console.log(initState);
  return <div className="homepage">
    <Link to="/character"><button>Start game</button></Link>
    <Link to="/mapServer">See Map</Link>
  </div>
}

export default GameMenu;