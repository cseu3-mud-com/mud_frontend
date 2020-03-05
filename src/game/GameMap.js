import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pusher from "pusher-js";
import { pusherKey } from "../config";
import Styl from "../styledComponents";
import axios from "../hooks/useAxios";
import useRooms from "../context/rooms";
import useInit from "../context/init";

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
  font-size: 0.75rem;
  text-align: center;
  &.room {
    background-color: white;
  }
  &.player {
    background-color: red;
  }
`;

const pusher = new Pusher(pusherKey, {
  cluster: "us3",
  encrypted: true
});

function GameMap(props) {
  const [initState, initActions] = useInit();
  const [roomState, roomActions] = useRooms();
  const [playerTravel, setPlayerTravel] = useState("");
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  const [sendChat, setSendChat] = useState(false);
  const { gameMap, rooms } = roomState;

  // allow player movement with keyboard arrows
  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      const key = e.which;
      if ([37, 38, 39, 40, 13].includes(key)) e.preventDefault();
      else return;
      console.log("allowed key:", key);
      switch (key) {
        case 37:
          setPlayerTravel("w");
          break;
        case 38:
          setPlayerTravel("n");
          break;
        case 39:
          setPlayerTravel("e");
          break;
        case 40:
          setPlayerTravel("s");
          break;
        case 13:
          setSendChat(true);
          break;
        default:
          break;
      }
      return () => {
        document.removeEventListener("keydown");
      };
    });
  }, []);
  // initialize player data
  useEffect(() => {
    let channel;
    if (!initState.init.uuid) {
      initActions.getInit();
    } else {
      channel = pusher.subscribe(`p-channel-${initState.init.uuid}`);
      channel.bind("broadcast", data => {
        console.log("broadcast data", data);
        setMessages(messages => [...messages, ...data.message.split("\n")]);
      });
    }
    return () => {
      if (channel) channel.unbind("broadcast");
    };
  }, [initState, initActions]);
  // get the map with all rooms
  useEffect(() => {
    if (!roomState.rooms.length > 0) roomActions.getRooms();
  }, [roomState, roomActions]);
  // request player movement
  useEffect(() => {
    if (playerTravel !== "") {
      console.log("playerTravel", playerTravel);
      axios(true)
        .post("api/adv/move/", { direction: playerTravel })
        .then(res => {
          initActions.setRoom(res.data);
          setPlayerTravel("");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTravel]);

  useEffect(() => {
    const chatroom = document.getElementById("chatroom");
    if (chatroom) chatroom.scrollTop = chatroom.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (myMessage !== "") {
      axios(true)
        .post("api/adv/say/", { message: myMessage })
        .then(res => {
          setMessages(messages => [...messages, `You said: ${myMessage}`]);
          setMyMessage("");
          setSendChat(false);
        });
    }
  }, [sendChat]);

  const changePlayerDirection = e => {
    const { value } = e.target;
    setPlayerTravel(value);
  };

  const changeMyMessage = e => {
    const { value } = e.target;
    console.log("my message:", value);
    setMyMessage(value);
  };

  if (gameMap.length > 0 && rooms.length > 0 && initState.init.uuid) {
    return (
      <>
        <Styl.BackgroundImage src="backgrounds/3.jpg" gradient={true} />
        <Styl.OverlayContent className="map">
          <Styl.Title className="medium">
            {initState.init.room.title}
          </Styl.Title>
          <div className="flex twoWide">
            <div className="column">
              <Styl.Description>
                {initState.init.room.description}
              </Styl.Description>
            </div>
            <div className="column">
              <DrawMap>
                {gameMap.map(row =>
                  row.map((cell, i) => (
                    <Cell
                      key={`${row}-${i}`}
                      room={cell}
                      isPlayerRoom={cell === initState.init.room.id}
                    />
                  ))
                )}
              </DrawMap>
            </div>
          </div>
          <Styl.PlayerControls className="flex twoWide">
            <div className="column">
              <Styl.Title className="small">Room Chat</Styl.Title>
              <Styl.Chat id="chatroom">
                {messages.map((message, i) => (
                  <p key={i}>{message}</p>
                ))}
              </Styl.Chat>
              <input type="text" value={myMessage} onChange={changeMyMessage} />
            </div>
            <div className="column">
              <Styl.PlayerMovement>
                <Styl.MoveBtn
                  onClick={changePlayerDirection}
                  value="n"
                  className="north"
                >
                  N
                </Styl.MoveBtn>
                <Styl.MoveBtn
                  onClick={changePlayerDirection}
                  value="w"
                  className="west"
                >
                  W
                </Styl.MoveBtn>
                <Styl.MoveBtn
                  onClick={changePlayerDirection}
                  value="s"
                  className="south"
                >
                  S
                </Styl.MoveBtn>
                <Styl.MoveBtn
                  onClick={changePlayerDirection}
                  value="e"
                  className="east"
                >
                  E
                </Styl.MoveBtn>
              </Styl.PlayerMovement>
            </div>
          </Styl.PlayerControls>
        </Styl.OverlayContent>
      </>
    );
  }
  return (
    <>
      <Styl.BackgroundImage src="backgrounds/3.jpg" gradient={true} />
      <Styl.OverlayContent className="map">
        <Styl.Title>Loading...</Styl.Title>
      </Styl.OverlayContent>
    </>
  );
}

function Cell(props) {
  const { room, isPlayerRoom } = props;
  const classes = ["cell"];
  if (room > 0) {
    classes.push("room");
  }
  if (isPlayerRoom) {
    classes.push("player");
  }
  return <DrawCell className={classes}>{room > 0 ? room : ""}</DrawCell>;
}

export default GameMap;
