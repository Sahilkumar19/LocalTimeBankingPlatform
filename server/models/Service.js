import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  credits: Number,
  userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model('Service', serviceSchema);