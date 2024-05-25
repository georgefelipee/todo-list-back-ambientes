import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const user = mongoose.model("Users", UserSchema);

export default user;