import { createStore } from "./create.store";

export type NavLink = {
  href: string; // "/products#item1"
};

type NavState = {
  activeLink: string;
  setActiveLink: (href: string) => void;
};

export const useNavStore = createStore<NavState>(
  (set) => ({
    activeLink: "/", // default active = home
    setActiveLink: (href) =>
      set(
        { activeLink: href },
        false,
      ),
  }),
  "NavStore" 
);
