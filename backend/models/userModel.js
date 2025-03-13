import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  avatar: {
    type: String,
    default: "https://api.dicebear.com/7.x/avataaars/svg",
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for faster querying
userSchema.index({ name: 1 });
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });
userSchema.index({ createdAt: 1 });

const User = mongoose.model("User", userSchema);

export default User;
