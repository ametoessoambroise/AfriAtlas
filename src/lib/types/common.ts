/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Standard error response schema.
 */
export interface ErrorResponse {
  detail: string;
  error_code: string;
  status_code: number;
  timestamp?: string;
}
/**
 * Simple message response schema.
 */
export interface MessageResponse {
  message: string;
}
