import axios from "axios";
import {
    CREATE_PUBLISHER,
    PUBLISHER_ACCOUNT_UPDATE,
    PUBLISHER_GET_PROFILE,
    PUBLISHER_LIST_ACTIVE,
    PUBLISHER_LIST_INVITATIONS,
    PUBLISHER_ACCEPT_INVITATIONS
} from "../config/endpoints";

export const getPublisherProfile = async (email: string) => {
    const response = await axios.post(PUBLISHER_GET_PROFILE, { email });
    return response && response.data;
}

export const updatePublisherAccount = async (data: {}) => {
    const response = await axios.put(PUBLISHER_ACCOUNT_UPDATE, data);
    return response && response.data;
}

export const getActivePublishers = async () => {
    const response = await axios.get(PUBLISHER_LIST_ACTIVE);
    return response && response.data;
}

export const createPublisher = async (data: {}) => {
    const response = await axios.post(CREATE_PUBLISHER, data);
    return response && response.data;
}

export const getInvitations = async (email: string) => {
    const response = await axios.post(PUBLISHER_LIST_INVITATIONS, { email });
    return response && response.data;
}

export const acceptInvitation = async (data: {}) => {
    const response = await axios.put(PUBLISHER_ACCEPT_INVITATIONS, data);
    return response && response.data;
}