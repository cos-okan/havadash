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

  async findById(id, include = []) {
    let query = this.model.query().findById(id);

    if (include && include.length > 0) {
      query = query.withGraphFetched(`[${include.join(',')}]`);
    }

    return query;
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

  async findByUniqueFieldsApartFromId({ email }, id) {
    if (!email) {
      return undefined;
    }
    return this.model
      .query()
      .where('id', '!=', id)
      .andWhere((builder) => {
        if (email) builder.orWhere('email', email);
      })
      .first();
  }
}
