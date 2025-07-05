const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
// Teacher Model
const teacherScehma = new mongoose.Schema(
  {
    username: {
      unique: true,
      required: [true, "Provide a unique username"],
      type: String,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    profile: {
      photo: {
        type: String,
        default: "",
      },
      age: {
        type: Number,
        min: 18,
      },
      mobileNo: {
        type: String,
        required: [true, "Number is required"],
      },
      address: {
        type: String,
        default: "Christ University Bengaluru",
      },
      previousExperience: String,
      researchInterests: [String],
      publications: [String],
    },
  },
  {
    timestamps: true,
  }
);

teacherScehma.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next;
  this.passwordHash = await bcryptjs.hash(this.passwordHash, 10);
  return next;
});

const Teachers =
  mongoose.teacherModel || mongoose.model("Teachers", teacherScehma);
export default Teachers;
