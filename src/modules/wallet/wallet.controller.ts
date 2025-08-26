import { Request, Response } from "express";
import { Wallet } from "./wallet.model";
import { Transaction } from "../transaction/transaction.model";
import mongoose from "mongoose";

// Add Money (Top-Up)
export const addMoney = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet || wallet.status === "blocked") {
      return res.status(400).json({ message: "Wallet not found or blocked" });
    }

    wallet.balance += amount;
    await wallet.save();

    await Transaction.create([{ type: "add", amount, from: userId, createdBy: userId }], { session });

    await session.commitTransaction();
    res.json({ message: "Money added successfully", balance: wallet.balance });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Top-up failed", error: (err as Error).message });
  } finally {
    session.endSession();
  }
};

// Withdraw
export const withdrawMoney = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet || wallet.status === "blocked" || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds or blocked wallet" });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create([{ type: "withdraw", amount, from: userId, createdBy: userId }], { session });

    await session.commitTransaction();
    res.json({ message: "Withdrawal successful", balance: wallet.balance });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Withdraw failed", error: (err as Error).message });
  } finally {
    session.endSession();
  }
};
//cash in
// export const cashIn = async (req: Request, res: Response) => {
//   const agentId = (req.user as any).userId;
//   const { userEmail, amount } = req.body;

//   if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const userWallet = await Wallet.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       { $match: { "user.email": userEmail } },
//     ]).session(session);

//     if (!userWallet.length) return res.status(404).json({ message: "User not found" });

//     const wallet = await Wallet.findById(userWallet[0]._id).session(session);
//     if (!wallet || wallet.status === "blocked") {
//       return res.status(400).json({ message: "User wallet blocked or not found" });
//     }

//     wallet.balance += amount;
//     await wallet.save();

//     const commission = amount * 0.01;

//     await Transaction.create(
//       [{
//         type: "cash-in",
//         amount,
//         to: wallet.userId,
//         createdBy: agentId,
//         commission,
//       }],
//       { session }
//     );

//     await session.commitTransaction();
//     res.json({ message: "Cash-in successful", amount, commission });
//   } catch (err) {
//     await session.abortTransaction();
//     res.status(500).json({ message: "Cash-in failed", error: (err as Error).message });
//   } finally {
//     session.endSession();
//   }
// };

// //cash out

// export const cashOut = async (req: Request, res: Response) => {
//   const agentId = (req.user as any).userId;
//   const { userEmail, amount } = req.body;

//   if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const userWallet = await Wallet.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       { $match: { "user.email": userEmail } },
//     ]).session(session);

//     if (!userWallet.length) return res.status(404).json({ message: "User not found" });

//     const wallet = await Wallet.findById(userWallet[0]._id).session(session);
//     if (!wallet || wallet.status === "blocked" || wallet.balance < amount) {
//       return res.status(400).json({ message: "Insufficient funds or wallet blocked" });
//     }

//     wallet.balance -= amount;
//     await wallet.save();

//     const commission = amount * 0.01;

//     await Transaction.create(
//       [{
//         type: "cash-out",
//         amount,
//         from: wallet.userId,
//         createdBy: agentId,
//         commission,
//       }],
//       { session }
//     );

//     await session.commitTransaction();
//     res.json({ message: "Cash-out successful", amount, commission });
//   } catch (err) {
//     await session.abortTransaction();
//     res.status(500).json({ message: "Cash-out failed", error: (err as Error).message });
//   } finally {
//     session.endSession();
//   }
// };

// Send Money
export const sendMoney = async (req: Request, res: Response) => {
  const senderId = (req.user as any).userId;
  const { receiverEmail, amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const senderWallet = await Wallet.findOne({ userId: senderId }).session(session);
    if (!senderWallet || senderWallet.status === "blocked" || senderWallet.balance < amount) {
      return res.status(400).json({ message: "Sender wallet blocked or insufficient funds" });
    }

    const receiver = await Wallet.aggregate([
      { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $match: { "user.email": receiverEmail } }
    ]).session(session);

    if (!receiver.length) return res.status(404).json({ message: "Receiver not found" });

    const receiverWallet = await Wallet.findById(receiver[0]._id).session(session);
    if (!receiverWallet || receiverWallet.status === "blocked") {
      return res.status(400).json({ message: "Receiver wallet is blocked" });
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    await Transaction.create([{
      type: "send",
      amount,
      from: senderId,
      to: receiverWallet.userId,
      createdBy: senderId
    }], { session });

    await session.commitTransaction();
    res.json({ message: "Money sent successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Send failed", error: (err as Error).message });
  } finally {
    session.endSession();
  }
};
