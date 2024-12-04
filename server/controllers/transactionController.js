import Transaction from '../models/Transaction.js';
import user from '../models/user.js';

export const createTransaction = async (req, res) => {
  try {
    const { serviceId, toUserId, credits } = req.body;
    const transaction = new Transaction({
      serviceId,
      fromUserId: req.user.id,
      toUserId,
      credits
    });
    await transaction.save();
    
    await user.findByIdAndUpdate(req.user.id, { $inc: { credits: -credits } });
    await user.findByIdAndUpdate(toUserId, { $inc: { credits: credits } });
    
    res.status(201).send(transaction);
  } catch (e) {
    res.status(400).send(e);
  }
};