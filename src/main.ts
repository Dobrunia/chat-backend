import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const db = { messages: [] as string[] };
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  },
}); //in case server and client run on different urls

io.on('connection', (socket) => {
  console.log('client connected: ', socket.id);
  socket.join('clock-room');
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});
server.listen(PORT, () => {
  console.log('Server running on Port ', PORT);
});
// setInterval(() => {
//   io.to('clock-room').emit('hehe', new Date());
// }, 1000);
app.post('/messages', (req, res) => {
  console.log(req);
  const { message } = req.body;
  db.messages.push(message);
  io.to('clock-room').emit('message', message);
  // res.json({ data: new Date() });
});