import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";
import type * as T from "../types/cart";

async function parseError(res: Response, url: string): Promise<never> {
  const errorBody = await res.text().catch(() => res.statusText);
  throw new ApiError(res.status, errorBody, url, "CART");
}

function cartBasePath(): string {
  return `${getApiBaseUrl()}/api/v1/cart`;
}

function getHeaders() {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const cartApi = {
  /** GET /api/v1/cart */
  getCart: async (): Promise<T.CartDetailResponse> => {
    const url = cartBasePath();
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<T.CartDetailResponse>;
  },

  /** POST /api/v1/cart/items */
  addItem: async (data: T.CartItemCreate): Promise<T.CartItemDetailResponse> => {
    const url = `${cartBasePath()}/items`;
    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<T.CartItemDetailResponse>;
  },

  /** PUT /api/v1/cart/items/{item_id} */
  updateItem: async (itemId: string, data: T.CartItemUpdate): Promise<T.CartItemDetailResponse> => {
    const url = `${cartBasePath()}/items/${encodeURIComponent(itemId)}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<T.CartItemDetailResponse>;
  },

  /** DELETE /api/v1/cart/items/{item_id} */
  removeItem: async (itemId: string): Promise<{ message: string }> => {
    const url = `${cartBasePath()}/items/${encodeURIComponent(itemId)}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<{ message: string }>;
  },

  /** DELETE /api/v1/cart */
  clearCart: async (): Promise<{ message: string }> => {
    const url = cartBasePath();
    const res = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<{ message: string }>;
  },

  /** POST /api/v1/cart/checkout */
  checkout: async (): Promise<T.CheckoutResponse> => {
    const url = `${cartBasePath()}/checkout`;
    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
    });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<T.CheckoutResponse>;
  },

  /** GET /api/v1/cart/summary */
  getCartSummary: async (): Promise<T.CartSummary> => {
    const url = `${cartBasePath()}/summary`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) await parseError(res, url);
    return res.json() as Promise<T.CartSummary>;
  },
};
