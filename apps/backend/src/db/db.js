import { Model } from "objection";
import Knex from "knex";
import knexConfig from "./knexfile.js";
import { initRelations } from '../models/init-relations.js'; 

const environment = process.env.NODE_ENV || "development";
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

initRelations();

export default knex;