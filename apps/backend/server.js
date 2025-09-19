import app from "./src/app.js";
import config from "./config/app.config.js";

const { port: PORT, name: SERVICE_NAME } = config.SERVICE;

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});