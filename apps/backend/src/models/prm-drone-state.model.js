import PrmBaseModel from "./prm-base.model.js";
import { DroneStateEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmDroneState extends PrmBaseModel {
  static get tableName() {
    return 'prm_drone_states';
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

  static get relationMappings() {}

  static async seedDefaults(knex) {
    this.knex(knex);
    const countResult = await this.query().count('code as cnt').first();
    const count = parseInt(countResult.cnt, 10);

    if (count === 0) {
      const defaultOrderStates = [
        { code: DroneStateEnum.IDLE, valueType: PrmValueTypeEnum.STRING, value: 'Idle', description: 'Idle', order: 10 },
        { code: DroneStateEnum.FLYING, valueType: PrmValueTypeEnum.STRING, value: 'Flying', description: 'Flying', order: 20 },
        { code: DroneStateEnum.CHARGING, valueType: PrmValueTypeEnum.STRING, value: 'Charging', description: 'Charging', order: 30 },
        { code: DroneStateEnum.MAINTENANCE, valueType: PrmValueTypeEnum.STRING, value: 'Maintenance', description: 'Maintenance', order: 40 },
      ];

      await this.query().insert(defaultOrderStates);
      console.log('Default drone states seeded.');
    }
  }
}

export default PrmDroneState;
