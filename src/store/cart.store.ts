import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (id, quantity) => set((state) => {
        // Guard against bad inputs
        if (!id && id !== 0) {
            console.error("Invalid ID added to cart");
            return { items: state.items };
        }
        
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            ),
          };
        }
        return { items: [...state.items, { id, quantity }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
      })),

      clearCart: () => set({ items: [] }),

      getCartCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.quantity || 0), 0);
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), // Explicitly use localStorage
      skipHydration: true, // Helps with Next.js hydration mismatches
    }
  )
);