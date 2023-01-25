import Message from '../models/messageModel.js';
import { io } from '../server.js';

const sendEvent = (message) => {
  io.emit(`messageTo${message.recipient}`, message);
  console.log('sent');
};

export const getMessages = async (req, res) => {
  try {
    const recipient = req.params.name;
    const messages = await Message.find({ recipient, isDeleted: false }).sort({
      sentDate: -1,
    });
    res.status(200).json({
      status: 'success',
      data: {
        messages,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error('Provide a name', 404);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const recipient = req.body.recipient;
    const sender = req.body.sender;
    const message = await Message.create({
      recipient,
      sender,
      messageTitle: req.body.messageTitle,
      messageBody: req.body.messageBody,
    });
    sendEvent(message);
    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
    // TODO emit socket event here
    // io.emit('new message', message);
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.body._id, {
      isDeleted: true,
    });
    res.status(204).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
