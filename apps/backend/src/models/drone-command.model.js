import BaseModel from "./base.model.js";
import { Model } from "objection";

class DroneCommand extends BaseModel {
  static get tableName() {
    return "drone_commands";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'typeCode', 'stateCode', 'sentTime', 'params'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        typeCode: { type: 'integer' },
        stateCode: { type: 'integer' },
        sentTime: { type: 'string', format: 'date-time' },
        params: { type: 'object'}
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      drone: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./drone.model.js").then((m) => m.default),
        join: {
          from: "drone_commands.drone_id",
          to: "drones.id",
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-command-type.model.js").then((m) => m.default),
        join: {
          from: "drone_commands.type_code",
          to: "prm_command_types.code",
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-command-state.model.js").then((m) => m.default),
        join: {
          from: "drone_commands.state_code",
          to: "prm_command_states.code",
        },
      },
    }));
  }

}

export default DroneCommand;
