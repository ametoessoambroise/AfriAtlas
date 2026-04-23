import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";
import type * as T from "../types/delivery";

async function parseError(res: Response, url: string): Promise<never> {
  const errorBody = await res.text().catch(() => res.statusText);
  throw new ApiError(res.status, errorBody, url, "DELIVERY");
}

function getHeaders() {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const BASE_PATH = "/api/v1/delivery";

// Addresses
export async function listAddresses(): Promise<
  T.DeliveryAddressListResponse[]
> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/addresses`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) await parseError(res, url);
  return res.json();
}

export async function createAddress(
  data: T.DeliveryAddressCreate,
): Promise<T.DeliveryAddressResponse> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/addresses`;
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) await parseError(res, url);
  return res.json();
}

export async function updateAddress(
  id: string,
  data: T.DeliveryAddressUpdate,
): Promise<T.DeliveryAddressResponse> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/addresses/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) await parseError(res, url);
  return res.json();
}

export async function deleteAddress(id: string): Promise<void> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/addresses/${id}`;
  const res = await fetch(url, { method: "DELETE", headers: getHeaders() });
  if (!res.ok) await parseError(res, url);
}

export async function getDefaultAddress(): Promise<T.DeliveryAddressResponse | null> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/addresses/default`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) return null;
  return res.json();
}

// Fee Estimation
export async function estimateFee(
  data: T.DeliveryFeeEstimateRequest,
): Promise<T.DeliveryFeeEstimateResponse> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/estimate`;
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) await parseError(res, url);
  return res.json();
}

// Delivery Requests
export async function createDelivery(
  data: T.DeliveryRequestCreate,
): Promise<T.DeliveryRequestResponse> {
  const url = `${getApiBaseUrl()}${BASE_PATH}`;
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) await parseError(res, url);
  return res.json();
}

// Preferences
export async function getPreferences(): Promise<T.DeliveryPreferences> {
  const url = `${getApiBaseUrl()}${BASE_PATH}/preferences`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) await parseError(res, url);
  return res.json();
}
