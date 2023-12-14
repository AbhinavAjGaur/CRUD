import { Schema, model } from "mongoose";
import { isEmail } from "validator";
import { hashSync } from "bcryptjs";

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Enter email is invaild.."],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = hashSync(this.password, 10);
  next();
});

export const Users = model("User", UserSchema);
