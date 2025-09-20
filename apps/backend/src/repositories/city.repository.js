import BaseRepository from "./base.repository.js";

export default class CityRepository extends BaseRepository {
  constructor(City) {
    super(City);
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

  async findByCountryId(countryId, include = []) {
    let query = this.model.query()
      .where("countryId", countryId)
      .first();

    if (include.length > 0) {
      query = query.withGraphFetched(`[${include.join(",")}]`);
    }

    return query;
  }

  async findByName(name) {
    let query = this.model.query()
      .where("name", name)
      .first();

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

  async findByUniqueFieldsApartFromId({ name }, id) {
    if (!name) {
      return undefined;
    }
    return this.model
      .query()
      .where('id', '!=', id)
      .andWhere((builder) => {
        if (name) builder.orWhere('name', name);
      })
      .first();
  }
}
