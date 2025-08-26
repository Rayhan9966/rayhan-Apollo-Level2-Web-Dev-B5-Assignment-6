import express from "express";
import { authenticate } from "../../middlewares/authMiddleware";
import { getMyTransactions } from "./transaction.controller";

const router = express.Router();

router.get("/me", authenticate, getMyTransactions);

export default router;
