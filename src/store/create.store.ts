import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type Mutators = [["zustand/devtools", never]] | [];

export const createStore = <T>(
  initializer: StateCreator<T, [], any>,
  name: string
) =>
  create<T>()(
    devtools(initializer as StateCreator<T>, {
      name,
    })
  );
