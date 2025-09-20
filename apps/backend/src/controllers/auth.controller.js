import * as authService from "../services/auth.service.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, token, expiresIn } = await authService.login(email, password);

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
        token: token,
        expiresIn: expiresIn
      },
    }

    next();
  } catch (err) {
    log('Error at AuthController.login: ${err}');
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const result = await authService.logout(req.user);
    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.LOGOUT_SUCCESS,
      data: {
        result: result,
      },
    };
    next();
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await authService.getMe(req.user);
    res.payload = {
      status: RESPONSE_STATUS.SUCCESS,
      statusCode: HTTP_STATUS.OK,
      message: MESSAGES.USER_FETCHED_SUCCESS,
      data: {
        user: user,
      },
    };
    next();
  } catch (err) {
    log('Error at AuthController.me: ${err}');
    next(err);
  }
}
