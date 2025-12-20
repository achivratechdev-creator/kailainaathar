import { createStore } from "./create.store";

export type CheckoutStep =
  | "cart"
  | "delivery"
  | "payment"
  | "review"
  | "order-confirmed";

export type PaymentMethod = "upi" | "card" | "cod";

interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
}

interface CheckoutState {
  step: CheckoutStep;
  delivery: DeliveryInfo;
  paymentMethod: PaymentMethod;
  setStep: (step: CheckoutStep) => void;
  setDelivery: (data: Partial<DeliveryInfo>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export const useCheckoutStore = createStore<CheckoutState>((set) => ({
  step: "cart",
  delivery: {
    fullName: "",
    phone: "",
    address: "",
    pincode: "",
  },
  paymentMethod: "cod",
  setStep: (step) => set({ step }),
  setDelivery: (data) =>
    set((state) => ({
      delivery: { ...state.delivery, ...data },
    })),

    setPaymentMethod: (method) =>
      set({ paymentMethod: method }),
}),"CheckoutStore");
