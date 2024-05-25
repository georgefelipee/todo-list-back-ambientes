import User from '../models/UserModel.js';

const createUser = (body) => User.create(body);
const findBName = (name) => User.find({username:name})

export default { createUser,findBName };