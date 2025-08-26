import mongoose from "mongoose";

export type TUserRole = "user" | "agent" | "admin";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "agent", "admin"], default: "user" },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
