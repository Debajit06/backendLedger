import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "username is require"],
  },
  email: {
    type: String,
    require: [true, "email is requied"],
    unique: true,
    lowerCase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email address",
    ],
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [6, "password should contain more than 6 character"],
    select: false,
  },
  systemUser: {
    type: Boolean,
    default: false,
    immutable: true,
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
