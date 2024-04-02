import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js';
import GaugeChart from 'react-gauge-chart'
import BarChart from "../../../components/BarChart"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {

    const barCartData = {
        type: "bar",
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Mens-folio',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#f8898d'
            },
            {
                label: 'Grazia',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#fbbdbf'
            },
            {
                label: 'Luxuo',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
                backgroundColor: '#f22128'
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
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light">
                        <div className='flex justify-between flex-wrap barchart-head'>
                            <h2 className="text-medium font-[700]">Total Profit: $57,234.50</h2>
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
                            <BarChart data={barCartData} />
                        </div>
                    </div>
                </div>
                <div className="w-[30%]">
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light mb-[30px]">
                        <div className='flex justify-between'>
                            <h6 className="text-black text-[18px] font-[700]">Earnings By Brand</h6>
                            <MoreHorizOutlinedIcon className='text-silver' />
                        </div>
                        <div className="mt-[-25px] mb-[-45px]">
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                    <div className="rounded-[6px] shadow px-[18px] py-[20px] border-[1px] border-light overflow-hidden">
                        <div className='flex justify-between'>
                            <h6 className="text-black text-[18px] font-[700]">Missions</h6>
                            <MoreHorizOutlinedIcon className='text-silver' />
                        </div>
                        <div className="mt-[35px] scale-[1.43]">
                            <GaugeChart
                                arcWidth={0.3}
                                cornerRadius={0}
                                nrOfLevels={2}
                                arcsLength={[0.72, 0.28]}
                                colors={["#ff402b", "#ffc4be"]}
                                percent={0.72}
                                arcPadding={0}
                                hideText={true}
                                animate={false}
                                needleColor="#ff402b"
                                needleBaseColor="#ff402b"
                                style={{ width: "70%" }}
                            />
                        </div>
                        <div className='flex justify-between mt-[20px] w-[86%] mx-auto'>
                            <div className='text-center'>
                                <span className='text-silver text-small'>Completed</span>
                                <h6 className='text-black text-medium font-[700]'>72%</h6>
                            </div>
                            <div className='text-center'>
                                <span className='text-silver text-small'>In Progress</span>
                                <h6 className='text-black text-medium font-[700]'>28%</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics
