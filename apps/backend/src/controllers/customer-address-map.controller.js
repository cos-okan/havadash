import { customerAddressMapService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class CustomerAddressMapController {
  constructor(service = customerAddressMapService) {
    this.customerAddressMapService = service;
  }

  getCustomerAddressMaps = async (req, res, next) => {
    try {
      const { data, meta } = await this.customerAddressMapService.getCustomerAddressMaps(req.query);
      const responseData = { customerAddressMaps: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_ADDRESS_MAPS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at CustomerAddressMapController.getCustomerAddressMaps: ${error}`);
      next(error);
    }
  };

  getCustomerAddressMap = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const customerAddressMap = await this.customerAddressMapService.getCustomerAddressMap(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_ADDRESS_MAP_FETCHED_SUCCESS,
        data: { customerAddressMap },
      };
      next();
    } catch (error) {
      log(`Error at CustomerAddressMapController.getCustomerAddressMap: ${error}`);
      next(error);
    }
  };

  createCustomerAddressMap = async (req, res, next) => {
    try {
      const customerAddressMap = await this.customerAddressMapService.createCustomerAddressMap(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.CUSTOMER_ADDRESS_MAP_CREATED_SUCCESS,
        data: { customerAddressMap },
      };
      next();
    } catch (error) {
      log(`Error at CustomerAddressMapController.createCustomerAddressMap: ${error}`);
      next(error);
    }
  };

  updateCustomerAddressMap = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCustomerAddressMap = await this.customerAddressMapService.updateCustomerAddressMap(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_ADDRESS_MAP_UPDATED_SUCCESS,
        data: { customerAddressMap: updatedCustomerAddressMap },
      };
      next();
    } catch (error) {
      log(`Error at CustomerAddressMapController.updateCustomerAddressMap: ${error}`);
      next(error);
    }
  };

  deleteCustomerAddressMap = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.customerAddressMapService.deleteCustomerAddressMap(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.CUSTOMER_ADDRESS_MAP_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at CustomerAddressMapController.deleteCustomerAddressMap: ${error}`);
      next(error);
    }
  };
}
