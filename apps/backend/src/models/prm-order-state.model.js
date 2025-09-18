import PrmBaseModel from "./prm-base.model.js";
import { OrderStateEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmOrderState extends PrmBaseModel {
  static get tableName() {
    return 'prm_order_states';
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
        { code: OrderStateEnum.PENDING, valueType: PrmValueTypeEnum.STRING, value: 'Pending', description: 'Pending', order: 10 },
        { code: OrderStateEnum.IN_PROGRESS, valueType: PrmValueTypeEnum.STRING, value: 'In Progress', description: 'In Progress', order: 20 },
        { code: OrderStateEnum.DELIVERED, valueType: PrmValueTypeEnum.STRING, value: 'Delivered', description: 'Delivered', order: 30 },
        { code: OrderStateEnum.CANCELLED, valueType: PrmValueTypeEnum.STRING, value: 'Cancelled', description: 'Cancelled', order: 40 },
        { code: OrderStateEnum.FAILED, valueType: PrmValueTypeEnum.STRING, value: 'Failed', description: 'Failed', order: 50 },
      ];

      await this.query().insert(defaultOrderStates);
      console.log('Default order states seeded.');
    }
  }
}

export default PrmOrderState;
