import BaseModel from "./base.model.js";
import { Model } from "objection";

class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'email', 'username', 'passwordHash', 'roleCode'],
      properties: {
        ...super.jsonSchema.properties,
        email: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        passwordHash: { type: 'string', minLength: 1, maxLength: 255 },
        roleCode: { type: 'integer' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-user-role.model.js").then((m) => m.default),
        join: {
          from: "users.role_code",
          to: "prm_user_roles.code",
        },
      },
    }));
  }

}

export default User;
