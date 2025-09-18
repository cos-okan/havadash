export default class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async findAll() {
    return this.User.query();
  }

  async findById(id) {
    return this.User.query().findById(id);
  }

  async findByEmail(email) {
    return this.User.query().where("email", email).first();
  }

  async create(data) {
    return this.User.query().insert(data);
  }

  async update(id, data) {
    return this.User.query().patchAndFetchById(id, data);
  }

  async delete(id) {
    return this.User.query().deleteById(id);
  }
}
