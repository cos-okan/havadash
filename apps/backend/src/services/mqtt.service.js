import mqtt from "mqtt";
import config from "../../config/app.config.js";
import { log } from '../utils/logger.js';
import { EventEmitter } from "events";
import { telemetryDataRepository, droneCommandRepository, droneRepository, flightRepository } from "../repositories/index.js";
import { CommandStateEnum, FlightStateEnum, USERS } from "@havadash/utils";

const { mosquitto } = config.INFRA;

let instance = null;

export default class MqttService extends EventEmitter {
  constructor() {
    super();
    if (instance) return instance;
    instance = this;

    this.brokerUrl = `mqtt://${mosquitto.host}:${mosquitto.port}`;
    this.client = null;
    this.connect();

    return instance;
  }

  connect() {
    this.client = mqtt.connect(this.brokerUrl, {
      clientId: "havadash-backend",
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on("connect", () => {
      log("MQTT connected");
      this.subscribe(mosquitto.telemetry_topic);
    });

    this.client.on("message", async (topic, message) => {
      try {
        await this.handleMessage(topic, message);
      } catch (err) {
        console.error("Error handling MQTT message:", err);
      }
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

  async handleMessage(topic, message) {
    try {
      const payload = JSON.parse(message.toString());

      const [, droneCode, subtopic] = topic.split("/");

      const drone = await droneRepository.findByCode(droneCode);
      if (!drone) {
        log(`MqttService.handleMessage - Undefined drone : ${droneCode}`);
        return;
      }

      const params = {
        filter: {
          "flights.drone_id": drone.id,
          "flights.state_code": FlightStateEnum.IN_PROGRESS,
        }
      };

      const flights = await flightRepository.findAllWithQuery(params);
      const flight = flights?.[0] || null;

      if (subtopic === "telemetry") {
        const telemetryData = {
          createdBy: USERS.SYSTEM_USER,
          droneId: drone.id,
          flightId: flight ? flight.id : null,
          latitude: payload.latitude,
          longitude: payload.longitude,
          altitude: payload.altitude,
          speed: payload.speed,
          batteryLevel: payload.batteryLevel,
          timestamp: new Date().toISOString(),
        }
        await telemetryDataRepository.create(telemetryData);
        this.emit("telemetry", { droneCode, telemetryData });
        log(`Telemetry processed from ${topic}`);
      } 
      else if (subtopic === "alarm") {
        // TODO: To be implemented
      }

    } catch (err) {
      console.error("Invalid message:", err.message);
    }
  }

  async publishDroneCommand(droneCode, payload) {
    const drone = await droneRepository.findByCode(droneCode);
    if (!drone) {
      log(`MqttService.handleMessage - Undefined drone : ${droneCode}`);
      return;
    }

    const commandData = {
      createdBy: USERS.SYSTEM_USER,
      droneId: drone.id,
      typeCode: payload.typeCode,
      stateCode: CommandStateEnum.PENDING,
      timestamp: new Date().toISOString(),
      params: payload.params
    }
    const newCommandData = await droneCommandRepository.create(commandData);

    const topic = mosquitto.drone_command_topic.replace("droneCode", droneCode);
    this.publish(topic, payload);

    const updateCommandData = {
      updatedBy: USERS.SYSTEM_USER,
      stateCode: CommandStateEnum.SENT
    };
    droneCommandRepository.update(newCommandData.id, updateCommandData);
  }

  publish(topic, payload, options = { qos: 1, retain: true }) {
    const message = typeof payload === "string" ? payload : JSON.stringify(payload);
    this.client.publish(topic, message, options, (err) => {
      if (err) {
        console.error("Publish error:", err);
      } else {
        log(`Message sent to ${topic}: ${message}`);
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end(() => log("MQTT disconnected"));
    }
  }
}
