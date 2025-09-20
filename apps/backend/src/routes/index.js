import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import CustomerRoutes from "./customer.route.js";
import MqttRoutes from "./mqtt.routes.js";

const authRoutes = new AuthRoutes();
const userRoutes = new UserRoutes();
const customerRoutes = new CustomerRoutes();
const mqttRoutes = new MqttRoutes();

export { 
  authRoutes,
  userRoutes,
  customerRoutes,
  mqttRoutes
};
