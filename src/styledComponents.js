import React from 'react';
import styled from 'styled-components';

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
  box-shadow: 0 0 10px rgba(255,255,255, .25);
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
`

const BGOverlay = styled.div`
  display: block;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50px;
  max-width: 50%;
  transform: translateY(-50%);
`

const Title = styled.h1`
  display: block;
  font-size: 3rem;
  padding-bottom: 2rem;
`

const Button = styled.button`
  display: block;
  font-size: 1.5rem;
  padding: 1rem;
`

function BackgroundImage(props) {
  return <BGImg style={{ backgroundImage: `url("${props.src}")` }}></BGImg>
}

function OverlayContent(props) {
  return <BGOverlay>{props.children}</BGOverlay>
}

export default {
  Page,
  Title,
  Button,
  BGImg,
  BGOverlay,
  BackgroundImage,
  OverlayContent,
}