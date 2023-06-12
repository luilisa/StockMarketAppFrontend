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

function calculate(volumes) {
    const tradeVolumes = [];
  
    for (var i = 0; i < volumes.length; i++) {
        var tradeVolume = volumes[i]/1000000;
        tradeVolumes.push(tradeVolume);
      }
    return tradeVolumes;
  }

function calculateVolume(volumes, prices) {
    const tradeVolumes = [];
  
    for (var i = 0; i < prices.length; i++) {
        var tradeVolume = prices[i] * volumes[i];
        tradeVolumes.push(tradeVolume);
      }
    return tradeVolumes;
  }

const BarChartTwo = (date) => {

    const volume = calculateVolume(date.volumes, date.prices)
  const newdata = {
    labels: Array.from(date.data),
    datasets: [
      {
        type: 'bar',
        label: 'Объем торгов в валюте (млн рублей)',
        data: calculate(volume),
        borderColor: 'rgb(255, 205, 86)', 
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        pointRadius: 0,
        pointBorderWidth: 0,
        borderWidth: 1
      },
    ],
    
  };

  
  return <Bar options={options} data={newdata} width={200} height={60} />;
}



export default BarChartTwo