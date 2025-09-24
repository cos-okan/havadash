import { io } from "socket.io-client";

// -------- CONFIG --------
const WS_SERVER = "http://localhost:3000";
const DRONE_CODE = "FUDMJXTK";

// -------- WebSocket Client --------
const socket = io(WS_SERVER);

socket.on("connect", () => {
  console.log("WebSocket connected");
  setInterval(sendCommand, 10000);
});

socket.on("telemetry", (data) => {
  console.log("Telemetry received:", data);
});

function sendCommand() {
  socket.emit("command", 
    { droneCode: DRONE_CODE, 
      payload: 
      { 
        typeCode: Math.floor(Math.random() * 5) + 1,
        params : {}
      } 
    });
  console.log("Test command sent via WebSocket");
}

socket.on("connect_error", (err) => console.error("WS connect_error:", err));
