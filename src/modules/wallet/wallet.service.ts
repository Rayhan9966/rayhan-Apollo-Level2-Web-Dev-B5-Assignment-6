import { Wallet } from "./wallet.model";

export const createWallet = async (userId: string) => {
  return await Wallet.create({ userId, balance: 50 });
};
