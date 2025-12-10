"use client"; // if using Next.js App Router

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function getPastWeek(): string[] {
  const labels: string[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
  }

  return labels;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Weekly Donations",
    },
  },
};

const labels = getPastWeek();

export const data = {
  labels,
  datasets: [
    {
      label: "Donations",
      data: [12, 19, 3, 5, 2, 8],
      backgroundColor: "rgba(133, 238, 135, 0.43)",
    },
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}
