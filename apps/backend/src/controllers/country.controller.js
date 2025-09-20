import { countryService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class CountryController {
  constructor(service = countryService) {
    this.countryService = service;
  }

  getCountries = async (req, res, next) => {
    try {
      const { data, meta } = await this.countryService.getCountries(req.query);
      const responseData = { countries: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.COUNTRIES_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at CountryController.getCountries: ${error}`);
      next(error);
    }
  };

  getCountry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const country = await this.countryService.getCountry(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.COUNTRY_FETCHED_SUCCESS,
        data: { country },
      };
      next();
    } catch (error) {
      log(`Error at CountryController.getCountry: ${error}`);
      next(error);
    }
  };

  createCountry = async (req, res, next) => {
    try {
      const country = await this.countryService.createCountry(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.COUNTRY_CREATED_SUCCESS,
        data: { country },
      };
      next();
    } catch (error) {
      log(`Error at CountryController.createCountry: ${error}`);
      next(error);
    }
  };

  updateCountry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCountry = await this.countryService.updateCountry(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.COUNTRY_UPDATED_SUCCESS,
        data: { country: updatedCountry },
      };
      next();
    } catch (error) {
      log(`Error at CountryController.updateCountry: ${error}`);
      next(error);
    }
  };

  deleteCountry = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.countryService.deleteCountry(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.COUNTRY_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at CountryController.deleteCountry: ${error}`);
      next(error);
    }
  };
}
