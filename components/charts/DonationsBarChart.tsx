"use client";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getPastWeek(): string[] {
  const labels: string[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toISOString().split("T")[0]);
  }

  return labels;
}

export default function DonationsBarChart() {
  const [counts, setCounts] = useState<number[]>([]);
  const labels = getPastWeek();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/files/donations-by-date");
        if (!res.ok) {
          console.error("Failed to fetch donations-by-date", res.status);
          return;
        }
        const { data = {} } = await res.json();
        setCounts(labels.map((label) => data[label] || 0));
      } catch (err) {
        console.error("Error fetching donation data:", err);
      }
    })();
  }, [labels]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Donations (Past 7 Days)" },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Donations",
        data: counts,
        backgroundColor: "rgba(133, 238, 135, 0.43)",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
