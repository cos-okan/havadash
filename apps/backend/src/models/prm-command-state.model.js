import PrmBaseModel from "./prm-base.model.js";
import { CommandStateEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmCommandState extends PrmBaseModel {
  static get tableName() {
    return 'prm_command_states';
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
      const defaultCommandStates = [
        { code: CommandStateEnum.PENDING, valueType: PrmValueTypeEnum.STRING, value: 'Pending', description: 'Pending', order: 10 },
        { code: CommandStateEnum.SENT, valueType: PrmValueTypeEnum.STRING, value: 'Sent', description: 'Sent', order: 20 },
        { code: CommandStateEnum.EXECUTED, valueType: PrmValueTypeEnum.STRING, value: 'Executed', description: 'Executed', order: 30 },
        { code: CommandStateEnum.FAILED, valueType: PrmValueTypeEnum.STRING, value: 'Failed', description: 'Failed', order: 40 },
      ];

      await this.query().insert(defaultCommandStates);
      console.log('Default command states seeded.');
    }
  }
}

export default PrmCommandState;
