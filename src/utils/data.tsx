import { getCampaigns } from "../services/brandServices";
import { getAuthSession } from "./common";

export const getBrandCampaigns = async () => {
    const user = await getAuthSession();

    try {
        const data = await getCampaigns(user.email);
        data.forEach((campaign: any) => campaign.publishers.some((publisher: any) =>
            campaign.accepted = publisher.status === 'ACCEPTED'));
        return data;
    } catch (e) {
        console.error(e);
    }
}