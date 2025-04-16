// userService.js
import User from '../models/UserModel.js';

class UserService {
  createUser(body) {
    return User.create(body);
  }

  findBName(name) {
    return User.find({ username: name });
  }

  findBId(id) {
    return User.findById(id);
  }

  findAllUsers() {
    return User.find();
  }

  deleteUser(id) {
    return User.findByIdAndDelete(id);
  }
}

export default new UserService();
