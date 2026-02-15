'use client';

import { useState } from 'react';
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
import {
  Scope1Emissions,
  Scope2Emissions,
  Scope3Emissions,
  Scenario,
} from '../types/carbon';
import {
  calculateTotalEmissions,
  formatNumber,
  calculateReductionPercentage,
} from '../utils/calculations';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const emptyScope1: Scope1Emissions = {
  naturalGas: 0,
  diesel: 0,
  petrol: 0,
  refrigerants: 0,
  lpg: 0,
};

const emptyScope2: Scope2Emissions = {
  electricity: 0,
  heating: 0,
  cooling: 0,
  steam: 0,
};

const emptyScope3: Scope3Emissions = {
  businessTravel: 0,
  employeeCommuting: 0,
  wasteGenerated: 0,
  purchasedGoods: 0,
  upstreamTransport: 0,
  downstreamTransport: 0,
};

// Sample scenarios for demonstration
const sampleScenarios: Scenario[] = [
  {
    id: 'baseline',
    name: 'Current Baseline',
    description: 'Current operations without any changes',
    scope1: { naturalGas: 50000, diesel: 15000, petrol: 8000, refrigerants: 50, lpg: 2000 },
    scope2: { electricity: 500000, heating: 100000, cooling: 80000, steam: 50000 },
    scope3: {
      businessTravel: 200000,
      employeeCommuting: 500000,
      wasteGenerated: 100,
      purchasedGoods: 5000000,
      upstreamTransport: 100000,
      downstreamTransport: 150000,
    },
  },
  {
    id: 'renewable',
    name: '50% Renewable Energy',
    description: 'Switch 50% of electricity to renewable sources',
    scope1: { naturalGas: 50000, diesel: 15000, petrol: 8000, refrigerants: 50, lpg: 2000 },
    scope2: { electricity: 250000, heating: 100000, cooling: 80000, steam: 50000 },
    scope3: {
      businessTravel: 200000,
      employeeCommuting: 500000,
      wasteGenerated: 100,
      purchasedGoods: 5000000,
      upstreamTransport: 100000,
      downstreamTransport: 150000,
    },
  },
  {
    id: 'ev-fleet',
    name: 'Electric Vehicle Fleet',
    description: 'Replace all company vehicles with EVs',
    scope1: { naturalGas: 50000, diesel: 0, petrol: 0, refrigerants: 50, lpg: 2000 },
    scope2: { electricity: 550000, heating: 100000, cooling: 80000, steam: 50000 },
    scope3: {
      businessTravel: 200000,
      employeeCommuting: 500000,
      wasteGenerated: 100,
      purchasedGoods: 5000000,
      upstreamTransport: 100000,
      downstreamTransport: 150000,
    },
  },
  {
    id: 'remote-work',
    name: 'Hybrid Remote Work',
    description: '50% reduction in commuting and business travel',
    scope1: { naturalGas: 50000, diesel: 15000, petrol: 8000, refrigerants: 50, lpg: 2000 },
    scope2: { electricity: 400000, heating: 80000, cooling: 60000, steam: 40000 },
    scope3: {
      businessTravel: 100000,
      employeeCommuting: 250000,
      wasteGenerated: 80,
      purchasedGoods: 5000000,
      upstreamTransport: 100000,
      downstreamTransport: 150000,
    },
  },
  {
    id: 'combined',
    name: 'Combined Strategy',
    description: 'All initiatives combined',
    scope1: { naturalGas: 30000, diesel: 0, petrol: 0, refrigerants: 25, lpg: 1000 },
    scope2: { electricity: 200000, heating: 60000, cooling: 40000, steam: 30000 },
    scope3: {
      businessTravel: 80000,
      employeeCommuting: 200000,
      wasteGenerated: 50,
      purchasedGoods: 4000000,
      upstreamTransport: 80000,
      downstreamTransport: 120000,
    },
  },
];

