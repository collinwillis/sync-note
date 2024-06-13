import { create } from 'zustand';

interface UserState {
  users: string[];
  addUser: (user: string) => void;
  removeUser: (user: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (user) =>
    set((state) => ({ users: state.users.filter((u) => u !== user) })),
}));

interface ContentState {
  content: string;
  setContent: (content: string) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  content: '',
  setContent: (content) => set({ content }),
}));
