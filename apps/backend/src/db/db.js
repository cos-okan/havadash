import { Model } from "objection";
import Knex from "knex";
import knexConfig from "../../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

export default knex;