const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const userDataSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userDataSchema.plugin(mongoose_delete);

module.exports = mongoose.model("UserData", userDataSchema);
