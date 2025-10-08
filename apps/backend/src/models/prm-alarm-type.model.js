import PrmBaseModel from "./prm-base.model.js";
import { AlarmTypeEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmAlarmType extends PrmBaseModel {
  static get tableName() {
    return 'prm_alarm_types';
  }

  static get idColumn() {
    return 'code';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required],
      properties: {
        ...super.jsonSchema.properties,
      },
    };
  }

  static async seedDefaults(knex) {
    this.knex(knex);
    const countResult = await this.query().count('code as cnt').first();
    const count = parseInt(countResult.cnt, 10);

    if (count === 0) {
      const defaultAlarmTypes = [
        { code: AlarmTypeEnum.LOW_BATTERY, valueType: PrmValueTypeEnum.STRING, value: 'Low Battery', description: 'Low Battery', order: 10 },
        { code: AlarmTypeEnum.GPS_LOST, valueType: PrmValueTypeEnum.STRING, value: 'GPS Lost', description: 'GPS Lost', order: 20 },
        { code: AlarmTypeEnum.MOTOR_FAILURE, valueType: PrmValueTypeEnum.STRING, value: 'Motor Failure', description: 'Motor Failure', order: 30 },
        { code: AlarmTypeEnum.OBSTACLE_DETECTED, valueType: PrmValueTypeEnum.STRING, value: 'Obstacle Detected', description: 'Obstacle Detected', order: 40 },
        { code: AlarmTypeEnum.UKNOWN_FAILURE, valueType: PrmValueTypeEnum.STRING, value: 'Unknown Failure', description: 'Unknown Failure', order: 50 },
      ];

      await this.query().insert(defaultAlarmTypes);
      console.log('Default alarm types seeded.');
    }
  }
}

export default PrmAlarmType;
