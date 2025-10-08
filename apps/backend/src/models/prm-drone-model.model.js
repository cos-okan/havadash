import PrmBaseModel from "./prm-base.model.js";
import { DroneModelEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmDroneModel extends PrmBaseModel {
  static get tableName() {
    return 'prm_drone_models';
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
      const defaultDroneModels = [
        { code: DroneModelEnum.DJI_PHANTOM_4, valueType: PrmValueTypeEnum.STRING, value: 'DJI Phantom 4', description: 'DJI Phantom 4', order: 10 },
        { code: DroneModelEnum.DJI_MAVIC_AIR_2, valueType: PrmValueTypeEnum.STRING, value: 'DJI Mavic Air 2', description: 'DJI Mavic Air 2', order: 20 },
        { code: DroneModelEnum.DJI_MAVIC_3, valueType: PrmValueTypeEnum.STRING, value: 'DJI Mavic 3', description: 'DJI Mavic 3', order: 30 },
        { code: DroneModelEnum.AUTEL_EVO_2, valueType: PrmValueTypeEnum.STRING, value: 'Autel Evo 2', description: 'Autel Evo 2', order: 40 },
        { code: DroneModelEnum.CUSTOM_MODEL_X, valueType: PrmValueTypeEnum.STRING, value: 'Custom Model X', description: 'Custom Model X', order: 50 },
      ];

      await this.query().insert(defaultDroneModels);
      console.log('Default drone models seeded.');
    }
  }
}

export default PrmDroneModel;
