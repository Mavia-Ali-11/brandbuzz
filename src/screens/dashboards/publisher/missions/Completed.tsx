import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
  invites: Invites[]
};

const CompletedInvites: React.FC<PropTypes> = ({ invites }) => {
  return (
    <TableContainer className='border-[1px] border-light rounded-[4px]'>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell className='whitespace-nowrap'>Mission ID</StyledTableCell>
            <StyledTableCell>Offer</StyledTableCell>
            <StyledTableCell>Revenue</StyledTableCell>
            <StyledTableCell className='whitespace-nowrap'>Finalised on</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
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
              <StyledTableCell className='font-inter'>{"$0"}</StyledTableCell>
              <StyledTableCell className='font-inter'>
                {campaign.paymentModel === "CPC" ? dayjs(campaign.endingDate).format("DD/MM/YYYY") : "-"}
              </StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompletedInvites;