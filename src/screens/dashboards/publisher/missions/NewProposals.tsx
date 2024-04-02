import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { acceptInvitation } from '../../../../services/publisherServices';
import Notify from '../../../../helpers/NotificationHelper';
import { getAuthSession } from '../../../../utils/common';

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

type PropTypes = {
  invites: Invites[],
  initializePage: () => void
};

const NewProposalsMissions: React.FC<PropTypes> = ({ invites, initializePage }) => {

  const acceptInvite = async (id: string) => {
    const user = await getAuthSession();

    try {
      const result = await acceptInvitation({
        email: user.email,
        invitationId: id
      });
      Notify.success(result.message);
      initializePage();
    } catch (e: any) {
      Notify.error(e.response.data.message);
    }
  }

  return (
    <TableContainer className='border-[1px] border-light rounded-[4px]'>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className='whitespace-nowrap'>Mission ID</StyledTableCell>
            <StyledTableCell>Offer</StyledTableCell>
            <StyledTableCell>Budget</StyledTableCell>
            {/* <StyledTableCell className='whitespace-nowrap'>Proposed on</StyledTableCell> */}
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Media</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invites.map((campaign, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row" className='!text-black !font-[700] font-inter'>
                {campaign.campaignId.slice(0, 1) + "..." + campaign.campaignId.slice(21, 24)}
              </StyledTableCell>
              <StyledTableCell className='font-inter no-wrap'>
                <p className='!text-black !font-[700]'>{campaign.name}</p>
                <span className='!text-gray text-[12px] inline-block mt-[6px]'>
                  {campaign.description}
                </span>
              </StyledTableCell>
              <StyledTableCell className='font-inter'>
                {"$" + campaign.budget +
                  (campaign.paymentModel === "CPC" ? "/click" : "")
                }
              </StyledTableCell>
              {/* <StyledTableCell className='font-inter'>
                {dayjs(campaign.startingDate).format("DD/MM/YYYY")}
              </StyledTableCell> */}
              <StyledTableCell className='whitespace-nowrap font-inter'>
                {
                  campaign.paymentModel === "CPC" ?
                    <span className="text-[#EF9834FF] text-[12px] font-[500] bg-[#FEF8F1FF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block">
                      Clicks Campaign
                    </span>
                    :
                    <span className="text-[#1091F4FF] text-[12px] font-[500] bg-[#F0F8FEFF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block">
                      Single Article
                    </span>
                }
              </StyledTableCell>
              <StyledTableCell className='whitespace-nowrap font-inter'>
                <span className='text-[#323743FF] text-[12px] bg-[#F3F4F6FF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                  Mens-folio
                </span>
              </StyledTableCell>
              <StyledTableCell className='font-inter'>
                <div className='flex'>
                  <button
                    className='text-[#117B34FF] bg-[#EEFDF3FF] w-[70px] h-[36px] rounded-[4px] mr-[12px] duration-300 hover:bg-[#B8F5CDFF]'
                    onClick={() => acceptInvite(campaign.campaignId)}>
                    Start
                  </button>
                  <button className='text-[#FF402BFF] bg-[#FFF1F0FF] w-[70px] h-[36px] rounded-[4px] duration-300 hover:bg-[#FFDBD7FF]'>
                    Reject
                  </button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NewProposalsMissions;