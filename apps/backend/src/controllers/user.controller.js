import * as userService from "../services/user.service.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export async function getUsers(req, res, next) {
  try {
    const { data, meta } = await userService.getUsers(req.query);
    const responseData = {};
    responseData.users = Array.from(data.results);

    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.USERS_FETCHED_SUCCESS,
      data: responseData,
      meta: meta,
    };
    next();
  } catch (error) {
    log(`Error at UserController.getUsers: ${error}`);
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const { include } = req.query;

    const options = {
      include: include ? include.split(',') : [],
    };

    const user = await userService.getUser(id, options);

    const responseData = {
      user: user,
    };

    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.USER_FETCHED_SUCCESS,
      data: responseData,
    };
    next();
  } catch (error) {
    log(`Error at UserController.getUser: ${error}`);
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);

    const responseData = {
      user: user,
    };

    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.CREATED,
      message: MESSAGES.USER_CREATED_SUCCESS,
      data: responseData,
    };
    next();
  } catch (error) {
    log(`Error at UserController.createUser: ${error}`);
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedUser = await userService.updateUser(id, updateData);

    const responseData = {
      user: updatedUser,
    };

    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.USER_UPDATED_SUCCESS,
      data: responseData,
    };
    next();
  } catch (error) {
    log(`Error at UserController.updateUser: ${error}`);
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);

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
}