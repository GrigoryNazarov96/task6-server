import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoutes);

export default app;
