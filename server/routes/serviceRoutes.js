import express from 'express';
import { getServices, createService } from '../controllers/serviceController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.post('/add', auth, createService);

export default router;