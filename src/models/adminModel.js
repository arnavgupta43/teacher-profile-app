const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
//Admin Model
const adminModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username should be unique"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

adminModel.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next;
  this.passwordHash = await bcryptjs.hash(this.passwordHash, 12);
  next();
});
