'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { CalculationResult } from '../types/carbon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface EmissionsChartProps {
  result: CalculationResult;
  type: 'doughnut' | 'bar';
}

export default function EmissionsChart({ result, type }: EmissionsChartProps) {
  if (type === 'doughnut') {
    const data = {
      labels: ['Scope 1', 'Scope 2', 'Scope 3'],
      datasets: [
        {
          data: [result.scope1Total, result.scope2Total, result.scope3Total],
          backgroundColor: ['#fbbf24', '#3b82f6', '#6366f1'],
          borderColor: ['#f59e0b', '#2563eb', '#4f46e5'],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<'doughnut'>) {
              const value = context.raw as number;
              const total = result.totalEmissions;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value.toFixed(2)} tCO2e (${percentage}%)`;
            },
          },
        },
      },
    };

    return <Doughnut data={data} options={options} />;
  }

  // Bar chart for detailed breakdown
  const scope1Labels = Object.keys(result.breakdown.scope1).map((k) =>
    k.replace(/([A-Z])/g, ' $1').trim()
  );
  const scope2Labels = Object.keys(result.breakdown.scope2).map((k) =>
    k.replace(/([A-Z])/g, ' $1').trim()
  );
  const scope3Labels = Object.keys(result.breakdown.scope3).map((k) =>
    k.replace(/([A-Z])/g, ' $1').trim()
  );

  const allLabels = [...scope1Labels, ...scope2Labels, ...scope3Labels];
  const scope1Values = Object.values(result.breakdown.scope1);
  const scope2Values = Object.values(result.breakdown.scope2);
  const scope3Values = Object.values(result.breakdown.scope3);

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: 'Emissions (tCO2e)',
        data: [...scope1Values, ...scope2Values, ...scope3Values],
        backgroundColor: [
          ...scope1Labels.map(() => '#fbbf24'),
          ...scope2Labels.map(() => '#3b82f6'),
          ...scope3Labels.map(() => '#6366f1'),
        ],
        borderColor: [
          ...scope1Labels.map(() => '#f59e0b'),
          ...scope2Labels.map(() => '#2563eb'),
          ...scope3Labels.map(() => '#4f46e5'),
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const value = context.raw as number;
            return `${value.toFixed(4)} tCO2e`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'tCO2e',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
