import './db/db.js';
import "./services/mqtt.service.js";
import "./jobs/heartbeat.job.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import express from 'express';
import config from '../config/app.config.js';

import authMiddleware from './middlewares/auth.middleware.js';
import errorMiddleware from "./middlewares/error.middleware.js";
import responseMiddleware from "./middlewares/response.middleware.js";

import { 
  mqttRoutes, 
  authRoutes, 
  userRoutes, 
  customerRoutes, 
  droneRoutes, 
  orderRoutes, 
  countryRoutes,
  cityRoutes,
  addressRoutes
} from './routes/index.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, '../docs/swagger/api-docs.yml'), 'utf8'));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'Swagger - Havadash Backend Service',
  }),
);

app.use(`${config.SERVICE.endpoint_prefix}/mqtt`, mqttRoutes.getRouter());

app.use(authMiddleware);

app.use(`${config.SERVICE.endpoint_prefix}/auth`, authRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/users`, userRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/customers`, customerRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/drones`, droneRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/orders`, orderRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/countries`, countryRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/cities`, cityRoutes.getRouter());
app.use(`${config.SERVICE.endpoint_prefix}/addresses`, addressRoutes.getRouter());

app.use(errorMiddleware);
app.use(responseMiddleware);

export default app;