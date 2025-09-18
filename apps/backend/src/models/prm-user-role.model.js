import PrmBaseModel from "./prm-base.model.js";
import { RoleEnum, PrmValueTypeEnum } from "@havadash/utils";

class PrmUserRole extends PrmBaseModel {
  static get tableName() {
    return 'prm_user_roles';
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
      const defaultRoles = [
        { code: RoleEnum.SYSTEM, valueType: PrmValueTypeEnum.STRING, value: 'SYSTEM', description: 'System role', order: 10 },
        { code: RoleEnum.ADMIN, valueType: PrmValueTypeEnum.STRING, value: 'ADMIN', description: 'Administrator role', order: 20 },
      ];

      await this.query().insert(defaultRoles);
      console.log('Default roles seeded.');
    }
  }
}

export default PrmUserRole;
