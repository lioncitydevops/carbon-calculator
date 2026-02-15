'use client';

import { useState } from 'react';
import Header from './components/Header';
import EmissionsCalculator from './components/EmissionsCalculator';
import OffsetCalculator from './components/OffsetCalculator';
import ScenarioComparison from './components/ScenarioComparison';
import UserGuide from './components/UserGuide';
import { TabType } from './types/carbon';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  const [showGuide, setShowGuide] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'calculator', label: 'Emissions Calculator' },
    { id: 'offset', label: 'Carbon Offsets' },
    { id: 'comparison', label: 'Scenario Comparison' },
  ];

  return (
    <div className="min-h-screen">
      <Header onGuideClick={() => setShowGuide(true)} />

      {/* Navigation */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn px-6 py-4 font-semibold whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'active border-b-3 border-cyan-500 text-cyan-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                GHG Emissions Calculator
              </h2>
              <p className="text-gray-600">
                Calculate your organization&apos;s carbon footprint across Scope 1, 2, and 3
                emissions. Enter your activity data below to get started.
              </p>
            </div>
            <EmissionsCalculator />
          </div>
        )}

        {activeTab === 'offset' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Carbon Offset Calculator
              </h2>
              <p className="text-gray-600">
                Calculate the cost to offset your emissions with verified carbon credit
                projects. Choose from nature-based solutions, renewable energy, or
                carbon removal technologies.
              </p>
            </div>
            <OffsetCalculator />
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Scenario Comparison
              </h2>
              <p className="text-gray-600">
                Compare different emission reduction strategies to find the most effective
                approach for your organization. Select scenarios to see potential impact.
              </p>
            </div>
            <ScenarioComparison />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Carbon Utilization Calculator | Based on GHG Protocol Standards
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Emission factors: EPA & GHG Protocol</span>
              <span>|</span>
              <button
                onClick={() => setShowGuide(true)}
                className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
              >
                User Guide
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* User Guide Modal */}
      <UserGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}
