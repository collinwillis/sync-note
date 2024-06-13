import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

interface User {
  id: string;
  name: string;
}

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const users: User[] = [];

io.on('connection', (socket: Socket) => {
  console.log('a user connected:', socket.id);

  socket.on('send-update', (content: string) => {
    socket.broadcast.emit('receive-update', content);
  });

  socket.on('user-joined', (user: User) => {
    users.push(user);
    io.emit('user-joined', user);
  });

  socket.on('user-left', (user: User) => {
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users.splice(index, 1);
    }
    io.emit('user-left', user);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Socket.IO server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
