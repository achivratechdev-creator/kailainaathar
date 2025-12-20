import { createStore } from "./create.store";

type AppointmentState = {
  name: string;
  phone: string;
  date: string;
  setField: (key: "name" | "phone" | "date", value: string) => void;
  reset: () => void;
};

export const useAppointmentStore = createStore<AppointmentState>((set) => ({
  name: "",
  phone: "",
  date: "",
  setField: (key, value) => set({ [key]: value } as any),
  reset: () => set({ name: "", phone: "", date: "" }),
}),"AppointmentStore");
