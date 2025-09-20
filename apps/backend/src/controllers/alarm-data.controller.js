import { alarmDataService } from "../services/index.js";
import { log } from '../utils/logger.js';
import { RESPONSE_STATUS, HTTP_STATUS, MESSAGES } from "@havadash/utils";

export default class AlarmDataController {
  constructor(service = alarmDataService) {
    this.alarmDataService = service;
  }

  getAlarmDataList = async (req, res, next) => {
    try {
      const { data, meta } = await this.alarmDataService.getAlarmDataList(req.query);
      const responseData = { alarmDataList: Array.from(data.results) };

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ALARM_DATA_LIST_FETCHED_SUCCESS,
        data: responseData,
        meta,
      };
      next();
    } catch (error) {
      log(`Error at AlarmDataController.getAlarmDataList: ${error}`);
      next(error);
    }
  };

  getAlarmData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { include } = req.query;
      const options = { include: include ? include.split(',') : [] };

      const alarmData = await this.alarmDataService.getAlarmData(id, options);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ALARM_DATA_FETCHED_SUCCESS,
        data: { alarmData },
      };
      next();
    } catch (error) {
      log(`Error at AlarmDataController.getAlarmData: ${error}`);
      next(error);
    }
  };

  createAlarmData = async (req, res, next) => {
    try {
      const alarmData = await this.alarmDataService.createAlarmData(req.body);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.ALARM_DATA_CREATED_SUCCESS,
        data: { alarmData },
      };
      next();
    } catch (error) {
      log(`Error at AlarmDataController.createAlarmData: ${error}`);
      next(error);
    }
  };

  updateAlarmData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedAlarmData = await this.alarmDataService.updateAlarmData(id, updateData);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ALARM_DATA_UPDATED_SUCCESS,
        data: { alarmData: updatedAlarmData },
      };
      next();
    } catch (error) {
      log(`Error at AlarmDataController.updateAlarmData: ${error}`);
      next(error);
    }
  };

  deleteAlarmData = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.alarmDataService.deleteAlarmData(id);

      res.payload = {
        status: RESPONSE_STATUS.SUCCESS,
        statusCode: HTTP_STATUS.OK,
        message: MESSAGES.ALARM_DATA_DELETED_SUCCESS,
        data: null,
      };
      next();
    } catch (error) {
      log(`Error at AlarmDataController.deleteAlarmData: ${error}`);
      next(error);
    }
  };
}
