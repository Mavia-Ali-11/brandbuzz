// const BaseURL = "http://164.92.183.128:3000";
const BaseURL = "https://api.brandzbuzz.com";

// AUTH APIs
export const SAVE_USER = `${BaseURL}/users/register`;
export const FIND_USER = `${BaseURL}/users/find`;

//  PUBLISHERS APIs
export const CREATE_PUBLISHER = `${BaseURL}/publishers/create`;
export const PUBLISHER_ACCOUNT_UPDATE = `${BaseURL}/publishers/update-profile`;
export const PUBLISHER_GET_PROFILE = `${BaseURL}/publishers/get-profile`;
export const PUBLISHER_LIST_ACTIVE = `${BaseURL}/publishers/list-active`;
export const PUBLISHER_LIST_INVITATIONS = `${BaseURL}/publishers/list-invitations`;
export const PUBLISHER_ACCEPT_INVITATIONS = `${BaseURL}/publishers/accept-invitation`;

// BRANDS APIs
export const CREATE_BRAND = `${BaseURL}/brands/create`;
export const BRAND_GET_PROFILE = `${BaseURL}/brands/get-profile`;
export const BRAND_CREATE_CAMPAIGN = `${BaseURL}/brands/create-campaign`;
export const BRAND_GET_CAMPAIGNS = `${BaseURL}/brands/list-brand-campaigns`;
