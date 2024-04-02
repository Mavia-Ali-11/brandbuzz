import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { futureEndDateorCPA, pastEndDate } from '../../../utils/common';
import { getBrandCampaigns } from '../../../utils/data';
import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        border: 0,
        color: "#565D6DFF",
        padding: "23px 15px",
        backgroundColor: "#FAFAFB",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#555",
        fontWeight: 400,
        padding: "30px 15px"
    }
}));

const StyledTableRow = styled(TableRow)(() => ({
    'td, th': {
        border: 0,
    },
}));

type Campaigns = {
    name: string;
    startingDate: string;
    budget: number;
    endingDate: string;
    paymentModel: string;
    accepted: boolean;
    publishers: [];
};

const CampaignsList = () => {
    const [campaigns, setCampaigns] = useState<Campaigns[]>([]);

    useEffect(() => {
        initializePage();
    }, []);

    const initializePage = async () => {
        const campaigns = await getBrandCampaigns();
        setCampaigns(campaigns);
    }

    const createStatusTag = (campaign: Campaigns) => {
        const accepted = campaign.accepted;
        const notExpired = futureEndDateorCPA(campaign.endingDate, campaign.paymentModel);
        const isExpired = pastEndDate(campaign.endingDate);

        const classses = "text-[12px] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block ";
        const status = accepted && notExpired ? { class: "text-[#117B34FF] bg-[#EEFDF3FF]", key: "In Progress" }
            : accepted && isExpired ? { class: "text-[#856404] bg-[#fff3cd]", key: "Completed" }
                : !accepted && notExpired ? { class: "text-[#FF402BFF] bg-faded_orange", key: "On Offer" }
                    : !accepted && isExpired ? { class: "text-gray bg-light", key: "Expired" }
                        : {};

        return <span className={classses + status.class}>
            {status.key}
        </span>
    }

    return (
        <>
            <div className='!min-h-[110px] !pl-0 flex items-center'>
                <h2 className='text-black text-large font-[700]'>All Campaigns</h2>
            </div>

            <TableContainer className='border-[1px] border-light rounded-[4px]'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Campaign Name</StyledTableCell>
                            <StyledTableCell>Date Launched</StyledTableCell>
                            <StyledTableCell>Budget</StyledTableCell>
                            <StyledTableCell>Clicks</StyledTableCell>
                            <StyledTableCell>Days</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map((campaign, key) => (
                            <StyledTableRow key={key}>
                                <StyledTableCell component="th" scope="row" className='!text-black !font-[700] font-inter'>
                                    {campaign.name}
                                </StyledTableCell>
                                <StyledTableCell className='font-inter'>
                                    {dayjs(campaign.startingDate).format("DD/MM/YYYY")}
                                </StyledTableCell>
                                <StyledTableCell className='font-inter'>
                                    {"$" + campaign.budget +
                                        (campaign.paymentModel === "CPC" ? "/click" : "")
                                    }
                                </StyledTableCell>
                                <StyledTableCell className='font-inter'>0</StyledTableCell>
                                <StyledTableCell className='font-inter'>
                                    {
                                        campaign.paymentModel === "CPA" ?
                                            "-"
                                            : dayjs(campaign.endingDate).diff(dayjs(campaign.startingDate), 'day')
                                    }
                                </StyledTableCell>
                                <StyledTableCell className='font-inter'>
                                    {
                                        campaign.paymentModel === "CPC" ?
                                            <span className='text-[#117B34FF] text-[12px] bg-[#EEFDF3FF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                                                Pay per Click
                                            </span>
                                            :
                                            <span className='text-[#1091F4FF] text-[12px] bg-[#F0F8FEFF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                                                Single Article
                                            </span>
                                    }
                                </StyledTableCell>
                                <StyledTableCell className='font-inter'>
                                    {createStatusTag(campaign)}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></>
    );
}

export default CampaignsList;