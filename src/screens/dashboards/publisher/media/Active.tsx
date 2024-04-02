import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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


function createData(
    name: string,
    channels: number,
    tags: React.ReactNode,
    media: string,
) {
    return {
        name,
        channels,
        tags,
        media,
        history: [
            {
                channel: 'mens-folio.com',
                type: 'Website',
                missions: "Big Baby Powder",
            },
            {
                channel: 'Mens folio neesletter',
                type: 'Newsletter',
                missions: "Product XYZ",
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow className='collapsible-table'>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <ArrowDropDownOutlinedIcon /> : <ArrowRightOutlinedIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" className='!text-black !font-[700] whitespace-nowrap font-inter'>
                    {row.name}
                </TableCell>
                <TableCell>{row.channels}</TableCell>
                <TableCell className='whitespace-nowrap'>{row.tags}</TableCell>
                <TableCell className='whitespace-nowrap'>
                    <span className='text-[#323743FF] text-[12px] bg-[#F3F4F6FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                        {row.media}
                    </span>
                </TableCell>
                <TableCell>
                    <EditOutlinedIcon className='text-gray' />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6] !text-gray' />
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6]' />
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6] !text-gray' >Channel</TableCell>
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6] !text-gray' >Type</TableCell>
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6] !text-gray' >Missions</TableCell>
                                        <TableCell className='!px-[13px] !py-[16px] bg-[#dee1e6] !text-gray' />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((innerRow, key) => (
                                        <TableRow key={key}>
                                            <TableCell className='!px-[13px] !py-[16px]' />
                                            <TableCell className='!px-[13px] !py-[16px]' />
                                            <TableCell className='!px-[13px] !py-[16px]'>{innerRow.channel}</TableCell>
                                            <TableCell className='!px-[13px] !py-[16px] whitespace-nowrap'>
                                                <span className='text-[#FF402BFF] text-[12px] bg-[#FFF1F0FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                                                    {innerRow.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className='!px-[13px] !py-[16px] whitespace-nowrap'>
                                                <span className='text-[#323743FF] text-[12px] bg-[#F3F4F6FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block'>
                                                    {innerRow.missions}
                                                </span>
                                            </TableCell>
                                            <TableCell className='!px-[13px] !py-[16px]'>
                                                <EditOutlinedIcon className='text-gray' />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow >
        </>
    );
}

const rows = [
    createData(
        'Mens-Folio',
        3,
        <>
            <span className="text-[#EF9834FF] font-[500] text-[12px] bg-[#FEF8F1FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] mr-[6px] inline-block">
                Men's Fashion
            </span>
            <span className="text-[#EF9834FF] font-[500] text-[12px] bg-[#FEF8F1FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block">
                Yacht
            </span>
        </>,
        'Mens-folio'
    ),
    createData(
        'Mens-Folio',
        2,
        <span className="text-[#1091F4FF] font-[500] text-[12px] bg-[#F0F8FEFF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block">
            Single Article
        </span>,
        'Mens-folio'
    ),
    createData(
        'Mens-Folio',
        2,
        <span className="text-[#EF9834FF] font-[500] text-[12px] bg-[#FEF8F1FF] p-[8px] pb-[6px] px-[10px] rounded-[14px] inline-block">
            Campaigns
        </span>,
        'Mens-folio'
    ),
];

const ActiveMedia = () => {
    return (
        <TableContainer className='border-[1px] border-light rounded-[4px] !shadow-none'>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Media</StyledTableCell>
                        <StyledTableCell>Channels</StyledTableCell>
                        <StyledTableCell>Tags</StyledTableCell>
                        <StyledTableCell>Media</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, key) => (
                        <Row key={key} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ActiveMedia;