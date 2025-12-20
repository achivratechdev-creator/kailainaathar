import { create } from "zustand";

export type NavLink = {
  href: string;   // "/products#item1"
};

type NavState = {
  activeLink: string;
  setActiveLink: (href: string) => void;
};

export const useNavStore = create<NavState>((set) => ({
  activeLink: "/",          // default active = home
  setActiveLink: (href) => set({ activeLink: href }),
}));
