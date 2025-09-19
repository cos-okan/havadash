import cron from "node-cron";
import { publishMessage } from "../services/mqtt.service.js";

cron.schedule("*/10 * * * * *", () => {
  publishMessage("havadash/system/heartbeat", JSON.stringify({
    alive: true,
    ts: Date.now(),
  }));
});
