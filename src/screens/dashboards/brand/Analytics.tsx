import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js';
import BarChart from "../../../components/BarChart"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {

    const totalClickData = {
        type: "bar",
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Single Article Campaign',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#ff7029'
            },
            {
                label: 'Clicks Campaign',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#ff402b'
            }
        ]
    }

    const campaignClicks = {
        type: "bar",
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Clicks Campaign',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#ff402b'
            }
        ]
    }

    const data = {
        labels: ['Segment A', 'Segment B', 'Segment C'],
        datasets: [
            {
                label: '$ Earned',
                data: [20, 40, 40],
                backgroundColor: [
                    '#ff402b',
                    '#ff7029',
                    '#fff42b',
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
                    usePointStyle: true,
                }
            },
        },
    };

    const [year, setYear] = React.useState<string>("2022");

    const handleChange = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

    return (
        <>
            <div className='!min-h-[110px] !pl-0 flex items-center'>
                <h2 className='text-black text-large font-[700]'>Analytics</h2>
            </div>

            <div className="flex flex-wrap justify-between mt-[10px] dashboard-main">
                <div className="w-[68%] mb-[40px]">
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light mb-[30px]">
                        <div className='flex justify-between flex-wrap barchart-head'>
                            <h2 className="text-medium font-[700]">Total Clicks</h2>
                            <FormControl size="small">
                                <Select
                                    value={year}
                                    onChange={handleChange}
                                    className='chart-year-select'
                                    style={{ background: "#F3F4F6FF" }}
                                >
                                    <MenuItem value="2021">2021</MenuItem>
                                    <MenuItem value="2022">2022</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="my-5">
                            <BarChart data={totalClickData} />
                        </div>
                    </div>
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light">
                        <div className='flex justify-between flex-wrap barchart-head'>
                            <h2 className="text-medium font-[700]">Clicks By Campaign</h2>
                            <FormControl size="small">
                                <Select
                                    value={year}
                                    onChange={handleChange}
                                    className='chart-year-select'
                                    style={{ background: "#F3F4F6FF" }}
                                >
                                    <MenuItem value="2021">2021</MenuItem>
                                    <MenuItem value="2022">2022</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="my-5">
                            <BarChart data={campaignClicks} legend={false} />
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light">
                        <div className='flex justify-between'>
                            <h6 className="text-black text-[18px] font-[700]">Clicks By Publisher</h6>
                            <MoreHorizOutlinedIcon className='text-silver' />
                        </div>
                        <div className="mt-[-25px] mb-[-45px]">
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics
