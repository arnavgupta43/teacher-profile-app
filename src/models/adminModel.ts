import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
const adminSchema = new mongoose.Schema(
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

adminSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcryptjs.hash(this.passwordHash, 12);
  next();
});

adminSchema.methods.matchPassword = function (enteredpassword: any) {
  return bcryptjs.compare(enteredpassword, this.passwordHash);
};

adminSchema.methods.createJWT = function () {
  return jwt.sign(
    { username: this.username, role: "admin", _id: this._id },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};
adminSchema.methods.getName = function () {
  return this.username;
};

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
