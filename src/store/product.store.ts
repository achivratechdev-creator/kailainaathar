import { createStore } from "./create.store"
import { Product, RelatedProduct } from "@/types/product"
import { products } from "@/lib/products"

interface ProductState {
  product: Product | null
  loading: boolean
  error: string | null
  fetchProductById: (id: number) => Promise<void>
}

export const useProductStore = createStore<ProductState>((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProductById: async (id: number) => {
     try {
      set({ loading: true, error: null })

      // 🔹 Mock API (replace later)
      await new Promise((r) => setTimeout(r, 300))

      const product: Product = {
        id,
        name: "Neelibringadi Kera Thailam",
        image: "https://images.unsplash.com/photo-1662058595162-10e024b1a907",
        price: 450,
        mrp: 585,
        rating: 4.8,
        reviews: 250,
        categoryLabel: "Herbal Oils",
        description:
          "A classical Siddha oil formulation that promotes hair growth and scalp nourishment.",
        benefits: [
          "Strengthens hair follicles",
          "Improves hair texture",
          "Reduces dandruff",
          "Cooling effect on head",
        ],
        ingredients: [
          "Neeli",
          "Bhringaraj",
          "Coconut Oil",
          "Amla",
          "Curry Leaves",
        ],
        relatedProducts: [
          {
            id: 2,
            name: "Kumkumadi Thailam",
            image:
              "https://images.unsplash.com/photo-1662058595162-10e024b1a907",
            price: 580,
            mrp: 754,
            rating: 4.6,
          },
          {
            id: 3,
            name: "Bhringamalakadi Oil",
            image:
              "https://images.unsplash.com/photo-1662058595162-10e024b1a907",
            price: 399,
            mrp: 520,
            rating: 4.5,
          },
        ],
      }

      set({ product, loading: false })
    } catch {
      set({ loading: false, error: "Failed to load product" })
    }

    // set({ loading: true })

    // // 🔹 Mock API (replace with real API later)
    
    // await new Promise((r) => setTimeout(r, 300)) 

    // const mockProduct: Product = {
    //   id,
    //   name: "Neelibringadi Kera Thailam",
    //   image:
    //     "https://images.unsplash.com/photo-1662058595162-10e024b1a907",
    //   price: 450,
    //   mrp: 585,
    //   rating: 4.8,
    //   reviews: 250,
    //   categoryLabel: "Herbal Oils",
    //   description:
    //     "Neelibringadi Kera Thailam is a classical Siddha oil formulation that promotes hair growth, prevents premature greying, and nourishes the scalp.",
    //   benefits: [
    //     "Strengthens hair follicles",
    //     "Improves hair texture",
    //     "Reduces dandruff",
    //     "Cooling effect on head",
    //   ],
    //   ingredients: [
    //     "Neeli (Indigofera tinctoria)",
    //     "Bhringaraj (Eclipta alba)",
    //     "Coconut Oil",
    //     "Amla (Phyllanthus emblica)",
    //     "Curry Leaves",
    //   ],
    //   relatedProducts: [
    //     {
    //       id: '1',
    //       name: "Neelibringadi Kera Thailam",
    //       image:
    //         "https://images.unsplash.com/photo-1662058595162-10e024b1a907",
    //       price: 450,
    //       mrp: 585,
    //       rating: 4.8,
    //     }
    //   ],
    // }

    // set({ product: mockProduct, loading: false })

  },
}),"ProductStore")
