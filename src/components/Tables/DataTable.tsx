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

const DataTable = (props: any) => {
  const { type, campaigns } = props;
  const isBrand = type === "brand";

  return (
    <TableContainer className='border-[1px] border-light rounded-[4px]'>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Items</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>{isBrand ? "Clicks" : "Earnings"}</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((data: any, key: number) => {
            return (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row" className='!text-black !font-[700] font-inter'>
                  {data.name}
                </StyledTableCell>
                <StyledTableCell className='font-inter'>
                  {dayjs(data.startingDate).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell className='font-inter'>$0</StyledTableCell>
                <StyledTableCell className='font-inter'>
                  <span className='text-[#117B34FF] text-[12px] bg-[#EEFDF3FF] pt-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                    In Progress
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;