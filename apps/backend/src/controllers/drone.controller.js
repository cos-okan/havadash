import { droneService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class DroneController {
  constructor(service = droneService) {
    this.droneService = service;
  }

  getDrones = async (req, res, next) => {
    try {
      const { data, meta } = await this.droneService.getDrones(req.query);
      const responseData = { drones: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONES_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at DroneController.getDrones: ${error}`);
      next(error);
    }
  };

  getDrone = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const drone = await this.droneService.getDrone(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_FETCHED_SUCCESS,
        data: { drone },
      };
      next();
    } catch (error) {
      log(`Error at DroneController.getDrone: ${error}`);
      next(error);
    }
  };

  createDrone = async (req, res, next) => {
    try {
      const drone = await this.droneService.createDrone(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.DRONE_CREATED_SUCCESS,
        data: { drone },
      };
      next();
    } catch (error) {
      log(`Error at DroneController.createDrone: ${error}`);
      next(error);
    }
  };

  updateDrone = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedDrone = await this.droneService.updateDrone(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_UPDATED_SUCCESS,
        data: { drone: updatedDrone },
      };
      next();
    } catch (error) {
      log(`Error at DroneController.updateDrone: ${error}`);
      next(error);
    }
  };

  deleteDrone = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.droneService.deleteDrone(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at DroneController.deleteDrone: ${error}`);
      next(error);
    }
  };
}
