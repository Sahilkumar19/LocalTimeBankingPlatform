import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  credits: { type: Number, default: 10 }
});

export default mongoose.model('User', userSchema);