import { Model } from "objection";
import PrmUserRole from "../../models/prm-user-role.model.js";
import PrmOrderState from "../../models/prm-order-state.model.js";
import PrmDroneState from "../../models/prm-drone-state.model.js";
import PrmDroneModel from "../../models/prm-drone-model.model.js";
import PrmFlightState from "../../models/prm-flight-state.model.js";
import PrmAlarmType from "../../models/prm-alarm-type.model.js";
import PrmAlarmSeverity from "../../models/prm-alarm-severity.model.js";
import PrmCommandType from "../../models/prm-command-type.model.js";
import PrmCommandState from "../../models/prm-command-state.model.js";

export async function seed(knex) {
  try {
    Model.knex(knex);
    console.log('Seed operation started...');

    await PrmUserRole.seedDefaults(knex);
    await PrmOrderState.seedDefaults(knex);
    await PrmDroneState.seedDefaults(knex);
    await PrmDroneModel.seedDefaults(knex);
    await PrmFlightState.seedDefaults(knex);
    await PrmAlarmType.seedDefaults(knex);
    await PrmAlarmSeverity.seedDefaults(knex);
    await PrmCommandType.seedDefaults(knex);
    await PrmCommandState.seedDefaults(knex);

    console.log('Seed operation finished...');
  } catch (error) {
    console.error('Error during seed operation:', error);
    throw error;
  }
}