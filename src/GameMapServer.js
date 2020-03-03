import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import axios from './useAxios';

const mapSize = 36;
const spaceBetweenRooms = 2;
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

function GameMapServer() {
  const [gameMap, setMap] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // axios(true).get('/api/adv/rooms')
    axios.get('https://lambda-mud-test.herokuapp.com/api/adv/rooms').then(res => {
      const _rooms = JSON.parse(res.data.rooms).map(room => ({
        ...room,
        id: room.pk,
        ...room.fields,
        fields: null,
        pk: null
      }));
      setRooms(_rooms);
    })
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      setMap(map => {
        const newMap = [];
        for (let i = 0; i < mapSize; i++) {
          newMap.push([]);
          for (let j = 0; j < mapSize; j++) {
            newMap[i].push(0);
          }
        }

        const position = mapSize / 2;
        drawInMap(newMap, position, position, rooms[0].id);

        return newMap;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms])

  const roomsInMap = []
  const drawInMap = (map, x, y, currentRoom) => {
    if (currentRoom > 0) {
      if (!roomsInMap.includes(currentRoom)) {
        roomsInMap.push(currentRoom);
        map[x][y] = currentRoom;
        const findRoom = rooms.find(room => room.id === currentRoom);
        //console.log('drawing:', currentRoom)
        // draw connection to the north if there is one
        if (findRoom.n_to > 0) {
          //console.log('drawing north of', currentRoom, 'which is', findRoom.n_to)
          drawInMap(map, x - spaceBetweenRooms, y, findRoom.n_to)
        }
        // draw connection to the south if there is one
        if (findRoom.s_to > 0) {
          //console.log('drawing south of', currentRoom, 'which is', findRoom.s_to)
          drawInMap(map, x + spaceBetweenRooms, y, findRoom.s_to)
        }
        // draw connection to the west if there is one
        if (findRoom.w_to > 0) {
          //console.log('drawing west of', currentRoom, 'which is', findRoom.w_to)
          drawInMap(map, x, y - spaceBetweenRooms, findRoom.w_to)
        }
        // draw connection to the east if there is one
        if (findRoom.e_to > 0) {
          //console.log('drawing east of', currentRoom, 'which is', findRoom.e_to)
          drawInMap(map, x, y + spaceBetweenRooms, findRoom.e_to)
        }
      }
    } else {
      map[x][y] = 0
    }
  }

  if (gameMap.length > 0 && rooms.length > 0) {
    console.log(gameMap);
    console.log(rooms);

    return <DrawMap>
      {
        gameMap.map(
          row => row.map(
            (cell, i) => <Cell key={`${row}-${i}`} room={cell} />
          )
        )
      }
    </DrawMap>
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