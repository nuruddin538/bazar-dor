import "server-only";

import { Category, Product } from "@/types/product";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";
const FALLBACK_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  "use cache";
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: {
        revalidate: 60,
      },
    });
    console.log("API URL:", `${BASE_URL}${endpoint}`);
    console.log("API Status:", response.status);
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
    console.log("Fallback URL:", `${FALLBACK_BASE_URL}${endpoint}`);
    console.log("Fallback Status:", response.status);
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
export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!slug || slug === "undefined") {
    return undefined;
  }
  const products = await getProducts();
  return products.find(
    (product) => product.slug === slug || String(product.id) === slug
  );
}

// All Categories
export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/categories");
}

// single Category
export async function getCategory(slug: string): Promise<Category> {
  return fetchAPI<Category>(`/categories/${encodeURIComponent(slug)}`);
}
