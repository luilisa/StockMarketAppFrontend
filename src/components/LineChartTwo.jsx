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
import { faker } from '@faker-js/faker';

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

function calculateMovingAverage(data, windowSize) {
  const movingAverages = [];
  const dataLength = data.length;

  for (let i = windowSize - 1; i < dataLength; i++) {
    const window = data.slice(i - windowSize + 1, i + 1);
    const sum = window.reduce((acc, value) => acc + value, 0);
    const average = sum / windowSize;
    movingAverages.push(average);
  }

  return movingAverages;
}

function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let ema = prices[0];
  const movingAverages = [];
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] * k) + (ema * (1 - k));
    movingAverages.push(ema);
  }

  return movingAverages;
}



const LineChartTwo = (date) => {
  
  const EMA = calculateEMA(date.prices, 5);
  const SMA = calculateMovingAverage(date.prices, 5);
  const newdata = {
    labels: Array.from(date.data),
    datasets: [
      {
        label: 'Экспоненциальное скользящее среднее',
        data: EMA,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgb(153, 102, 255)',
        pointRadius:2,
        pointBorderWidth: 0,
      },
      {
        label: 'Простое скользящее среднее',
        data: SMA,
        borderColor: 'rgb(75, 192, 192)', 
        backgroundColor: 'rgb(75, 192, 192)',
        pointRadius: 2,
        pointBorderWidth: 0,
      }
    ],
  };


  return <Line options={options} data={newdata} width={200} height={80} />;
}



export default LineChartTwo