import { flightService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class FlightController {
  constructor(service = flightService) {
    this.flightService = service;
  }

  getFlights = async (req, res, next) => {
    try {
      const { data, meta } = await this.flightService.getFlights(req.query);
      const responseData = { flights: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHTS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at FlightController.getFlights: ${error}`);
      next(error);
    }
  };

  getFlight = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const flight = await this.flightService.getFlight(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_FETCHED_SUCCESS,
        data: { flight },
      };
      next();
    } catch (error) {
      log(`Error at FlightController.getFlight: ${error}`);
      next(error);
    }
  };

  createFlight = async (req, res, next) => {
    try {
      const flight = await this.flightService.createFlight(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.FLIGHT_CREATED_SUCCESS,
        data: { flight },
      };
      next();
    } catch (error) {
      log(`Error at FlightController.createFlight: ${error}`);
      next(error);
    }
  };

  updateFlight = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedFlight = await this.flightService.updateFlight(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_UPDATED_SUCCESS,
        data: { flight: updatedFlight },
      };
      next();
    } catch (error) {
      log(`Error at FlightController.updateFlight: ${error}`);
      next(error);
    }
  };

  deleteFlight = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.flightService.deleteFlight(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.FLIGHT_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at FlightController.deleteFlight: ${error}`);
      next(error);
    }
  };
}
