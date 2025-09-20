import { authService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class AuthController {
  constructor(service = authService) {
    this.authService = service;
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, token, expiresIn } = await this.authService.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USER_LOGIN_SUCCESS,
        data: {
          userId: user.id,
          email: user.email,
          username: user.username,
          token,
          expiresIn
        },
      };

      next();
    } catch (err) {
      log(`Error at AuthController.login: ${err}`);
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      const result = await this.authService.logout(req.user);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.LOGOUT_SUCCESS,
        data: { result },
      };

      next();
    } catch (err) {
      next(err);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = await this.authService.getMe(req.user);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.USER_FETCHED_SUCCESS,
        data: { user },
      };

      next();
    } catch (err) {
      log(`Error at AuthController.me: ${err}`);
      next(err);
    }
  };
}
