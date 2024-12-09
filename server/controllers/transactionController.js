import Transaction from '../models/Transaction.js';
import User from '../models/user.js';
import Service from '../models/Service.js';

export const createTransaction = async (req, res) => {
  try {
    const { serviceId, credits } = req.body;
    
    // Get the service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).send({ error: 'Service not found' });
    }

    // Check if the requester has enough credits
    const requester = await User.findById(req.user.id);
    if (requester.credits < credits) {
      return res.status(400).send({ error: 'Insufficient credits' });
    }

    // Deduct credits from the requester and add to the provider
    await User.findByIdAndUpdate(req.user.id, { $inc: { credits: -credits } });
    await User.findByIdAndUpdate(service.userId, { $inc: { credits: credits } });

    // Create a new transaction record
    const transaction = new Transaction({
      serviceId,
      fromUserId: req.user.id,        // The requester
      toUserId: service.userId,       // The service provider
      credits
    });

    await transaction.save();
    
    res.status(201).send({ transaction, message: 'Service exchanged successfully' });
  } catch (e) {
    res.status(400).send({ error: e.message || 'Error processing transaction' });
  }
};
