import http from "http";
import app from "./src/app.js";
import { Server } from "socket.io";
import MqttService from "./src/services/mqtt.service.js";
import config from "./config/app.config.js";

const { port: PORT, name: SERVICE_NAME } = config.SERVICE;

// HTTP Server
const server = http.createServer(app);

// Websocket Server
const io = new Server(server, {
  cors: { origin: "*" },
});

const mqttService = new MqttService();

mqttService.on("telemetry", ({ droneCode, payload }) => {
  io.emit("telemetry", { droneCode, payload });
});

io.on("connection", (socket) => {
  console.log("WebSocket client bağlandı");

  socket.on("command", async ({ droneCode, payload }) => {
    console.log("WS command received:", { droneCode, payload });

    await mqttService.publishDroneCommand(droneCode, payload);

    console.log("Drone command saved to DB and published to MQTT");
  });
  
  socket.on("disconnect", () => {
    console.log("WebSocket client ayrıldı");
  });
});

server.listen(PORT, () => {
  console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});