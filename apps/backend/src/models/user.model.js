import BaseModel from "./base.model.js";

class User extends BaseModel {
  static get tableName() {
    return "users"; // tablo adı
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password"],
      properties: {
        id: { type: "integer" },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        status: { type: "integer", default: 1 },
        createdBy: { type: "integer" },
        updatedBy: { type: ["integer", "null"] },
        createdAt: { type: "string" },
        updatedAt: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      // Örn: Bir User’ın birden fazla postu olabilir
      // posts: {
      //   relation: Model.HasManyRelation,
      //   modelClass: Post,
      //   join: {
      //     from: "users.id",
      //     to: "posts.userId",
      //   },
      // },
    };
  }
}

export default User;
