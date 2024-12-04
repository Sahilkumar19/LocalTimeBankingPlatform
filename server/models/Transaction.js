import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId,
  fromUserId: mongoose.Schema.Types.ObjectId,
  toUserId: mongoose.Schema.Types.ObjectId,
  credits: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);