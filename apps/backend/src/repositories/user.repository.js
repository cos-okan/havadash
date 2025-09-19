import BaseRepository from "./base.repository.js";

export default class UserRepository extends BaseRepository {
  constructor(User) {
    super(User);
  }

  async findAll() {
    return this.model.query();
  }

  async findAllWithQuery(params, options) {
    return this.buildQuery(params, options);
  }

  async findById(id) {
    return this.model.query().findById(id);
  }

  async findByEmail(email) {
    return this.model.query().where("email", email).first();
  }

  async findByUsername(username) {
    return this.model.query().where("username", username).first();
  }

  async create(data) {
    return this.model.query().insert(data);
  }

  async update(id, data) {
    return this.model.query().patchAndFetchById(id, data);
  }

  async delete(id) {
    return this.model.query().deleteById(id);
  }
}
