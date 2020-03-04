import React, { useEffect } from 'react';
import useInit from './../context/init';
import Styl from "../styledComponents";

function GameMenu() {
  const [initState, initActions] = useInit();

  useEffect(() => {
    if (!initState.init.uuid) initActions.getInit();
  }, [initState, initActions]);

  return (<>
    <Styl.BackgroundImage src="backgrounds/2.jpg" />
    <Styl.OverlayContent className="alignRight">
      <Styl.Menu to="/map">Continue</Styl.Menu>
      <Styl.Menu to="/map">Start</Styl.Menu>
      <Styl.Menu to="/logout">Exit</Styl.Menu>
    </Styl.OverlayContent>
  </>)
}

export default GameMenu;