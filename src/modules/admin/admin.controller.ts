import { Transaction } from "../transaction/transaction.model";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";


export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

export const getAllAgents = async (_req: Request, res: Response) => {
  const agents = await User.find({ role: "agent" }).select("-password");
  res.json(agents);
};

export const getAllWallets = async (_req: Request, res: Response) => {
  const wallets = await Wallet.find().populate("userId", "email role");
  res.json(wallets);
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  const txs = await Transaction.find()
    .populate("from", "email")
    .populate("to", "email")
    .populate("createdBy", "email role")
    .sort({ createdAt: -1 });
  res.json(txs);
};
