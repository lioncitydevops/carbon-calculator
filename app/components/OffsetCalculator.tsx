'use client';

import { useState } from 'react';
import { OffsetProject } from '../types/carbon';
import { formatNumber, calculateOffsetCost } from '../utils/calculations';

const offsetProjects: OffsetProject[] = [
  {
    name: 'Reforestation - Amazon',
    type: 'Nature-based',
    pricePerTonne: 15,
    location: 'Brazil',
    certification: 'VCS',
  },
  {
    name: 'Wind Power - India',
    type: 'Renewable Energy',
    pricePerTonne: 8,
    location: 'India',
    certification: 'Gold Standard',
  },
  {
    name: 'Solar Farm - Kenya',
    type: 'Renewable Energy',
    pricePerTonne: 12,
    location: 'Kenya',
    certification: 'Gold Standard',
  },
  {
    name: 'Cookstoves - Uganda',
    type: 'Energy Efficiency',
    pricePerTonne: 10,
    location: 'Uganda',
    certification: 'VCS + CCB',
  },
  {
    name: 'Blue Carbon - Indonesia',
    type: 'Nature-based',
    pricePerTonne: 25,
    location: 'Indonesia',
    certification: 'VCS + CCB',
  },
  {
    name: 'Direct Air Capture',
    type: 'Technology',
    pricePerTonne: 600,
    location: 'Iceland',
    certification: 'CDR.fyi',
  },
  {
    name: 'Biochar - USA',
    type: 'Technology',
    pricePerTonne: 150,
    location: 'United States',
    certification: 'Puro.earth',
  },
  {
    name: 'Ocean Alkalinity',
    type: 'Technology',
    pricePerTonne: 200,
    location: 'Norway',
    certification: 'CDR.fyi',
  },
];

export default function OffsetCalculator() {
  const [emissions, setEmissions] = useState<number>(0);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const [offsetPercentage, setOffsetPercentage] = useState<number>(100);

  const toggleProject = (projectName: string) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(projectName)) {
      newSelected.delete(projectName);
    } else {
      newSelected.add(projectName);
    }
    setSelectedProjects(newSelected);
  };

  const selectedProjectsList = offsetProjects.filter((p) =>
    selectedProjects.has(p.name)
  );

  const emissionsToOffset = emissions * (offsetPercentage / 100);
  const perProjectEmissions = selectedProjectsList.length > 0
    ? emissionsToOffset / selectedProjectsList.length
    : 0;

  const totalCost = selectedProjectsList.reduce(
    (sum, project) => sum + calculateOffsetCost(perProjectEmissions, project.pricePerTonne),
    0
  );

  const averagePricePerTonne = selectedProjectsList.length > 0
    ? selectedProjectsList.reduce((sum, p) => sum + p.pricePerTonne, 0) / selectedProjectsList.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Emissions to Offset</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Emissions (tCO2e)
              </label>
              <input
                type="number"
                value={emissions || ''}
                onChange={(e) => setEmissions(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                placeholder="Enter your emissions"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter emissions from calculator or your own data
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offset Percentage: {offsetPercentage}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={offsetPercentage}
                onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Emissions to offset:</p>
              <p className="text-2xl font-bold text-cyan-700">
                {formatNumber(emissionsToOffset)} tCO2e
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Offset Summary</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Selected Projects</p>
                <p className="text-2xl font-bold text-green-700">
                  {selectedProjectsList.length}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Price/tonne</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${formatNumber(averagePricePerTonne, 0)}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 rounded-xl text-white">
              <p className="text-sm uppercase font-semibold opacity-90">
                Total Offset Cost
              </p>
              <p className="text-3xl font-bold mt-1">
                ${formatNumber(totalCost, 0)}
              </p>
              <p className="text-xs mt-2 opacity-75">
                For {formatNumber(emissionsToOffset)} tCO2e across{' '}
                {selectedProjectsList.length} project(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Available Carbon Offset Projects</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select multiple projects to distribute your offsets. Emissions will be split equally across selected projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offsetProjects.map((project) => {
            const isSelected = selectedProjects.has(project.name);
            return (
              <div
                key={project.name}
                onClick={() => toggleProject(project.name)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.type === 'Nature-based'
                        ? 'bg-green-100 text-green-800'
                        : project.type === 'Technology'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {project.type}
                  </span>
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
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{project.location}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${project.pricePerTonne}
                  </span>
                  <span className="text-xs text-gray-500">per tCO2e</span>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {project.certification}
                  </span>
                </div>

                {isSelected && emissionsToOffset > 0 && (
                  <div className="mt-3 pt-2 border-t border-cyan-200 bg-cyan-50 -mx-4 -mb-4 px-4 pb-3 rounded-b-lg">
                    <p className="text-xs text-cyan-600">Your allocation:</p>
                    <p className="font-semibold text-cyan-700">
                      {formatNumber(perProjectEmissions)} tCO2e = $
                      {formatNumber(
                        calculateOffsetCost(perProjectEmissions, project.pricePerTonne),
                        0
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-bold text-amber-800">About Carbon Offsets</h4>
        <p className="text-sm text-gray-700 mt-1">
          Carbon offsets should complement, not replace, direct emission reductions.
          Prioritize reducing your emissions first, then offset remaining emissions.
          Look for certified projects (VCS, Gold Standard, Puro.earth) to ensure quality.
        </p>
      </div>
    </div>
  );
}
