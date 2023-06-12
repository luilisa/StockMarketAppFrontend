import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    }
  },
};


const LineChart = (date) => {

  const newdata = {
    labels: Array.from(date.data),
    datasets: [
      {
        label: 'Изменение цены',
        data: date.prices,
        borderColor: 'rgb(255, 99, 132)', 
        backgroundColor: 'rgb(255, 99, 132)',
        pointRadius: 2,
        pointBorderWidth: 0,
      },
      
    ],
  };


  return <Line options={options} data={newdata} width={200} height={80} />;
}



export default LineChart