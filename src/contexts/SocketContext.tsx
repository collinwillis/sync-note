// src/contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useContentStore, useUserStore } from '../store/store';

// Create a context for the socket
const SocketContext = createContext<Socket | null>(null);

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

// SocketProvider component
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const setContent = useContentStore((state) => state.setContent);
  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO client
    const socket = io('http://localhost:4000');
    socketRef.current = socket;

    // Setup socket event listeners
    socket.on('receive-update', setContent);
    socket.on('user-joined', addUser);
    socket.on('user-left', removeUser);

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [setContent, addUser, removeUser]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
