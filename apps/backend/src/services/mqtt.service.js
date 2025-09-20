import mqtt from "mqtt";
import config from "../../config/app.config.js";
import { log } from '../utils/logger.js';

const { mosquitto } = config.INFRA;

export default class MqttService {
  constructor() {
    this.brokerUrl = `mqtt://${mosquitto.host}:${mosquitto.port}`;
    this.client = null;
    this.connect();
  }

  connect() {
    this.client = mqtt.connect(this.brokerUrl, {
      clientId: "backend-" + Math.random().toString(16).substr(2, 8),
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on("connect", () => {
      log("MQTT connected");
      this.subscribe(mosquitto.telemetry_topic);
    });

    this.client.on("message", (topic, message) => {
      this.handleMessage(topic, message);
    });

    this.client.on("error", (err) => {
      console.error("MQTT error:", err);
    });
  }

  subscribe(topic) {
    this.client.subscribe(topic, (err) => {
      if (!err) {
        log(`Subscribed to topic: ${topic}`);
      } else {
        log(`Subscribe error: ${err}`);
      }
    });
  }

  handleMessage(topic, message) {
    const payload = message.toString();
    console.log(`Received on ${topic}: ${payload}`);
    // Burada backend logic’ine yönlendirebilirsin
    // Örneğin: database’e kaydetmek veya event emit etmek
  }

  publish(topic, payload, options = { qos: 1, retain: true }) {
    const message = typeof payload === "string" ? payload : JSON.stringify(payload);
    this.client.publish(topic, message, options, (err) => {
      if (err) {
        console.error("Publish error:", err);
      } else {
        console.log(`Message sent to ${topic}: ${message}`);
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end(() => log("MQTT disconnected"));
    }
  }
}
