import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

router
  .route('/')
  .post(messageController.sendMessage)
  .patch(messageController.deleteMessage);

router.get('/:name', messageController.getMessages);
export default router;
