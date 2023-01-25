import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: {
    type: String,
    trim: true,
  },
  messageTitle: String,
  messageBody: String,
  sentDate: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
