import axios from "axios";
import {
    BRAND_CREATE_CAMPAIGN,
    BRAND_GET_PROFILE,
    CREATE_BRAND,
    BRAND_GET_CAMPAIGNS
} from "../config/endpoints";

export const getBrandProfile = async (email: string) => {
    const response = await axios.post(BRAND_GET_PROFILE, { email });
    return response && response.data;
}

export const createCampaign = async (data: {}) => {
    const response = await axios.post(BRAND_CREATE_CAMPAIGN, data);
    return response && response.data;
}

export const createBrand = async (data: {}) => {
    const response = await axios.post(CREATE_BRAND, data);
    return response && response.data;
}

export const getCampaigns = async (email: string) => {
    const response = await axios.post(BRAND_GET_CAMPAIGNS, { email });
    return response && response.data;
}