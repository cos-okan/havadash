import BaseRepository from "./base.repository.js";

export default class CountryRepository extends BaseRepository {
  constructor(Country) {
    super(Country);
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

  async findByName(name, include = []) {
    let query = this.model.query()
      .where("name", name)
      .first();

    if (include.length > 0) {
      query = query.withGraphFetched(`[${include.join(",")}]`);
    }

    return query;
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
