import { customerService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class CustomerController {
  constructor(service = customerService) {
    this.customerService = service;
  }

  getCustomers = async (req, res, next) => {
    try {
      const { data, meta } = await this.customerService.getCustomers(req.query);
      const responseData = { customers: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMERS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at CustomerController.getCustomers: ${error}`);
      next(error);
    }
  };

  getCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const customer = await this.customerService.getCustomer(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_FETCHED_SUCCESS,
        data: { customer },
      };
      next();
    } catch (error) {
      log(`Error at CustomerController.getCustomer: ${error}`);
      next(error);
    }
  };

  createCustomer = async (req, res, next) => {
    try {
      const customer = await this.customerService.createCustomer(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.CUSTOMER_CREATED_SUCCESS,
        data: { customer },
      };
      next();
    } catch (error) {
      log(`Error at CustomerController.createCustomer: ${error}`);
      next(error);
    }
  };

  updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCustomer = await this.customerService.updateCustomer(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_UPDATED_SUCCESS,
        data: { customer: updatedCustomer },
      };
      next();
    } catch (error) {
      log(`Error at CustomerController.updateCustomer: ${error}`);
      next(error);
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.customerService.deleteCustomer(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at CustomerController.deleteCustomer: ${error}`);
      next(error);
    }
  };
}
