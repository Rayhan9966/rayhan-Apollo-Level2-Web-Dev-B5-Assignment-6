import express from "express";
import { authenticate } from "../../middlewares/authMiddleware";
import { authorize } from "../../middlewares/roleMiddleware";
import { addMoney, withdrawMoney, sendMoney } from "./wallet.controller";

const router = express.Router();

router.post("/add", authenticate, authorize(["user"]), addMoney);
router.post("/withdraw", authenticate, authorize(["user"]), withdrawMoney);
router.post("/send", authenticate, authorize(["user"]), sendMoney);
router.post("/cash-in", authenticate, authorize(["agent"]), cashIn);
router.post("/cash-out", authenticate, authorize(["agent"]), cashOut);
router.get("/commission-history", authenticate, authorize(["agent"]), getAgentCommissions);


export default router;
