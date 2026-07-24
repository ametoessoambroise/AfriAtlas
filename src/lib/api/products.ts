/**
 * Client HTTP Produits — écrit manuellement à partir de backend/openapi.json
 *
 * Chemins : /api/v1/places/{slug}/products (slug dans le path, pas en query)
 */
import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

async function parseError(res: Response, url: string): Promise<never> {
  const errorBody = await res.text().catch(() => res.statusText);
  throw new ApiError(res.status, errorBody, url, "PRODUCTS");
}

function productsBasePath(slug: string): string {
  return `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}/products`;
}

/** GET /api/v1/places/{slug}/products */
export async function listProducts(slug: string): Promise<T.ProductListResponse[]> {
  const url = productsBasePath(slug);
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) await parseError(res, url);
  return res.json() as Promise<T.ProductListResponse[]>;
}

/** POST /api/v1/places/{slug}/products */
export async function createProduct(slug: string, body: T.ProductCreate): Promise<T.ProductResponse> {
  const url = productsBasePath(slug);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) await parseError(res, url);
  return res.json() as Promise<T.ProductResponse>;
}

/** PUT /api/v1/places/{slug}/products/{product_id} */
export async function updateProduct(
  slug: string,
  product_id: string,
  body: T.ProductUpdate,
): Promise<T.ProductResponse> {
  const url = `${productsBasePath(slug)}/${encodeURIComponent(product_id)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) await parseError(res, url);
  return res.json() as Promise<T.ProductResponse>;
}

/** DELETE /api/v1/places/{slug}/products/{product_id} */
export async function deleteProduct(slug: string, product_id: string): Promise<void> {
  const url = `${productsBasePath(slug)}/${encodeURIComponent(product_id)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  if (!res.ok) await parseError(res, url);
}

/** POST /api/v1/places/{slug}/products/{product_id}/images */
export async function uploadProductImage(
  slug: string,
  product_id: string,
  body: FormData,
  params?: { storage?: string },
): Promise<T.ProductImageUploadResponse> {
  const qs = params?.storage ? `?storage=${encodeURIComponent(params.storage)}` : "";
  const url = `${productsBasePath(slug)}/${encodeURIComponent(product_id)}/images${qs}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body,
  });
  if (!res.ok) await parseError(res, url);
  return res.json() as Promise<T.ProductImageUploadResponse>;
}
