// /server/src/index.ts
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

interface User {
  id: string;
  email: string;
  noteId: string;
}

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }),
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const users: { [key: string]: User[] } = {};

io.on('connection', (socket: Socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join-note', ({ user, noteId }) => {
    socket.join(noteId);
    if (!users[noteId]) {
      users[noteId] = [];
    }
    users[noteId].push({ ...user, noteId });
    io.to(noteId).emit('current-users', users[noteId]);
    console.log(users);
  });

  socket.on('send-update', (content: string, noteId: string) => {
    socket.to(noteId).emit('receive-update', content);
  });

  socket.on('leave-note', ({ user, noteId }) => {
    socket.leave(noteId);
    if (users[noteId]) {
      users[noteId] = users[noteId].filter((u) => u.id !== user.id);
      io.to(noteId).emit('current-users', users[noteId]);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    for (const noteId in users) {
      users[noteId] = users[noteId].filter((u) => u.id !== socket.id);
      io.to(noteId).emit('current-users', users[noteId]);
    }
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Socket.IO server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
