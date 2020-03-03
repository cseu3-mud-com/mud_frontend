import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../hooks/useAxios';

const mapSize = 42;
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
  const [playerTravel, setPlayerTravel] = useState('');

  useEffect(() => {
    if (rooms.length <= 0) {
      axios(true).get('api/adv/rooms/').then(res => {
        setRooms(res.data.rooms);
      })
    }
  }, []);

  useEffect(() => {
    if (rooms.length > 0 && gameMap.length === 0) {
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

  useEffect(() => {
    if (playerTravel !== '') {
      axios(true).post('api/adv/move/', { direction: playerTravel }).then(res => {
        console.log(res.data);
        // setPlayerTravel('')
      })
    }
  }, [playerTravel])

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

  const changePlayerDirection = (e) => {
    const { value } = e.target;
    setPlayerTravel(value)
  }

  if (gameMap.length > 0 && rooms.length > 0) {
    console.log(gameMap);
    console.log(rooms);

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