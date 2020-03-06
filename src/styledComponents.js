import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.section`
  width: 1024px;
  min-width: 1024px;
  max-width: 1024px;
  height: 720px;
  min-height: 720px;
  max-height: 720px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BGImg = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;

const OverlayContent = styled.div`
  display: block;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50px;
  width: 33%;
  transform: translateY(-50%);
  &.alignRight {
    left: auto;
    right: 100px;
  }
  &.map {
    width: 100%;
    height: 100%;
    position: relative;
    top: auto;
    left: auto;
    padding: 2rem;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  /* display: block; */
  display: flex;
  font-size: 3rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  text-shadow: 1px 2px 0px black;
  &.medium {
    font-size: 2rem;
  }
  &.small {
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const Description = styled.p`
  display: block;
  font-size: 1rem;
  line-height: 1.25rem;
  text-shadow: 1px 2px 0px black;
`;

const Button = styled.button`
  display: block;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  margin-top: 2rem;
  background: transparent;
  color: white;
  border: 1px solid transparent;
  border-left-color: white;
  border-bottom-color: white;
  transition: all 0.2s ease-in-out;
  &.alignRight {
    margin-left: auto;
  }
  &:hover {
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-top-color: white;
    border-right-color: white;
  }
`;

const Menu = styled(Link)`
  display: block;
  cursor: pointer;
  color: inherit;
  font-family: ${props => props.theme.fonts.secondary};
  background: transparent;
  border: 0;
  font-size: 3.6rem;
  text-align: center;
  margin: 0 0 3rem;
  text-shadow: 0 0 0 transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    text-shadow: 1rem 1rem 0 rgba(255, 255, 255, 0.1);
  }
`;
const Menu2 = styled(Link)`
  cursor: pointer;
  color: inherit;
  font-family: ${props => props.theme.fonts.secondary};
  background: transparent;
  text-shadow: 0 0 0 transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    text-shadow: 1rem 1rem 0 rgba(255, 255, 255, 0.1);
  }
`;

const PlayerControls = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 4rem);
`;

const Chat = styled.div`
  display: block;
  width: 100%;
  height: 150px;
  overflow-y: auto;
  background: rgba(0,0,0,.5);
  padding: 1rem;
  p {
    line-height: 1.5rem;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.75);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(63, 69, 124, 1);
    outline: 1px solid slategrey;
  }
`;

const PlayerMovement = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 3rem auto;
`;

const MoveBtn = styled.button`
  display: block;
  cursor: pointer;
  width: calc(100% / 3);
  height: calc(100% / 3);
  position: absolute;
  background: rgba(63, 69, 124, 1);
  color: white;
  font-size: 1em;
  &.north,
  &.south {
    left: calc(100% / 3);
  }
  &.west,
  &.east {
    top: calc(100% / 3);
  }
  &.north {
    top: 0;
  }
  &.west {
    left: 0;
  }
  &.east {
    right: 0;
  }
  &.south {
    bottom: 0;
  }
`;

function BackgroundImage(props) {
  return (
    <BGImg style={{ backgroundImage: `url("${props.src}")` }}>
      {props.gradient ? (
        <BGImg
          style={{
            background: `linear-gradient(135deg, rgba(63, 69, 124, .75) 0%, rgba(0, 0, 0, 0) 80%)`
          }}
        />
      ) : null}
    </BGImg>
  );
}

export default {
  Page,
  Title,
  Description,
  Button,
  MoveBtn,
  PlayerMovement,
  PlayerControls,
  Menu,
  Menu2,
  Chat,
  BGImg,
  OverlayContent,
  BackgroundImage
};
