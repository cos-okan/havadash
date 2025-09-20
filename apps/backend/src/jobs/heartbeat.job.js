import cron from "node-cron";
import { publishMessage } from "../services/mqtt.service.js";
import config from "../../config/app.config.js";
import { log } from '../utils/logger.js';
const { mosquitto } = config.INFRA;

const ENABLE_HEARTBEAT = mosquitto.server_hb_on === "true"

if (ENABLE_HEARTBEAT) {
  cron.schedule("*/10 * * * * *", () => {
    publishMessage(mosquitto.server_hb_topic, JSON.stringify({
      alive: true,
      ts: Date.now(),
    }));
  });

  log("Heartbeat cron job scheduled");
} else {
  log("Heartbeat cron job disabled by config");
}