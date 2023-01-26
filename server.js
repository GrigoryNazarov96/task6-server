import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';

process.on('uncaughtException', (e) => {
  console.log(e.name, e.message);
  console.log('Uncaught Exception');
  process.exit(1);
});

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose.connect(DB, () => {
  console.log('DB connection successful');
});

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

server.listen(port, () => {
  console.log(`App started at ${port} port`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION', err);
  server.close(() => {
    process.exit(1);
  });
});
