import { createStore } from "./create.store";
import { Product } from "@/types/product";
import { useCartStore as useBaseCartStore } from "@/store";

export interface CartItem extends Product {
  quantity: number;
}

interface CartItemsState {
  items: CartItem[];

  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
}

export const useCartItemsStore = createStore<CartItemsState>(
  (set) => ({
    items: [],

    addToCart: (product, quantity) => {
      const baseStore = useBaseCartStore.getState();
      baseStore.addItem(product.id, quantity);

      const baseItems = baseStore.items;

      set({
        items: baseItems.map((item) => ({
          ...product,
          quantity: item.quantity,
        })),
      });
    },

    removeFromCart: (productId) => {
      const baseStore = useBaseCartStore.getState();
      baseStore.removeItem(productId);

      const baseItems = baseStore.items;

      set((state) => ({
        items: state.items.filter((i) =>
          baseItems.some((b) => b.id === i.id)
        ),
      }));
    },

    clearCart: () => {
      useBaseCartStore.getState().clearCart();
      set({ items: [] });
    },

    getCartCount: () => {
      return useBaseCartStore.getState().getCartCount();
    },
  }),
  "CartItemsStore"
);
