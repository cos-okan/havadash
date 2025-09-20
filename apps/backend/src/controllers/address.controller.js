import { addressService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class AddressController {
  constructor(service = addressService) {
    this.addressService = service;
  }

  getAddresses = async (req, res, next) => {
    try {
      const { data, meta } = await this.addressService.getAddresses(req.query);
      const responseData = { addresses: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESSES_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at AddressController.getAddresses: ${error}`);
      next(error);
    }
  };

  getAddress = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const address = await this.addressService.getAddress(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS_FETCHED_SUCCESS,
        data: { address },
      };
      next();
    } catch (error) {
      log(`Error at AddressController.getAddress: ${error}`);
      next(error);
    }
  };

  createAddress = async (req, res, next) => {
    try {
      const address = await this.addressService.createAddress(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.ADDRESS_CREATED_SUCCESS,
        data: { address },
      };
      next();
    } catch (error) {
      log(`Error at AddressController.createAddress: ${error}`);
      next(error);
    }
  };

  updateAddress = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedAddress = await this.addressService.updateAddress(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS_UPDATED_SUCCESS,
        data: { address: updatedAddress },
      };
      next();
    } catch (error) {
      log(`Error at AddressController.updateAddress: ${error}`);
      next(error);
    }
  };

  deleteAddress = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.addressService.deleteAddress(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at AddressController.deleteAddress: ${error}`);
      next(error);
    }
  };
}
