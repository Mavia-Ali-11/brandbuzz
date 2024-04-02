import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: {
    type: string;
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  legend?: boolean
}

const BarChart: React.FC<ChartProps> = ({ data, legend }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          padding: 20,
          boxWidth: 45,
          usePointStyle: true,
        },
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Removes the vertical grid lines
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      },
    },
  };
  options.plugins.legend.display = legend === false ? false : true;

  return <Bar options={options} data={data} />;
}

export default BarChart;