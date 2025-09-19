import mqtt from "mqtt";
import config from "../../config/app.config.js";
import { log } from '../utils/logger.js';

const { mosquitto } = config.INFRA;

// Mosquitto broker adresi (ör: localhost veya docker üzerinden)
// tcp://127.0.0.1:1883  veya ws://localhost:9001 gibi
const brokerUrl = `mqtt://${mosquitto.host}:${mosquitto.port}`; 

const client = mqtt.connect(brokerUrl, {
  clientId: "backend-" + Math.random().toString(16).substr(2, 8),
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  log("MQTT connected");

  const topic = mosquitto.telemetry_topic;

  client.subscribe(topic, (err) => {
    if (!err) {
      log(`Subscribed to topic: ${topic}`);
    } else {
      log(`Subscribe error: ${err}`);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received on ${topic}: ${message.toString()}`);

  // Burada backend logic’ine yönlendirebilirsin
  // örneğin database’e yazmak veya event emit etmek
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

export function publishMessage(topic, payload, options = { qos: 1, retain: true }) {
  const message = typeof payload === "string" ? payload : JSON.stringify(payload);
  client.publish(topic, message, options, (err) => {
    if (err) {
      console.error("Publish error:", err);
    } else {
      console.log(`Message sent to ${topic}: ${message}`);
    }
  });
}

export default client;
