// /src/store/store.ts
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
  users: string[];
  addUser: (email: string) => void;
  removeUser: (email: string) => void;
  setUsers: (emails: string[]) => void;
}

export const useUserStore = create<UserListState>((set) => ({
  users: [],
  addUser: (email) =>
    set((state) => ({
      users: state.users.includes(email)
        ? state.users
        : [...state.users, email],
    })),
  removeUser: (email) =>
    set((state) => ({ users: state.users.filter((u) => u !== email) })),
  setUsers: (emails) => set({ users: [...new Set(emails)] }),
}));
