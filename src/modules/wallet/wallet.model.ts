import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 50 },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
}, { timestamps: true });

export const Wallet = mongoose.model("Wallet", walletSchema);
