import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId,  // Service being requested
  fromUserId: mongoose.Schema.Types.ObjectId,  // Requester (Customer)
  toUserId: mongoose.Schema.Types.ObjectId,    // Provider (Service Owner)
  credits: Number,  // Amount of credits being transferred
  timestamp: { type: Date, default: Date.now }  // When the transaction happened
});

export default mongoose.model('Transaction', transactionSchema);
