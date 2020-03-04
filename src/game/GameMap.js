import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../hooks/useAxios';
import useRooms from '../context/rooms';
import useInit from '../context/init';

const mapSize = 15;
const roomSize = 25;
const DrawMap = styled.div`
  max-width: calc(${mapSize} * ${roomSize}px);
  line-height: 0;
`;

const DrawCell = styled.div`
  display: inline-block;
  vertical-align: top;
  width: ${roomSize}px;
  height: ${roomSize}px;
  background-color: #eee;
  line-height: ${roomSize}px;
  text-align: center;
  &.room {
    background-color: #bbb;
  }
  &.player {
    background-color: red;
  }
`;

function GameMapServer(props) {
  const [initState, initActions] = useInit();
  const [roomState, roomActions] = useRooms();
  const [playerTravel, setPlayerTravel] = useState('');
  const { gameMap, rooms } = roomState;

  useEffect(() => {
    if (!initState.init.uuid) initActions.getInit();
  }, [initState, initActions]);

  useEffect(() => {
    if (!roomState.rooms.length > 0) roomActions.getRooms();
  }, [roomState, roomActions]);
  
  useEffect(() => {
    if (playerTravel !== '') {
      console.log('playerTravel', playerTravel)
      axios(true).post('api/adv/move/', { direction: playerTravel }).then(res => {
        initActions.setRoom(res.data);
        setPlayerTravel('');
      })
    }
  }, [playerTravel])

  const changePlayerDirection = (e) => {
    const { value } = e.target;
    setPlayerTravel(value)
  }
  
  if (gameMap.length > 0 && rooms.length > 0) {
    // console.log('gameMap', gameMap);
    // console.log('rooms', rooms);
    console.log(initState.init.room.title)
    console.log(initState.init.room.description)
    return <>
      <DrawMap>
        {
          gameMap.map(
            row => row.map(
              (cell, i) => <Cell key={`${row}-${i}`} room={cell} isPlayerRoom={cell === initState.init.room.id} />
            )
          )
        }
      </DrawMap>
      <div className="movePlayer">
        <button onClick={changePlayerDirection} value="n">N</button>
        <button onClick={changePlayerDirection} value="w">W</button>
        <button onClick={changePlayerDirection} value="s">S</button>
        <button onClick={changePlayerDirection} value="e">E</button>
      </div>
    </>
  }
  return <h1>Loading...</h1>
}

function Cell(props) {
  const {
    room,
    isPlayerRoom
  } = props;
  const classes = ['cell']
  if (room > 0) {
    classes.push('room')
  }
  if (isPlayerRoom) {
    classes.push('player')
  }
  return <DrawCell className={classes}>{room > 0 ? room : ''}</DrawCell>
}

export default GameMapServer;