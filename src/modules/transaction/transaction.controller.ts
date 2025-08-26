import { Request, Response } from "express";
import { Transaction } from "./transaction.model";

export const getAgentCommissions = async (req: Request, res: Response) => {
  const agentId = (req.user as any).userId;

  const transactions = await Transaction.find({
    createdBy: agentId,
    commission: { $gt: 0 }
  }).sort({ createdAt: -1 });

  res.json({ commissions: transactions });
};


export const getMyTransactions = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;

  const transactions = await Transaction.find({
    $or: [{ from: userId }, { to: userId }],
  }).sort({ createdAt: -1 });

  res.json({ transactions });
};
