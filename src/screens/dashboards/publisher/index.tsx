import { useNavigate } from "react-router-dom";
import { PrimaryButton, DataTable } from "../../../components"
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js';
import { useEffect, useState } from "react";
import { futureEndDateorCPA, getAuthSession } from "../../../utils/common";
import { getInvitations } from "../../../services/publisherServices";

ChartJS.register(ArcElement, Tooltip, Legend);

type Invites = {
    campaignId: string;
    name: string;
    paymentModel: string;
    budget: number;
    description: string;
    startingDate: string;
    endingDate: string;
    status: string,
  };

const Dashboard = () => {
    const navigate = useNavigate();
    const [topCampaigns, setTopCampaigns] = useState<Invites[]>([]);

    useEffect(() => {
        initializePage();
    }, []);

    const initializePage = async () => {
        const user = await getAuthSession();

        try {
            const data = await getInvitations(user.email);
            const invites = data.filter((invite: Invites) => invite.status === "ACCEPTED"
                && (futureEndDateorCPA(invite.endingDate, invite.paymentModel)));
            setTopCampaigns(invites.slice(0, 3));
        } catch (e) {
            console.error(e);
        }
    }

    const data = {
        labels: ['Luxuo', 'Mens-Folio', 'Grazia'],
        datasets: [
            {
                label: '$ Earned',
                data: [20, 40, 40],
                backgroundColor: [
                    '#1091f4',
                    '#1dd75b',
                    '#ef9834',
                ],
                borderWidth: 0,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    boxWidth: 45,
                    usePointStyle: true
                }
            },
        },
    };

    return (
        <>
            <div className='!min-h-[110px] !pl-0 flex items-center'>
                <h2 className='text-black text-large font-[700]'>Dashboard</h2>
            </div>

            <div className="flex flex-wrap justify-between mt-[10px] dashboard-main">
                <div className="w-[68%]">
                    <div className="flex justify-between button-group">
                        <PrimaryButton
                            text="View On-Going Missions"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small mr-[20px] h-[60px] max-w-[250px]"
                            onClick={() => navigate("/publisher/missions")}
                        />
                        <PrimaryButton
                            text="Registered Media"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small mr-[20px] h-[60px] max-w-[250px]"
                            onClick={() => navigate("/publisher/media")}
                        />
                        <PrimaryButton
                            text="View Analytics"
                            icon={<EastOutlinedIcon className="!text-[16px] ml-[2px]" />}
                            className="text-small h-[60px] max-w-[250px]"
                            onClick={() => navigate("/publisher/analytics")}
                        />
                    </div>
                    <div className="mt-[40px]">
                        <h5 className="text-[18px] font-[700]">Top Performing Articles</h5>
                        <div className="my-5">
                            <DataTable campaigns={topCampaigns} />
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="rounded-[6px] shadow px-[18px] py-[15px] border-[1px] border-light mb-[30px]">
                        <span className="text-gray">Earnings YTD</span>
                        <h4 className="text-black text-large font-[700] mt-[3px]">$0</h4>
                        <h6 className="text-[#14923EFF] font-[700]">
                            <ExpandLessIcon className="mt-[-3px] !text-[18px]" />
                            <span className="font-inter">2.29%</span>
                        </h6>
                    </div>
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light">
                        <h6 className="text-black text-[18px] font-[700]">Earnings By Brand</h6>
                        <span className="text-[#9095A1FF] text-small font-[500] font-inter">YTD</span>
                        <div className="mt-[-25px] mb-[-45px]">
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard