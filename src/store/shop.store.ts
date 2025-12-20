import { create } from "zustand";
import { Product } from "@/types/product";
import { products as mockProducts } from "@/lib/products";

export type Category = "all" | "Herbal Oils" | "Powders" | "Medicines";
export type SortBy = "featured" | "price-asc" | "price-desc";

interface ShopState {
products: Product[];
search: string;
category: Category;
sortBy: SortBy;
setSearch: (value: string) => void;
filteredProducts: () => Product[];
fetchProducts: () => void;
setCategory: (value: Category) => void;
setSortBy: (value: SortBy) => void;
}


export const useShopStore = create<ShopState>((set, get) => ({
products: [],
search: "",
category: "all",
sortBy: "featured",


setSearch: (value) => set({ search: value }),
setCategory: (value) => set({ category: value }),
setSortBy: (value) => set({ sortBy: value }),

fetchProducts: () => {
// Replace with real API later
set({ products: mockProducts });
},

filteredProducts: () => {
const { products, search, category, sortBy } = get();


let result = [...products];


if (search) {
result = result.filter((p) =>
p.name.toLowerCase().includes(search.toLowerCase())
);
}


if (category !== "all") {
result = result.filter((p) => p.categoryLabel === category);
}


if (sortBy === "price-asc") {
result.sort((a, b) => a.price - b.price);
}


if (sortBy === "price-desc") {
result.sort((a, b) => b.price - a.price);
}


return result;
},

}));