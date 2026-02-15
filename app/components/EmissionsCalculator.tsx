'use client';

import { useState } from 'react';
import {
  Scope1Emissions,
  Scope2Emissions,
  Scope3Emissions,
  CalculationResult,
} from '../types/carbon';
import { calculateTotalEmissions, formatNumber } from '../utils/calculations';
import EmissionsChart from './EmissionsChart';

const initialScope1: Scope1Emissions = {
  naturalGas: 0,
  diesel: 0,
  petrol: 0,
  refrigerants: 0,
  lpg: 0,
};

const initialScope2: Scope2Emissions = {
  electricity: 0,
  heating: 0,
  cooling: 0,
  steam: 0,
};

const initialScope3: Scope3Emissions = {
  businessTravel: 0,
  employeeCommuting: 0,
  wasteGenerated: 0,
  purchasedGoods: 0,
  upstreamTransport: 0,
  downstreamTransport: 0,
};

interface InputFieldProps {
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}

function InputField({ label, unit, value, onChange, hint }: InputFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-gray-400 ml-1">({unit})</span>
      </label>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        placeholder="0"
        min="0"
        step="any"
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

export default function EmissionsCalculator() {
  const [scope1, setScope1] = useState<Scope1Emissions>(initialScope1);
  const [scope2, setScope2] = useState<Scope2Emissions>(initialScope2);
  const [scope3, setScope3] = useState<Scope3Emissions>(initialScope3);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const calculationResult = calculateTotalEmissions(scope1, scope2, scope3);
    setResult(calculationResult);
  };

  const handleReset = () => {
    setScope1(initialScope1);
    setScope2(initialScope2);
    setScope3(initialScope3);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Scope Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scope 1 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
              SCOPE 1
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Direct Emissions</p>

          <InputField
            label="Natural Gas"
            unit="m3"
            value={scope1.naturalGas}
            onChange={(v) => setScope1({ ...scope1, naturalGas: v })}
            hint="Facility heating, boilers"
          />
          <InputField
            label="Diesel"
            unit="liters"
            value={scope1.diesel}
            onChange={(v) => setScope1({ ...scope1, diesel: v })}
            hint="Company vehicles, generators"
          />
          <InputField
            label="Petrol/Gasoline"
            unit="liters"
            value={scope1.petrol}
            onChange={(v) => setScope1({ ...scope1, petrol: v })}
            hint="Company vehicles"
          />
          <InputField
            label="Refrigerants"
            unit="kg"
            value={scope1.refrigerants}
            onChange={(v) => setScope1({ ...scope1, refrigerants: v })}
            hint="HVAC, cooling systems"
          />
          <InputField
            label="LPG"
            unit="kg"
            value={scope1.lpg}
            onChange={(v) => setScope1({ ...scope1, lpg: v })}
            hint="Propane, heating"
          />
        </div>

        {/* Scope 2 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-400">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
              SCOPE 2
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Indirect Energy</p>

          <InputField
            label="Electricity"
            unit="kWh"
            value={scope2.electricity}
            onChange={(v) => setScope2({ ...scope2, electricity: v })}
            hint="Purchased electricity"
          />
          <InputField
            label="Heating"
            unit="kWh"
            value={scope2.heating}
            onChange={(v) => setScope2({ ...scope2, heating: v })}
            hint="District heating"
          />
          <InputField
            label="Cooling"
            unit="kWh"
            value={scope2.cooling}
            onChange={(v) => setScope2({ ...scope2, cooling: v })}
            hint="District cooling"
          />
          <InputField
            label="Steam"
            unit="kWh"
            value={scope2.steam}
            onChange={(v) => setScope2({ ...scope2, steam: v })}
            hint="Purchased steam"
          />
        </div>

        {/* Scope 3 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-400">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
              SCOPE 3
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Value Chain</p>

          <InputField
            label="Business Travel"
            unit="km"
            value={scope3.businessTravel}
            onChange={(v) => setScope3({ ...scope3, businessTravel: v })}
            hint="Flights, rail, car rentals"
          />
          <InputField
            label="Employee Commuting"
            unit="km"
            value={scope3.employeeCommuting}
            onChange={(v) => setScope3({ ...scope3, employeeCommuting: v })}
            hint="Annual total all employees"
          />
          <InputField
            label="Waste Generated"
            unit="tonnes"
            value={scope3.wasteGenerated}
            onChange={(v) => setScope3({ ...scope3, wasteGenerated: v })}
            hint="Waste to landfill"
          />
          <InputField
            label="Purchased Goods"
            unit="USD"
            value={scope3.purchasedGoods}
            onChange={(v) => setScope3({ ...scope3, purchasedGoods: v })}
            hint="Spend-based estimate"
          />
          <InputField
            label="Upstream Transport"
            unit="tonne-km"
            value={scope3.upstreamTransport}
            onChange={(v) => setScope3({ ...scope3, upstreamTransport: v })}
            hint="Inbound logistics"
          />
          <InputField
            label="Downstream Transport"
            unit="tonne-km"
            value={scope3.downstreamTransport}
            onChange={(v) => setScope3({ ...scope3, downstreamTransport: v })}
            hint="Outbound distribution"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleCalculate}
          className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
        >
          Calculate Emissions
        </button>
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 transition cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                Scope 1
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(result.scope1Total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">tCO2e</p>
              <p className="text-xs text-gray-400 mt-2">
                {formatNumber((result.scope1Total / result.totalEmissions) * 100, 1)}% of total
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                Scope 2
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(result.scope2Total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">tCO2e</p>
              <p className="text-xs text-gray-400 mt-2">
                {formatNumber((result.scope2Total / result.totalEmissions) * 100, 1)}% of total
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                Scope 3
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(result.scope3Total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">tCO2e</p>
              <p className="text-xs text-gray-400 mt-2">
                {formatNumber((result.scope3Total / result.totalEmissions) * 100, 1)}% of total
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 rounded-xl shadow-lg text-white">
              <p className="text-sm uppercase font-semibold mb-2 opacity-90">
                Total Emissions
              </p>
              <p className="text-3xl font-bold">{formatNumber(result.totalEmissions)}</p>
              <p className="text-sm mt-1 opacity-90">tCO2e</p>
              <p className="text-xs mt-2 opacity-75">GHG Protocol compliant</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Emissions by Scope</h3>
              <div className="h-64">
                <EmissionsChart result={result} type="doughnut" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Detailed Breakdown</h3>
              <div className="h-64">
                <EmissionsChart result={result} type="bar" />
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">Scope 1 Sources</h4>
                {Object.entries(result.breakdown.scope1).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{formatNumber(value)} tCO2e</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Scope 2 Sources</h4>
                {Object.entries(result.breakdown.scope2).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{formatNumber(value)} tCO2e</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-indigo-600 mb-2">Scope 3 Sources</h4>
                {Object.entries(result.breakdown.scope3).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{formatNumber(value)} tCO2e</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
