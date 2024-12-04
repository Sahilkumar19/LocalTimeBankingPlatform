// import express from 'express';
// import { createTransaction } from '../controllers/transactionController.js';
// import { auth } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/', auth, createTransaction);

// export default router;
router.get('/me', auth, async (req, res) => {
    try {
      const user = await user.findById(req.user.id);
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.send(user);
    } catch (e) {
      res.status(500).send({ error: 'Server error' });
    }
  });
  