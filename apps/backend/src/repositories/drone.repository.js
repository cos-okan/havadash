import BaseRepository from "./base.repository.js";

export default class DroneRepository extends BaseRepository{
  constructor(Drone) {
    super(Drone);
  }

  async findAll() {
    return await this.model.query();
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

  async findByCode(code) {
    return this.model.query().where("code", code).first();
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

  async findByUniqueFieldsApartFromId({ code }, id) {
    if (!code) {
      return undefined;
    }
    return this.model
      .query()
      .where('id', '!=', id)
      .andWhere((builder) => {
        if (code) builder.orWhere('code', code);
      })
      .first();
  }
}
