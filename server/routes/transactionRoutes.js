import express from 'express';
import { createTransaction } from '../controllers/transactionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createTransaction);

export default router;
  