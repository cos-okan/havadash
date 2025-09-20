import { prmService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class PrmController {
  constructor(service = prmService) {
    this.prmService = service;
  }

  getPrms = async (req, res, next) => {
    try {
      const result = await this.prmService.getPrms(req.query);
      const responseData = { prms: result };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.PRMS_FETCHED_SUCCESS,
        data: responseData
      };
      next();
    } catch (error) {
      log(`Error at PrmController.getPrms: ${error}`);
      next(error);
    }
  };
}
