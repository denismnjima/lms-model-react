// store/userStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {}, // Start with null to avoid undefined states
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
