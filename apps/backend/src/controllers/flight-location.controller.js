import { flightLocationService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class FlightLocationController {
  constructor(service = flightLocationService) {
    this.flightLocationService = service;
  }

  getFlightLocations = async (req, res, next) => {
    try {
      const { data, meta } = await this.flightLocationService.getFlightLocations(req.query);
      const responseData = { flightLocations: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_LOCATIONS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at FlightLocationController.getFlightLocations: ${error}`);
      next(error);
    }
  };

  getFlightLocation = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const flightLocation = await this.flightLocationService.getFlightLocation(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_LOCATION_FETCHED_SUCCESS,
        data: { flightLocation },
      };
      next();
    } catch (error) {
      log(`Error at FlightLocationController.getFlightLocation: ${error}`);
      next(error);
    }
  };

  createFlightLocation = async (req, res, next) => {
    try {
      const flightLocation = await this.flightLocationService.createFlightLocation(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.FLIGHT_LOCATION_CREATED_SUCCESS,
        data: { flightLocation },
      };
      next();
    } catch (error) {
      log(`Error at FlightLocationController.createFlightLocation: ${error}`);
      next(error);
    }
  };

  updateFlightLocation = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedFlightLocation = await this.flightLocationService.updateFlightLocation(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_LOCATION_UPDATED_SUCCESS,
        data: { flightLocation: updatedFlightLocation },
      };
      next();
    } catch (error) {
      log(`Error at FlightLocationController.updateFlightLocation: ${error}`);
      next(error);
    }
  };

  deleteFlightLocation = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.flightLocationService.deleteFlightLocation(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_LOCATION_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at FlightLocationController.deleteFlightLocation: ${error}`);
      next(error);
    }
  };
}
