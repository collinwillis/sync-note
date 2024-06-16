import { createContext, useContext, ReactNode, useEffect } from 'react';
import { socket } from '../socket';
import { useUserStore } from '../store/store';
import { User } from '../models/User';

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    socket.on('user-joined', (user: User) => {
      console.log('User joined (SocketContext):', user);
      addUser(user.email);
    });
    socket.on('user-left', (user: User) => {
      console.log('User left (SocketContext):', user);
      removeUser(user.email);
    });

    return () => {
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, [addUser, removeUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
