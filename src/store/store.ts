import { create } from 'zustand';
import { User } from '../models/User';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

interface ContentState {
  content: string;
  setContent: (content: string) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  content: '',
  setContent: (content) => set({ content }),
}));

interface UserListState {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (email: string) => void;
  setUsers: (users: User[]) => void;
}

export const useUserStore = create<UserListState>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: state.users.some((u) => u.email === user.email)
        ? state.users
        : [...state.users, user],
    })),
  removeUser: (email) =>
    set((state) => ({ users: state.users.filter((u) => u.email !== email) })),
  setUsers: (users) => set({ users }),
}));
