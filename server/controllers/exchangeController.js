import Service from '../models/Service.js';
import Transaction from '../models/Transaction.js';
import User from '../models/user.js';

export const exchangeServices = async (req, res) => {
  try {
    const { serviceId, targetServiceId } = req.body;

    // Fetch both services
    const service = await Service.findById(serviceId);
    const targetService = await Service.findById(targetServiceId);

    if (!service || !targetService) {
      return res.status(404).send({ error: 'One or both services not found' });
    }

    if (service.userId.equals(targetService.userId)) {
      return res.status(400).send({ error: 'Cannot exchange services with yourself' });
    }

    // Fetch users
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(targetService.userId);

    if (!user || !targetUser) {
      return res.status(404).send({ error: 'One or both users not found' });
    }

    // Check if user has enough credits
    if (user.credits < targetService.credits) {
      return res.status(400).send({ error: 'Insufficient credits' });
    }

    // Perform the exchange
    await User.findByIdAndUpdate(req.user.id, { $inc: { credits: -targetService.credits } });
    await User.findByIdAndUpdate(targetService.userId, { $inc: { credits: targetService.credits } });

    // Swap ownership
    await Service.findByIdAndUpdate(serviceId, { userId: targetService.userId });
    await Service.findByIdAndUpdate(targetServiceId, { userId: req.user.id });

    // Log the transaction
    const transaction = new Transaction({
      serviceId: targetServiceId,
      fromUserId: req.user.id,
      toUserId: targetService.userId,
      credits: targetService.credits,
    });
    await transaction.save();

    res.status(200).send({ message: 'Exchange successful', transaction });
  } catch (e) {
    res.status(500).send({ error: 'Exchange failed', details: e.message });
  }
};
