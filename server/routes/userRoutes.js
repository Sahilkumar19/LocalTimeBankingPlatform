import express from 'express';
import { register, login, getUser } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route to get the current logged-in user's data (newly added /me endpoint)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await req.user; // The `auth` middleware already populates `req.user`.
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Route to fetch any user by ID
router.get('/:id', auth, getUser);

export default router;
