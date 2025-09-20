import { droneCommandService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class DroneCommandController {
  constructor(service = droneCommandService) {
    this.droneCommandService = service;
  }

  getDroneCommands = async (req, res, next) => {
    try {
      const { data, meta } = await this.droneCommandService.getDroneCommands(req.query);
      const responseData = { droneCommands: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_COMMANDS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at DroneCommandController.getDroneCommands: ${error}`);
      next(error);
    }
  };

  getDroneCommand = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const droneCommand = await this.droneCommandService.getDroneCommand(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_COMMAND_FETCHED_SUCCESS,
        data: { droneCommand },
      };
      next();
    } catch (error) {
      log(`Error at DroneCommandController.getDroneCommand: ${error}`);
      next(error);
    }
  };

  createDroneCommand = async (req, res, next) => {
    try {
      const droneCommand = await this.droneCommandService.createDroneCommand(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.DRONE_COMMAND_CREATED_SUCCESS,
        data: { droneCommand },
      };
      next();
    } catch (error) {
      log(`Error at DroneCommandController.createDroneCommand: ${error}`);
      next(error);
    }
  };

  updateDroneCommand = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedDroneCommand = await this.droneCommandService.updateDroneCommand(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_COMMAND_UPDATED_SUCCESS,
        data: { droneCommand: updatedDroneCommand },
      };
      next();
    } catch (error) {
      log(`Error at DroneCommandController.updateDroneCommand: ${error}`);
      next(error);
    }
  };

  deleteDroneCommand = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.droneCommandService.deleteDroneCommand(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.DRONE_COMMAND_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at DroneCommandController.deleteDroneCommand: ${error}`);
      next(error);
    }
  };
}
