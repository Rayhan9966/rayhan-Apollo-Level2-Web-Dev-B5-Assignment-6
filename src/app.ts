import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./modules/wallet/wallet.routes";
import transactionRoutes from "./modules/transaction/transaction.routes";
import { connectDB } from "./config/db";
import authRoutes from "./modules/auth/auth.routes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);

// TODO: Add routes

export default app;
