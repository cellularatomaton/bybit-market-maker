import { io } from 'socket.io-client';

const createWebSocketConnection = (url, onMessageCallback) => {
  const socketIo = io(url);
  socketIo.on('open', (socket) => {
    console.dir('WebSocket Event "open"');
    console.dir(`Socket ID: ${socket.id}`);
  });

  socketIo.on('connection', (socket) => {
    console.dir('WebSocket Event: "connection"');
    console.dir(`Socket ID: ${socket.id}`);
  });

  socketIo.on("connect_error", () => {
    console.log(`WebSocket Event: "connection_error"`);
    setTimeout(() => {
      console.log("Reconnecting...");
      ws.connect();
    }, 1000);
  });

  socketIo.on("disconnect", () => {
    console.log(`WebSocket Event: "disconnect"`);
  });

  socketIo.on("data", (data) => {
    console.log(`WebSocket Event: "data"`);
    console.dir(data);
    onMessageCallback(data);
  });

  socketIo.on("message", (data) => {
    console.log(`WebSocket Event: "data"`);
    console.dir(data);
    onMessageCallback(data);
  });

  socketIo.on("ping", () => {
    console.log(`WebSocket Event: "ping"`);
  });

  socketIo.on("pong", () => {
    console.log(`WebSocket Event: "pong"`);
  });

  return socketIo;
};

export default createWebSocketConnection;