export default function ScenarioComparison() {
  const [scenarios, setScenarios] = useState<Scenario[]>(() =>
    sampleScenarios.map((s) => ({
      ...s,
      result: calculateTotalEmissions(s.scope1, s.scope2, s.scope3),
    }))
  );
  const [selectedScenarios, setSelectedScenarios] = useState<Set<string>>(
    new Set(['baseline', 'renewable', 'ev-fleet'])
  );

  const toggleScenario = (id: string) => {
    const newSelected = new Set(selectedScenarios);
    if (id === 'baseline') return; // Always keep baseline
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedScenarios(newSelected);
  };

  const selectedData = scenarios.filter((s) => selectedScenarios.has(s.id));
  const baseline = scenarios.find((s) => s.id === 'baseline');

  const chartData = {
    labels: selectedData.map((s) => s.name),
    datasets: [
      {
        label: 'Scope 1',
        data: selectedData.map((s) => s.result?.scope1Total || 0),
        backgroundColor: '#fbbf24',
      },
      {
        label: 'Scope 2',
        data: selectedData.map((s) => s.result?.scope2Total || 0),
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Scope 3',
        data: selectedData.map((s) => s.result?.scope3Total || 0),
        backgroundColor: '#6366f1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'tCO2e',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Select Scenarios to Compare</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {scenarios.map((scenario) => {
            const isSelected = selectedScenarios.has(scenario.id);
            const isBaseline = scenario.id === 'baseline';
            const reduction = baseline && scenario.result
              ? calculateReductionPercentage(
                  baseline.result?.totalEmissions || 0,
                  scenario.result.totalEmissions
                )
              : 0;

            return (
              <div
                key={scenario.id}
                onClick={() => toggleScenario(scenario.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isBaseline
                    ? 'border-gray-300 bg-gray-50 cursor-default'
                    : isSelected
                    ? 'border-cyan-500 bg-cyan-50 shadow-md cursor-pointer'
                    : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  {isBaseline ? (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                      Baseline
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        reduction > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reduction > 0 ? '-' : '+'}
                      {Math.abs(reduction).toFixed(1)}%
                    </span>
                  )}
                  {!isBaseline && (
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {scenario.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{scenario.description}</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatNumber(scenario.result?.totalEmissions || 0)}
                  <span className="text-xs font-normal text-gray-500 ml-1">
                    tCO2e
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Emissions Comparison</h3>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Detailed Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Scenario</th>
                <th className="px-4 py-3 text-right font-semibold">Scope 1</th>
                <th className="px-4 py-3 text-right font-semibold">Scope 2</th>
                <th className="px-4 py-3 text-right font-semibold">Scope 3</th>
                <th className="px-4 py-3 text-right font-semibold">Total</th>
                <th className="px-4 py-3 text-right font-semibold">vs Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {selectedData.map((scenario) => {
                const reduction = baseline && scenario.result
                  ? calculateReductionPercentage(
                      baseline.result?.totalEmissions || 0,
                      scenario.result.totalEmissions
                    )
                  : 0;

                return (
                  <tr key={scenario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-semibold">{scenario.name}</span>
                      <p className="text-xs text-gray-500">{scenario.description}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                        {formatNumber(scenario.result?.scope1Total || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {formatNumber(scenario.result?.scope2Total || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                        {formatNumber(scenario.result?.scope3Total || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {formatNumber(scenario.result?.totalEmissions || 0)} tCO2e
                    </td>
                    <td className="px-4 py-3 text-right">
                      {scenario.id === 'baseline' ? (
                        <span className="text-gray-400">-</span>
                      ) : (
                        <span
                          className={`font-semibold ${
                            reduction > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {reduction > 0 ? '-' : '+'}
                          {Math.abs(reduction).toFixed(1)}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
          <h4 className="font-bold text-green-800 mb-2">Highest Impact Action</h4>
          {(() => {
            const nonBaseline = scenarios.filter((s) => s.id !== 'baseline');
            const bestScenario = nonBaseline.reduce((best, current) => {
              const bestReduction = calculateReductionPercentage(
                baseline?.result?.totalEmissions || 0,
                best.result?.totalEmissions || 0
              );
              const currentReduction = calculateReductionPercentage(
                baseline?.result?.totalEmissions || 0,
                current.result?.totalEmissions || 0
              );
              return currentReduction > bestReduction ? current : best;
            });
            const reduction = calculateReductionPercentage(
              baseline?.result?.totalEmissions || 0,
              bestScenario.result?.totalEmissions || 0
            );
            return (
              <>
                <p className="text-2xl font-bold text-green-700">
                  {bestScenario.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {bestScenario.description}
                </p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  Potential reduction: {formatNumber(reduction)}%
                </p>
              </>
            );
          })()}
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-800 mb-2">Quick Wins</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">*</span>
              <span>Switch to renewable energy providers (Scope 2)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">*</span>
              <span>Implement hybrid work policy (Scope 3)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">*</span>
              <span>Optimize logistics routes (Scope 3)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">*</span>
              <span>Replace fleet with EVs over time (Scope 1)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
