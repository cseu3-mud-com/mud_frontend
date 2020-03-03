import React, { useState, useEffect } from 'react';
import { roomInfo, roomSize } from './roomGenerator';
import styled from 'styled-components'

const DrawRoom = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  background: rgb(30,30,30);
  margin-left: 1rem;
`
const InfoRoom = styled.div`
  display: block;
  font-family: 'Arial';
  font-size: 16px;
  line-height: 26px;
  max-width: 1000px;
  margin: 0 auto;
`

function GameMap() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      setRooms(rooms => [...rooms, {
        title: "random",
        description: roomInfo(),
        size: roomSize(),
      }])
    }
  }, [])

  if (rooms.length > 0) {
    return <div id="map">
      {
        rooms.map((room, i) => <Room key={i} draw {...room} />)
      }
    </div>
  } else {
    return <p>Loading...</p>
  }
}

function Room(props) {
  if (props.draw) {
    return <DrawRoom style={{ width: props.size.width + 'px', height: props.size.height + 'px' }}></DrawRoom>
  } else {
    return <InfoRoom>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </InfoRoom>
  }
}

export default GameMap;