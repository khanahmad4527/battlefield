import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import io from "socket.io-client";
import tileset from "../assets/images/tileset.png";
import soldier from "../assets/images/soldier.png";
import speaker from "../assets/images/speaker.png";
import AgoraRTC from "agora-rtc-sdk-ng";
import Chat from "./Chat";

function Game() {
  //define reference for socket and canvas
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const [chat, setChat] = useState([]);

  //useEffect to setup socket to mount and demount
  useEffect(() => {
    socketRef.current = io.connect("ws://localhost:8080");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    //create a canvas
    const canvasEl = canvasRef.current;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    const canvas = canvasEl.getContext("2d");

    //load images
    const mapImage = new Image();
    mapImage.src = tileset;

    const soldierImage = new Image();
    soldierImage.src = soldier;

    const speakerImage = new Image();
    speakerImage.src = speaker;

    const walk = new Audio("../assets/sounds/walk.mp3");

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    const localTracks = {
      audioTrack: null,
    };

    let isPlaying = true;

    const remoteUsers = {};
    window.remoteUsers = remoteUsers;

    const muteButton = document.getElementById("mute");
    const uid = Math.floor(Math.random() * 1000000);

    muteButton.addEventListener("click", () => {
      if (isPlaying) {
        localTracks.audioTrack.setEnabled(false);
        muteButton.innerText = "unmute";
        socketRef.current.emit("mute", false);
      } else {
        localTracks.audioTrack.setEnabled(true);
        muteButton.innerText = "mute";
        socketRef.current.emit("mute", false);
      }
      isPlaying = !isPlaying;
    });

    const options = {
      appid: "eee1672fa7ef4b83bc7810da003a07bb",
      channel: "game",
      uid,
      token: null,
    };

    async function subscribe(user, mediaType) {
      await client.subscribe(user, mediaType);
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    }

    function handleUserPublished(user, mediaType) {
      const id = user.uid;
      remoteUsers[id] = user;
      subscribe(user, mediaType);
    }

    function handleUserUnpublished(user) {
      const id = user.uid;
      delete remoteUsers[id];
    }

    async function join() {
      socketRef.current.emit("voiceId", uid);

      client.on("user-published", handleUserPublished);
      client.on("user-unpublished", handleUserUnpublished);

      await client.join(
        options.appid,
        options.channel,
        options.token || null,
        uid
      );
      localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      await client.publish(Object.values(localTracks));
    }

    join();

    let groundMap = [[]];
    let decalMap = [[]];
    let players = [];
    let bullets = [];

    const TILE_SIZE = 32;
    const BULLET_RADIUS = 3;

    //socket to send response to backend
    socketRef.current.on("connect", () => {
      console.log("connected");
    });

    socketRef.current.on("map", (loadedMap) => {
      groundMap = loadedMap.ground;
      decalMap = loadedMap.decal;
    });

    socketRef.current.on("players", (serverPlayers) => {
      players = serverPlayers;
    });

    socketRef.current.on("bullets", (serverBullets) => {
      bullets = serverBullets;
    });
    socketRef.current.on("msg", (msg) => {
      setChat([...chat, ...msg]);
    });
    const inputs = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    //key to move the players
    window.addEventListener("keydown", (e) => {
      if (e.key === "w") {
        inputs["up"] = true;
      } else if (e.key === "s") {
        inputs["down"] = true;
      } else if (e.key === "d") {
        inputs["right"] = true;
      } else if (e.key === "a") {
        inputs["left"] = true;
      }
      if (["a", "s", "w", "d"].includes(e.key) && walk.paused) {
        // walk.play();
      }
      socketRef.current.emit("inputs", inputs);
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "w") {
        inputs["up"] = false;
      } else if (e.key === "s") {
        inputs["down"] = false;
      } else if (e.key === "d") {
        inputs["right"] = false;
      } else if (e.key === "a") {
        inputs["left"] = false;
      }
      if (["a", "s", "w", "d"].includes(e.key)) {
        walk.pause();
        walk.currentTime = 0;
      }
      socketRef.current.emit("inputs", inputs);
    });

    window.addEventListener("click", (e) => {
      const angle = Math.atan2(
        e.clientY - canvasEl.height / 2,
        e.clientX - canvasEl.width / 2
      );
      socketRef.current.emit("bullet", angle);
    });

    //this will runs every time if there a change in canvas
    const loop = () => {
      canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);

      const myPlayer = players.find(
        (player) => player.id === socketRef.current.id
      );
      let cameraX = 0;
      let cameraY = 0;
      if (myPlayer) {
        cameraX = parseInt(myPlayer.x - canvasEl.width / 2);
        cameraY = parseInt(myPlayer.y - canvasEl.height / 2);
      }

      const TILES_IN_ROW = 8;

      // ground
      for (let row = 0; row < groundMap.length; row++) {
        for (let col = 0; col < groundMap[0].length; col++) {
          let { id } = groundMap[row][col];
          const imageRow = parseInt(id / TILES_IN_ROW);
          const imageCol = id % TILES_IN_ROW;
          canvas.drawImage(
            mapImage,
            imageCol * TILE_SIZE,
            imageRow * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE,
            col * TILE_SIZE - cameraX,
            row * TILE_SIZE - cameraY,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }

      // decals
      for (let row = 0; row < decalMap.length; row++) {
        for (let col = 0; col < decalMap[0].length; col++) {
          let { id } = decalMap[row][col] ?? { id: undefined };
          const imageRow = parseInt(id / TILES_IN_ROW);
          const imageCol = id % TILES_IN_ROW;

          canvas.drawImage(
            mapImage,
            imageCol * TILE_SIZE,
            imageRow * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE,
            col * TILE_SIZE - cameraX,
            row * TILE_SIZE - cameraY,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }

      for (const player of players) {
        canvas.drawImage(soldierImage, player.x - cameraX, player.y - cameraY);
        if (!player.isMuted) {
          canvas.drawImage(
            speakerImage,
            player.x - cameraX + 5,
            player.y - cameraY - 28
          );
        }

        if (player !== myPlayer) {
          if (
            remoteUsers[player.voiceId] &&
            remoteUsers[player.voiceId].audioTrack
          ) {
            const distance = Math.sqrt(
              (player.x - myPlayer.x) ** 2 + (player.y - myPlayer.y) ** 2
            );
            const ratio = 1.0 - Math.min(distance / 700, 1);
            remoteUsers[player.voiceId].audioTrack.setVolume(
              Math.floor(ratio * 100)
            );
          }
        }
      }

      for (const bullet of bullets) {
        canvas.fillStyle = "#FF0000";
        canvas.beginPath();
        canvas.arc(
          bullet.x - cameraX,
          bullet.y - cameraY,
          BULLET_RADIUS,
          0,
          2 * Math.PI
        );
        canvas.fill();
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }, []);

  const chats = (msg) => {
    setChat((prev) => {
      socketRef.current.emit("chat", [...chat, msg]);
      return [...prev, msg];
    });
  };
  return (
    <div>
      <Box pos={"absolute"}>
        <Button id="mute" bg="teal">
          Mute
        </Button>
      </Box>
      <Chat socket={socketRef} chatFun={chats} chat={chat} />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Game;
