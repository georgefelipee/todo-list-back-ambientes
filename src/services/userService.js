import User from '../models/UserModel.js';

const createUser = (body) => User.create(body);
const findBName = (name) => User.find({username:name})
const findBId = (id) => User.findById(id);
const findAllUsers = () => User.find();
export default { createUser,findBName,findBId,findAllUsers };