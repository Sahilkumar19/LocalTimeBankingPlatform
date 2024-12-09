import express from 'express';
import { getServices, createService } from '../controllers/serviceController.js';
import { auth } from '../middleware/auth.js';
import Service from '../models/Service.js'; // Adjust the path as needed


const router = express.Router();

// Route to get a service by ID
router.get('/:id', async (req, res) => {
  const serviceId = req.params.id;
  try {
    // Fetch the service with the matching ID
    const service = await Service.findById(serviceId); // Adjust this based on your ORM (e.g., Mongoose, Sequelize)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service); // Send the full service data back
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
});

// Route to get all services
router.get('/', getServices);

// Route to add a new service (protected by authentication)
router.post('/add', auth, createService);

export default router;
