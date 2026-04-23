/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Response containing Stripe checkout session URL.
 */
export interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}
/**
 * Response for webhook processing.
 */
export interface WebhookResponse {
  status?: string;
}
