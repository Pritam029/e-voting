import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    voterId: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    voteStatus: {type: Boolean,default: false},
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
