import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Card, CardContent } from "@mui/material";

const data = [
  { name: "Sun", auto: 11, pending: 6, failed: 4 },
  { name: "Mon", auto: 9, pending: 5, failed: 3 },
  { name: "Tue", auto: 8, pending: 4, failed: 2 },
  { name: "Wed", auto: 10, pending: 6, failed: 3 },
  { name: "Thu", auto: 12, pending: 8, failed: 4 },
  { name: "Fri", auto: 14, pending: 10, failed: 6 },
  { name: "Sat", auto: 9, pending: 7, failed: 3 },
];

export default function PerformanceGraph({ chartData = data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy old instance before creating new
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((d) => d.name),
        datasets: [
          {
            label: "Auto-replied",
            data: chartData.map((d) => d.auto),
            borderColor: "#10B981",
            backgroundColor: "#10B981",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Pending",
            data: chartData.map((d) => d.pending),
            borderColor: "#F59E0B",
            backgroundColor: "#F59E0B",
            fill: false,
            tension: 0.4,
          },
          {
            label: "Failed",
            data: chartData.map((d) => d.failed),
            borderColor: "#EF4444",
            backgroundColor: "#EF4444",
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, boxWidth: 10 },
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
        // pointStyle: false,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <Card className="w-full h-[350px] mt-6 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
        <div className="h-[280px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
