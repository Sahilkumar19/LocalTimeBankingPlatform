import express from 'express';
import { exchangeServices } from '../controllers/exchangeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, exchangeServices);

export default router;
