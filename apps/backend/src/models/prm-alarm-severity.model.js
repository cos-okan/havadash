import PrmBaseModel from "./prm-base.model.js";
import { AlarmSeverityEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmAlarmSeverity extends PrmBaseModel {
  static get tableName() {
    return 'prm_alarm_severities';
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
      const defaultAlarmSeverities = [
        { code: AlarmSeverityEnum.INFO, valueType: PrmValueTypeEnum.STRING, value: 'Low Battery', description: 'Low Battery', order: 10 },
        { code: AlarmSeverityEnum.WARNING, valueType: PrmValueTypeEnum.STRING, value: 'GPS Lost', description: 'GPS Lost', order: 20 },
        { code: AlarmSeverityEnum.CRITICAL, valueType: PrmValueTypeEnum.STRING, value: 'Motor Failure', description: 'Motor Failure', order: 30 },
      ];

      await this.query().insert(defaultAlarmSeverities);
      console.log('Default alarm severities seeded.');
    }
  }
}

export default PrmAlarmSeverity;
