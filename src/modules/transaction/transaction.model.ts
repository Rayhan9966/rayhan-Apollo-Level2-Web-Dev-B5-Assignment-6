import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    enum: ["add", "withdraw", "send", "cash-in", "cash-out"],
    required: true,
  },
  amount: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  status: { type: String, enum: ["completed", "pending", "reversed"], default: "completed" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, 

{ timestamps: true });
 // new field


export const Transaction = mongoose.model("Transaction", transactionSchema);
