import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: Omit<Product, "_id">,
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (
    productID: string,
  ) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    productId: string,
    updatedProduct: Omit<Product, "_id">,
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || newProduct.price == null)
      return { success: false, message: "Please fill all of the fields" };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    console.log(res);
    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created succesfully!" };
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (productID: string) => {
    const res = await fetch(`/api/products/${productID}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== productID),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (
    productID: string,
    updatedProduct: { name: string; price: number; image: string },
  ) => {
    const res = await fetch(`/api/products/${productID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    console.log(data);
    if (!data.success) return { success: false, message: data.message };
    else {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productID ? data.data : product,
        ),
      }));
      return { success: true, message: "Successfully updated the product" };
    }
  },
}));
