import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        scaleShowLabels: false,
    
    },
    scales: {
        x: {
            ticks: {
                display: false //this will remove only the label
            }
        }
    },
    
};

function calculateVolume(volumes) {
    const tradeVolumes = [];
  
    for (var i = 0; i < volumes.length; i++) {
        var tradeVolume = volumes[i]/1000000;
        tradeVolumes.push(tradeVolume);
      }
    return tradeVolumes;
  }

const BarChart = (date) => {

    const tradeVolume = calculateVolume(date.volumes);

  const newdata = {
    labels: Array.from(date.data),
    datasets: [
      {
        type: 'bar',
        label: 'Объем торгов в ценных бумагах (млн)',
        data: tradeVolume,
        borderColor: 'rgb(54, 162, 235)', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 0,
        pointBorderWidth: 0,
        borderWidth: 1
      },
    ],
    
  };


  return <Bar options={options} data={newdata} width={200} height={60} />;
}



export default BarChart