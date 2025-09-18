import PrmBaseModel from "./prm-base.model.js";
import { CommandTypeEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmCommandType extends PrmBaseModel {
  static get tableName() {
    return 'prm_command_types';
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
      const defaultCommandTypes = [
        { code: CommandTypeEnum.TAKE_OFF, valueType: PrmValueTypeEnum.STRING, value: 'Take Off', description: 'Take Off', order: 10 },
        { code: CommandTypeEnum.LAND, valueType: PrmValueTypeEnum.STRING, value: 'Land', description: 'Land', order: 20 },
        { code: CommandTypeEnum.MOVE_TO, valueType: PrmValueTypeEnum.STRING, value: 'Move to', description: 'Move to', order: 30 },
        { code: CommandTypeEnum.HOVER, valueType: PrmValueTypeEnum.STRING, value: 'Hover', description: 'Hover', order: 40 },
        { code: CommandTypeEnum.RETURN_TO_BASE, valueType: PrmValueTypeEnum.STRING, value: 'Return to base', description: 'Return to base', order: 50 },
      ];

      await this.query().insert(defaultCommandTypes);
      console.log('Default command types seeded.');
    }
  }
}

export default PrmCommandType;
