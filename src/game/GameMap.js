import React, { useState } from 'react';
import styled from 'styled-components';

import generateMaze from 'generate-maze';

const mazeSize = 14;
const DrawMap = styled.div`
  line-height: 0;
  max-width: calc(${mazeSize} * 50px);
  border: 1px solid #000;
  padding: 1px;
`;

const DrawRoom = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 48px;
  text-align: center;
  color: white;
  position: relative;
  font-family: 'Arial';
  &.top {
    margin-top: -1px;
    border-top: 1px solid white;
  }
  &.bottom {
    margin-bottom: -1px;
    border-bottom: 1px solid white;
  }
  &.left {
    margin-left: -1px;
    border-left: 1px solid white;
  }
  &.right {
    margin-right: -1px;
    border-right: 1px solid white;
  }
  &.left.right {
    margin-left: -1px;
    margin-right: -1px;
  }
  &.top.bottom {
    margin-top: -1px;
    margin-bottom: -1px;
  }
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
  const maze = generateMaze(mazeSize);
  const [colors, setColors] = useState([])
  console.log(maze);

  if (maze.length > 0) {
    return <DrawMap>
      {
        maze.map(
          (row, r) =>
            row.map(
              (cell, c) =>
                <Room
                  key={`${r}-${c}`}
                  draw
                  {...cell}
                  colors={colors}
                  setColors={setColors}
                />
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
    const { x, y, top, bottom, left, right, set, colors, setColors } = props
    if (!colors[set]) {
      setColors(_c => {
        _c[set] = `rgba(${set * Math.random()* 10},${set * Math.random()* 10},${set * Math.random()* 10},1)`;
        return _c
      });
    }
    return <DrawRoom className={`room 
    room_${x}_${y}
    ${top === true ? 'top' : ''}
    ${bottom === true ? 'bottom' : ''}
    ${left === true ? 'left' : ''}
    ${right === true ? 'right' : ''}`
    } style={{ backgroundColor: colors[set] }}>{`${set}`}</DrawRoom>
  } else {
    return <InfoRoom>
      <p></p>
    </InfoRoom>
  }
}

export default GameMap;