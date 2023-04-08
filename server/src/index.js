const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const loadMap = require("./loadMap");

const SPEED = 5;
const TICK_RATE = 30;
const BULLET_SPEED = 7;
const PLAYER_SIZE = 64;
const TILE_SIZE = 32;

let players = [];
let bullets = [];
const inputsMap = {};
let ground2D, decal2D;

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  );
}

function isCollidingWithMap(player) {
  for (let row = 0; row < decal2D.length; row++) {
    for (let col = 0; col < decal2D[0].length; col++) {
      const tile = decal2D[row][col];

      if (
        tile &&
        isColliding(
          {
            x: player.x,
            y: player.y,
            w: 32,
            h: 32,
          },
          {
            x: col * TILE_SIZE,
            y: row * TILE_SIZE,
            w: TILE_SIZE,
            h: TILE_SIZE,
          }
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

function tick(delta) {
  for (const player of players) {
    const inputs = inputsMap[player.id];
    const previousY = player.y;
    const previousX = player.x;

    if (inputs.up) {
      player.y -= SPEED;
    } else if (inputs.down) {
      player.y += SPEED;
    }

    if (isCollidingWithMap(player)) {
      player.y = previousY;
    }

    if (inputs.left) {
      player.x -= SPEED;
    } else if (inputs.right) {
      player.x += SPEED;
    }

    if (isCollidingWithMap(player)) {
      player.x = previousX;
    }
  }

  for (const bullet of bullets) {
    bullet.x += Math.cos(bullet.angle) * BULLET_SPEED;
    bullet.y += Math.sin(bullet.angle) * BULLET_SPEED;
    bullet.timeLeft -= delta;

    for (const player of players) {
      if (player.id === bullet.playerId) continue;
      const distance = Math.sqrt(
        (player.x + PLAYER_SIZE / 2 - bullet.x) ** 2 +
          (player.y + PLAYER_SIZE / 2 - bullet.y) ** 2
      );
      if (distance <= PLAYER_SIZE / 2) {
        player.x = 0;
        player.y = 0;
        bullet.timeLeft = -1;
        break;
      }
    }
  }
  bullets = bullets.filter((bullet) => bullet.timeLeft > 0);

  io.emit("players", players);
  io.emit("bullets", bullets);
}

async function main() {
  ({ ground2D, decal2D } = await loadMap());

  io.on("connect", (socket) => {
    //console.log("user connected", socket.id);

    inputsMap[socket.id] = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    players.push({
      id: socket.id,
      x: 800,
      y: 800,
    });

    socket.emit("map", {
      ground: ground2D,
      decal: decal2D,
    });

    socket.on("inputs", (inputs) => {
      inputsMap[socket.id] = inputs;
    });

    socket.on("mute", (isMuted) => {
      const player = players.find((player) => player.id === socket.id);
      player.isMuted = isMuted;
    });

    socket.on("voiceId", (voiceId) => {
      const player = players.find((player) => player.id === socket.id);
      player.voiceId = voiceId;
    });

    socket.on("bullet", (angle) => {
      const player = players.find((player) => player.id === socket.id);
      bullets.push({
        angle,
        x: player.x,
        y: player.y,
        timeLeft: 1000,
        playerId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      players = players.filter((player) => player.id !== socket.id);
    });
  });

  //app.use(express.static("public"));
const PORT = 8080;
  httpServer.listen(PORT, () => {
    console.log(`Listening to server on PORT ${PORT}`);
  });

  let lastUpdate = Date.now();
  setInterval(() => {
    const now = Date.now();
    const delta = now - lastUpdate;
    tick(delta);
    lastUpdate = now;
  }, 1000 / TICK_RATE);
}

main();

