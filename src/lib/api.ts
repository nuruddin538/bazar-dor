import "server-only";

import { Category, Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  "use cache";
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) {
      throw new Error(`Primary API Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn("Primary API failed. Trying fallback API...");
    const response = await fetch(`${FALLBACK_BASE_URL}${endpoint}`, {
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) {
      throw new Error(`Fallback API Error: ${response.status}`);
    }
    return response.json();
  }
}
// ALL Products
export async function getProducts(): Promise<Product[]> {
  return fetchAPI<Product[]>("/products");
}

// Products by Category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return fetchAPI<Product[]>(
    `/products?category=${encodeURIComponent(category)}`
  );
}

// Single Product
export async function getProduct(id: string): Promise<Product> {
  return fetchAPI<Product>(`/products/${id}`);
}

// All Categories
export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/categories");
}

// single Category
export async function getCategory(slug: string): Promise<Category> {
  return fetchAPI<Category>(`/categories/${encodeURIComponent(slug)}`);
}
