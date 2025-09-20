import { userService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class UserController {
  constructor(service = userService) {
    this.userService = service;
  }

  getUsers = async (req, res, next) => {
    try {
      const { data, meta } = await this.userService.getUsers(req.query);
      const responseData = { users: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USERS_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at UserController.getUsers: ${error}`);
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const user = await this.userService.getUser(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USER_FETCHED_SUCCESS,
        data: { user },
      };
      next();
    } catch (error) {
      log(`Error at UserController.getUser: ${error}`);
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.USER_CREATED_SUCCESS,
        data: { user },
      };
      next();
    } catch (error) {
      log(`Error at UserController.createUser: ${error}`);
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await this.userService.updateUser(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USER_UPDATED_SUCCESS,
        data: { user: updatedUser },
      };
      next();
    } catch (error) {
      log(`Error at UserController.updateUser: ${error}`);
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USER_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at UserController.deleteUser: ${error}`);
      next(error);
    }
  };
}
