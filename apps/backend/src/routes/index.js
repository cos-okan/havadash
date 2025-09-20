import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import CustomerRoutes from "./customer.route.js";
import MqttRoutes from "./mqtt.routes.js";
import DroneRoutes from "./drone.routes.js";

const mqttRoutes = new MqttRoutes();
const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();
const customerRoutes = new CustomerRoutes();
const droneRoutes = new DroneRoutes();

export {
  mqttRoutes,
  authRoutes,
  userRoutes,
  customerRoutes,
  droneRoutes
};
