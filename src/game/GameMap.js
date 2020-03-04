import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import Styl from "../styledComponents";
import axios from '../hooks/useAxios';
import useRooms from '../context/rooms';
import useInit from '../context/init';


const mapSize = 15;
const roomSize = 25;
const DrawMap = styled.div`
  margin-left: auto;
  max-width: calc(${mapSize} * ${roomSize}px);
  line-height: 0;
`;

const DrawCell = styled.div`
  display: inline-block;
  vertical-align: top;
  width: ${roomSize}px;
  height: ${roomSize}px;
  background-color: transparent;
  line-height: ${roomSize}px;
  font-size: .75rem;
  text-align: center;
  &.room {
    background-color: white;
  }
  &.player {
    background-color: red;
  }
`;

function GameMap(props) {
  const [initState, initActions] = useInit();
  const [roomState, roomActions] = useRooms();
  const [playerTravel, setPlayerTravel] = useState('');
  const { gameMap, rooms } = roomState;

  useEffect(() => {

    document.addEventListener('keydown', function (e) {
      const key = e.which;
      if ([37, 38, 39, 40].includes(key)) e.preventDefault();
      else return;
      switch (key) {
        case 37:
          setPlayerTravel('w');
          break;
        case 38:
          setPlayerTravel('n');
          break;
        case 39:
          setPlayerTravel('e');
          break;
        case 40:
          setPlayerTravel('s');
          break;
        default:
          break;
      }
      return () => {
        document.removeEventListener('keydown')
      }
    })
  });

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

  function Message() {
  
    const [message, setMessage] = useState('')
  
    useEffect(() => {
      const pusher = new Pusher('6c3071d610bd137e36cd', {
        cluster: 'us3',
        encrypted: true
      });
      const channel = pusher.subscribe('p-channel-c76cb378-9bd0-4614-a632-6be5c51c7276');
      channel.bind('broadcast', data => {
        console.log('data', data)
        setMessage(data.message);
      });
    })
    return (
      <div>{message}</div>
    )
  }

  const changePlayerDirection = (e) => {
    const { value } = e.target;
    setPlayerTravel(value)
  }

  if (gameMap.length > 0 && rooms.length > 0 && initState.init.uuid) {
    // console.log('gameMap', gameMap);
    // console.log('rooms', rooms);
    // console.log('initState', initState.init)
    return <>
      <Styl.BackgroundImage src="backgrounds/3.jpg" gradient={true} />
      <Styl.OverlayContent className="map">
        <Styl.Title className="medium">{initState.init.room.title}</Styl.Title>
        <div className="flex twoWide">
          <div className="column">
            <Styl.Description>{initState.init.room.description}</Styl.Description>
          </div>
          <div className="column">
            <DrawMap>
              {
                gameMap.map(
                  row => row.map(
                    (cell, i) => <Cell key={`${row}-${i}`} room={cell} isPlayerRoom={cell === initState.init.room.id} />
                  )
                )
              }
            </DrawMap>
          </div>
        </div>
        <Styl.PlayerControls className="flex twoWide">
          <div className="column">
            <Styl.Title className="small">Room Chat</Styl.Title>
            <Styl.Chat>
              <p>Someone left the room.</p>
              <p>Someone entered the room.</p>
              <p>Someone entered the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
              <p>Someone left the room.</p>
            </Styl.Chat>
          </div>
          <div className="column">
            <Styl.PlayerMovement>
              <Styl.MoveBtn onClick={changePlayerDirection} value="n" className="north">N</Styl.MoveBtn>
              <Styl.MoveBtn onClick={changePlayerDirection} value="w" className="west">W</Styl.MoveBtn>
              <Styl.MoveBtn onClick={changePlayerDirection} value="s" className="south">S</Styl.MoveBtn>
              <Styl.MoveBtn onClick={changePlayerDirection} value="e" className="east">E</Styl.MoveBtn>
            </Styl.PlayerMovement>
          </div>
        </Styl.PlayerControls>
      </Styl.OverlayContent>
    </>
  }
  return <>
    <Styl.BackgroundImage src="backgrounds/3.jpg" gradient={true} />
    <Styl.OverlayContent className="map">
      <Styl.Title>Loading...</Styl.Title>
    </Styl.OverlayContent>
  </>
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

export default GameMap;