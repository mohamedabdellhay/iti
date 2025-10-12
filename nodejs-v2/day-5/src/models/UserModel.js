import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});
const UserModel = model("User", userSchema);
export default UserModel;
