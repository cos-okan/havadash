import { orderService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class OrderController {
  constructor(service = orderService) {
    this.orderService = service;
  }

  getOrders = async (req, res, next) => {
    try {
      const { data, meta } = await this.orderService.getOrders(req.query);
      const responseData = { orders: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ORDERS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at OrderController.getOrders: ${error}`);
      next(error);
    }
  };

  getOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const order = await this.orderService.getOrder(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ORDER_FETCHED_SUCCESS,
        data: { order },
      };
      next();
    } catch (error) {
      log(`Error at OrderController.getOrder: ${error}`);
      next(error);
    }
  };

  createOrder = async (req, res, next) => {
    try {
      const order = await this.orderService.createOrder(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.ORDER_CREATED_SUCCESS,
        data: { order },
      };
      next();
    } catch (error) {
      log(`Error at OrderController.createOrder: ${error}`);
      next(error);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedOrder = await this.orderService.updateOrder(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ORDER_UPDATED_SUCCESS,
        data: { order: updatedOrder },
      };
      next();
    } catch (error) {
      log(`Error at OrderController.updateOrder: ${error}`);
      next(error);
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.orderService.deleteOrder(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ORDER_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at OrderController.deleteOrder: ${error}`);
      next(error);
    }
  };
}
