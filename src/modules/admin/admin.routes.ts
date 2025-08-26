import express from 'express';
import { adminController } from './admin.controller';
import { auth } from '../../middlewares/auth';


const router = express.Router();

router.get('/users', auth('admin'), adminController.getAllUsers);
router.get('/agents', auth('admin'), adminController.getAllAgents);
router.get('/wallets', auth('admin'), adminController.getAllWallets);
router.get('/transactions', auth('admin'), adminController.getAllTransactions);

router.patch('/wallets/block/:id', auth('admin'), adminController.blockWallet);
router.patch('/wallets/unblock/:id', auth('admin'), adminController.unblockWallet);

router.patch('/agents/approve/:id', auth('admin'), adminController.approveAgent);
router.patch('/agents/suspend/:id', auth('admin'), adminController.suspendAgent);

export const adminRoutes = router;
