import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from './useAxios';

const mapSize = 14;
const roomSize = 25;
const DrawMap = styled.div`
  max-width: calc(${mapSize} * ${roomSize}px);
  line-height: 0;
`;

const DrawCell = styled.div`
  display: inline-block;
  width: ${roomSize}px;
  height: ${roomSize}px;
  background-color: gray;

  &.room {
    background-color: #bbb;
  }
`;

function GameMapServer() {
  const [gameMap, setMap] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setMap(map => {
      const newMap = [];
      for (let i = 0; i < mapSize; i++) {
        newMap.push([]);
        for (let j = 0; j < mapSize; j++) {
          newMap[i].push(0);
        }
      }
      return newMap;
    });
    axios().get('/api/adv/rooms').then(res => {
      setRooms(JSON.parse(res.data.rooms).map(room => ({
        ...room,
        id: room.pk,
        ...room.fields,
        fields: null,
        pk: null
      })))
    })
  }, []);

  if (gameMap.length > 0 && rooms.length > 0) {
    console.log(gameMap);
    console.log(rooms);
    return <DrawMap>
      {
        gameMap.map(row => row.map((cell, i) => <Cell key={`${row}-${i}`} />))
      }
    </DrawMap>
  }
  return <h1>Loading...</h1>
}

function Cell(props) {
  const {
    // id, title, description,
    n_to,
    s_to,
    w_to,
    e_to,
  } = props;
  const isCellRoom = Math.random() > .5;
  const classes = ['cell']
  if(isCellRoom) {
    classes.push('room')
    if (n_to === true)
      classes.push('top')
    if (s_to === true)
      classes.push('bottom')
    if (w_to === true)
      classes.push('left')
    if (e_to === true)
      classes.push('right')
  }
  return <DrawCell className={classes} />
}

export default GameMapServer;