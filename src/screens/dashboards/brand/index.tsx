import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, DataTable } from "../../../components"
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { futureEndDateorCPA } from "../../../utils/common";
import { getBrandCampaigns } from "../../../utils/data";

type Campaigns = {
    name: string;
    startingDate: string;
    budget: number;
    endingDate: string;
    paymentModel: string;
    accepted: boolean;
};

const BrandDashboard = () => {
    const navigate = useNavigate();
    const [activeCampaigns, setActiveCampaigns] = useState<Campaigns[]>([]);

    useEffect(() => {
        initializePage();
    }, []);

    const initializePage = async () => {
        const campaigns = await getBrandCampaigns();
        const filteredCampaigns = campaigns.filter(({ accepted, endingDate, paymentModel }: Campaigns) =>
            accepted && futureEndDateorCPA(endingDate, paymentModel))
        setActiveCampaigns(filteredCampaigns);
    }

    return (
        <>
            <div className='!min-h-[110px] !pl-0 flex items-center'>
                <h2 className='text-black text-large font-[700]'>Dashboard</h2>
            </div>

            <div className="flex flex-wrap justify-between mt-[10px] dashboard-main">
                <div className="w-[68%]">
                    <div className="flex justify-between button-group">
                        <PrimaryButton
                            text="View All Campaigns"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small mr-[20px] h-[60px] max-w-[250px]"
                            onClick={() => navigate("/brand/campaigns")}
                        />
                        <PrimaryButton
                            text="Create New Campaigns"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small mr-[20px] h-[60px] max-w-[250px]"
                            onClick={() => navigate("/brand/create-clicks-campaign")}
                        />
                        <PrimaryButton
                            text="View Analytics"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small h-[60px] max-w-[250px]"
                            onClick={() => navigate("/brand/analytics")}
                        />
                    </div>
                    <div className="mt-[40px]">
                        <h5 className="text-[18px] font-[700]">Active Campaigns</h5>
                        <div className="my-5">
                            <DataTable type="brand" campaigns={activeCampaigns} />
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="rounded-[6px] px-[18px] py-[15px] border-[1px] border-light bg-[#F3F4F6FF]">
                        <span className="text-gray">Clicks YTD</span>
                        <h4 className="text-black text-large font-[700] mt-[3px]">0</h4>
                        <h6 className="text-[#14923EFF] font-[700]">
                            <ExpandLessIcon className="mt-[-3px] !text-[18px]" />
                            <span className="font-inter">2.29%</span>
                        </h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandDashboard;