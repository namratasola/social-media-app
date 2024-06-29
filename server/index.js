import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/Route.js';
import SocketHandler from './SocketHandler.js';

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('', authRoutes);
app.route('/auth')
  .get((req, res) => {
    // Handle GET request
    res.status(405).send("GET method not allowed for this endpoint");
  });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Pass io to SocketHandler
  SocketHandler(socket, io);
});

// mongoose setup
const PORT = 6001;

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Running @ ${PORT}`);
    });
  })
  .catch((e) => console.log(`Error in db connection ${e}`));

export default io;

