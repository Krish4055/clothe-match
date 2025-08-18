import { apiFetch } from './utils';

export interface ApiProduct {
  _id: string;
  name: string;
  category: 'Men' | 'Women' | 'Accessories';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  inStock: boolean;
  brand?: string;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
}

export async function fetchProducts(params: { page?: number; limit?: number; category?: string; q?: string } = {}) {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.category && params.category !== 'all') search.set('category', params.category);
  if (params.q) search.set('q', params.q);
  const qs = search.toString();
  return apiFetch<PagedResponse<ApiProduct>>(`/products${qs ? `?${qs}` : ''}`);
}

export async function fetchProduct(id: string) {
  return apiFetch<ApiProduct>(`/products/${id}`);
}

export async function signup(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; email: string } }>(`/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; email: string } }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getWishlist() {
  return apiFetch<ApiProduct[]>(`/wishlist`);
}

export async function addToWishlist(productId: string) {
  return apiFetch<{ ok: boolean }>(`/wishlist/${productId}`, { method: 'POST' });
}

export async function removeFromWishlist(productId: string) {
  return apiFetch<{ ok: boolean }>(`/wishlist/${productId}`, { method: 'DELETE' });
}

