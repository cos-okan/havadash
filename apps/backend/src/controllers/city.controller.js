import { cityService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class CityController {
  constructor(service = cityService) {
    this.cityService = service;
  }

  getCities = async (req, res, next) => {
    try {
      const { data, meta } = await this.cityService.getCities(req.query);
      const responseData = { cities: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CITIES_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at CityController.getCities: ${error}`);
      next(error);
    }
  };

  getCity = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const city = await this.cityService.getCity(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CITY_FETCHED_SUCCESS,
        data: { city },
      };
      next();
    } catch (error) {
      log(`Error at CityController.getCity: ${error}`);
      next(error);
    }
  };

  createCity = async (req, res, next) => {
    try {
      const city = await this.cityService.createCity(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.CITY_CREATED_SUCCESS,
        data: { city },
      };
      next();
    } catch (error) {
      log(`Error at CityController.createCity: ${error}`);
      next(error);
    }
  };

  updateCity = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCity = await this.cityService.updateCity(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CITY_UPDATED_SUCCESS,
        data: { city: updatedCity },
      };
      next();
    } catch (error) {
      log(`Error at CityController.updateCity: ${error}`);
      next(error);
    }
  };

  deleteCity = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.cityService.deleteCity(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CITY_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at CityController.deleteCity: ${error}`);
      next(error);
    }
  };
}
