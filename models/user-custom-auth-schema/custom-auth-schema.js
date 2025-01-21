import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserModel = mongoose.model("User-custom-auth-schema", UserSchema);
export default UserModel;
