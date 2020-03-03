import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from '../hooks/useAxios';
import useRooms from './../context/rooms';


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
`;

function GameMapServer(props) {
  const [roomState, roomActions] = useRooms();
  const [playerTravel, setPlayerTravel] = useState('');
  const { gameMap, rooms } = roomState;
  useEffect(() => {
    console.log('here?')
    if (!roomState.rooms.length > 0) roomActions.getRooms();
  }, [roomState, roomActions]);

  useEffect(() => {
    if (playerTravel !== '') {
      axios(true).post('api/adv/move/', { direction: playerTravel }).then(res => {
        console.log(res.data);
        // setPlayerTravel('')
      })
    }
  }, [playerTravel])

  const changePlayerDirection = (e) => {
    const { value } = e.target;
    setPlayerTravel(value)
  }
  
  if (gameMap.length > 0 && rooms.length > 0) {
    console.log('gameMap', gameMap);
    console.log('rooms', rooms);
    return <>
      <DrawMap>
        {
          gameMap.map(
            row => row.map(
              (cell, i) => <Cell key={`${row}-${i}`} room={cell} />
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
    room
  } = props;
  const classes = ['cell']
  if (room > 0) {
    classes.push('room')
  }
  return <DrawCell className={classes}>{room > 0 ? room : ''}</DrawCell>
}

export default GameMapServer;