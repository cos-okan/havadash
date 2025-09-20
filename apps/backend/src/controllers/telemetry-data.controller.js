import { telemetryDataService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class TelemetryDataController {
  constructor(service = telemetryDataService) {
    this.telemetryDataService = service;
  }

  getTelemetryDataList = async (req, res, next) => {
    try {
      const { data, meta } = await this.telemetryDataService.getTelemetryDataList(req.query);
      const responseData = { telemetryDataList: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.TELEMETRY_DATA_LIST_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at TelemetryDataController.getTelemetryDataList: ${error}`);
      next(error);
    }
  };

  getTelemetryData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const telemetryData = await this.telemetryDataService.getTelemetryData(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.TELEMETRY_DATA_FETCHED_SUCCESS,
        data: { telemetryData },
      };
      next();
    } catch (error) {
      log(`Error at TelemetryDataController.getTelemetryData: ${error}`);
      next(error);
    }
  };

  createTelemetryData = async (req, res, next) => {
    try {
      const telemetryData = await this.telemetryDataService.createTelemetryData(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.TELEMETRY_DATA_CREATED_SUCCESS,
        data: { telemetryData },
      };
      next();
    } catch (error) {
      log(`Error at TelemetryDataController.createTelemetryData: ${error}`);
      next(error);
    }
  };

  updateTelemetryData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedTelemetryData = await this.telemetryDataService.updateTelemetryData(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.TELEMETRY_DATA_UPDATED_SUCCESS,
        data: { telemetryData: updatedTelemetryData },
      };
      next();
    } catch (error) {
      log(`Error at TelemetryDataController.updateTelemetryData: ${error}`);
      next(error);
    }
  };

  deleteTelemetryData = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.telemetryDataService.deleteTelemetryData(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.TELEMETRY_DATA_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at TelemetryDataController.deleteTelemetryData: ${error}`);
      next(error);
    }
  };
}
