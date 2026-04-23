import type { AdStatus } from "../api/enums";

/** Base advertisement schema. */
export interface AdvertisementBase {
  title: string;
  description: string;
  image_url: string | null;
  target_url: string;
  target_countries: string[] | null;
  target_categories: string[] | null;
  target_plan_types: string[] | null;
  starts_at: string | null;
  ends_at: string | null;
}

/** Schema for creating a new advertisement. */
export interface AdvertisementCreate extends AdvertisementBase {
  place_id: string | null;
  budget: number | null;
}

/** Schema for advertisement response. */
export interface AdvertisementResponse extends AdvertisementBase {
  id: string;
  owner_id: string;
  place_id: string | null;
  status: AdStatus;
  impression_count: number;
  click_count: number;
  budget: number;
  spent: number;
  created_at: string;
  updated_at: string;
}

/** Schema for advertisement list response (lightweight). */
export interface AdvertisementListResponse {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  target_url: string;
  status: AdStatus;
  impression_count: number;
  click_count: number;
  budget: number;
  spent: number;
  created_at: string;
}

/** Schema for updating advertisement status. */
export interface AdvertisementStatusUpdate {
  ad_status: AdStatus;
}
