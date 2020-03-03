import React, { useState, useEffect } from 'react';
import { roomInfo, roomSize } from './roomGenerator';
import styled from 'styled-components';

import generateMaze from 'generate-maze';

const DrawMap = styled.div`
  line-height: 0;
`;

const DrawRoom = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  background: rgb(230,230,230);
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
  const maze = generateMaze(20);
  console.log(maze);

  if (maze.length > 0) {
    return <DrawMap>
      {
        maze.map(
          (row, r) =>
            row.map(
              (cell, c) =>
                <Room key={`${r}-${c}`} draw {...cell} />
            )
        )
      }
    </DrawMap>
  } else {
    return <p>Loading...</p>
  }
}

function Room(props) {
  if (props.draw) {
    let marginTop = 0
    let marginLeft = 0
    if (props.top === true) marginTop--;
    if (props.bottom === true) marginTop--;
    if (props.left === true) marginLeft--;
    if (props.right === true) marginLeft--;
    return <DrawRoom style={{
      borderTop: (props.top === true ? '1px solid red' : null),
      borderBottom: (props.bottom === true ? '1px solid red' : null),
      borderLeft: (props.left === true ? '1px solid red' : null),
      borderRight: (props.right === true ? '1px solid red' : null),
      marginTop: marginTop + 'px',
      marginLeft: marginLeft + 'px'
    }} />
  } else {
    return <InfoRoom>
      <p></p>
    </InfoRoom>
  }
}

export default GameMap;