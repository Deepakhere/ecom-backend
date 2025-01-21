import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Update lastLogin timestamp before saving
userAuthSchema.pre("save", function (next) {
  this.lastLogin = new Date();
  next();
});

const UserAuthModel = mongoose.model("User-google-auth-schema", userAuthSchema);

export default UserAuthModel;
