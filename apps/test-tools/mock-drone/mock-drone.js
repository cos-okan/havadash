import mqtt from "mqtt";
import { CommandTypeEnum } from "@havadash/utils";

// -------- CONFIG --------
const BROKER_URL = "mqtt://localhost:1883";
const DRONE_CODE = "FUDMJXTK";
const TELEMETRY_TOPIC = `drones/${DRONE_CODE}/telemetry`;
const COMMAND_TOPIC = `drones/${DRONE_CODE}/command`;
const SERVER_HEARTBEATE_TOPIC = "server/heartbeat";

const telemetryData = generateTelemetryArray();

// -------- MQTT Client --------
const client = mqtt.connect(BROKER_URL, {
  clientId: `mock-${DRONE_CODE}`,
});

client.on("connect", () => {
  console.log(`[${DRONE_CODE}] Connected to MQTT broker`);

  // Komutları dinle
  client.subscribe(COMMAND_TOPIC, (err) => {
    if (!err) {
      console.log(`[${DRONE_CODE}] Subscribed to commands on ${COMMAND_TOPIC}`);
    }
  });

  client.subscribe(SERVER_HEARTBEATE_TOPIC, (err) => {
    if (!err) {
      console.log(`[${DRONE_CODE}] Subscribed to commands on ${SERVER_HEARTBEATE_TOPIC}`);
    }
  });

  // Telemetry gönderme döngüsü başlat
  // setInterval(sendTelemetry, 10000);

  sendTelemetrySequentially(telemetryData);
});

client.on("message", (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    if (topic == SERVER_HEARTBEATE_TOPIC) {
      console.log(`Server heartbeat received on ${topic}:`, payload);
    } else {
      console.log(`[${DRONE_CODE}] Command received on ${topic}:`, payload);

      // Mock response: gelen komuta göre davranış simülasyonu
      if (payload.typeCode == CommandTypeEnum.TAKE_OFF) {
        console.log(`[${DRONE_CODE}] Taking off...`);
      } else if (payload.typeCode == CommandTypeEnum.LAND) {
        console.log(`[${DRONE_CODE}] Landing...`);
      } else if (payload.typeCode == CommandTypeEnum.MOVE_TO) {
        console.log(`[${DRONE_CODE}] Moving to coordinates:`, payload.params);
      } else if (payload.typeCode == CommandTypeEnum.HOVER) {
        console.log(`[${DRONE_CODE}] Hover...`);
      } else if (payload.typeCode == CommandTypeEnum.RETURN_TO_BASE) {
        console.log(`[${DRONE_CODE}] Returning to base...`);
      } else {
        console.log(`[${DRONE_CODE}] Unknown command`);
      }
    }
    
  } catch (err) {
    console.error(`[${DRONE_CODE}] Invalid command payload`, err);
  }
});

function sendTelemetry() {
  const telemetry = {
    latitude: 40.0 + Math.random() * 0.01,
    longitude: 29.0 + Math.random() * 0.01,
    altitude: Math.random() * 100,
    speed: (Math.random() * 10).toFixed(2),
    batteryLevel: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  };

  client.publish(TELEMETRY_TOPIC, JSON.stringify(telemetry), { qos: 1 }, (err) => {
    if (err) {
      console.error(`[${DRONE_CODE}] Telemetry publish error:`, err);
    } else {
      console.log(`[${DRONE_CODE}] Telemetry sent:`, telemetry);
    }
  });
}

function generateTelemetryArray() {
  const start = { lat: 36.706790, lon: 28.094005 };
  const firstStop = { lat: 36.73244, lon: 28.104275 };
  const end = { lat: 36.734294, lon: 28.057252 };

  const totalPoints = 20; // telemetry array uzunluğu
  const telemetryArray = [];

  for (let i = 0; i < totalPoints; i++) {
    const t = i / (totalPoints - 1); // 0..1 arası ilerleme

    // latitude ve longitude linear interpolation
    let lat, lon;
    if (t < 0.5) {
      // start -> firstStop
      const localT = t / 0.5;
      lat = start.lat + (firstStop.lat - start.lat) * localT;
      lon = start.lon + (firstStop.lon - start.lon) * localT;
    } else {
      // firstStop -> end
      const localT = (t - 0.5) / 0.5;
      lat = firstStop.lat + (end.lat - firstStop.lat) * localT;
      lon = firstStop.lon + (end.lon - firstStop.lon) * localT;
    }

    // Altitude: 60-100 m arası rastgele
    const altitude = 60 + Math.random() * 40;

    // Speed: 60-90 km/saat
    const speed = parseFloat((60 + Math.random() * 30).toFixed(2));

    // BatteryLevel: 100 -> 80 lineer düşüş
    const batteryLevel = Math.floor(100 - 20 * t);

    telemetryArray.push({
      latitude: lat,
      longitude: lon,
      altitude,
      speed,
      batteryLevel
    });
  }

  return telemetryArray;
}

function sendTelemetrySequentially(dataArray) {
  let index = 0;

  const interval = setInterval(() => {
    if (index >= dataArray.length) {
      clearInterval(interval);
      console.log(`[${DRONE_CODE}] All telemetry messages sent`);
      return;
    }

    const telemetry = dataArray[index];
    client.publish(TELEMETRY_TOPIC, JSON.stringify(telemetry), { qos: 1 }, (err) => {
      if (err) {
        console.error(`[${DRONE_CODE}] Telemetry publish error:`, err);
      } else {
        console.log(`[${DRONE_CODE}] Telemetry sent:`, telemetry);
      }
    });

    index++;
  }, 30000); // 30 saniye aralık
}