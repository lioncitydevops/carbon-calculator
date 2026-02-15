'use client';

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserGuide({ isOpen, onClose }: UserGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Carbon Calculator User Guide</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Navigation Guide */}
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Navigation</h3>
            <p className="text-gray-700 mb-2">
              Use the tabs at the top to switch between different sections:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>
                <strong>Emissions Calculator:</strong> Calculate your Scope 1, 2, and 3 emissions
              </li>
              <li>
                <strong>Carbon Offsets:</strong> Explore offset projects and calculate costs
              </li>
              <li>
                <strong>Scenario Comparison:</strong> Compare different emission reduction strategies
              </li>
            </ul>
          </div>

          {/* Scope Definitions */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Understanding Emission Scopes</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-semibold text-yellow-800">Scope 1 - Direct Emissions</p>
                <p className="text-sm text-gray-600">
                  Emissions from sources you own or control: company vehicles, on-site
                  fuel combustion, refrigerant leaks.
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-800">Scope 2 - Indirect Energy</p>
                <p className="text-sm text-gray-600">
                  Emissions from purchased energy: electricity, heating, cooling, and steam
                  consumed at your facilities.
                </p>
              </div>
              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-semibold text-indigo-800">Scope 3 - Value Chain</p>
                <p className="text-sm text-gray-600">
                  All other indirect emissions: business travel, employee commuting,
                  purchased goods, transportation, and waste.
                </p>
              </div>
            </div>
          </div>

          {/* Emission Factors */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Emission Factors Used</h3>
            <p className="text-sm text-gray-600 mb-3">
              This calculator uses internationally recognized emission factors based on the GHG
              Protocol and EPA guidelines. Key factors include:
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-medium">Electricity:</span> 0.42 kg CO2e/kWh
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-medium">Natural Gas:</span> 2.0 kg CO2e/m3
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-medium">Diesel:</span> 2.68 kg CO2e/liter
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-medium">Petrol:</span> 2.31 kg CO2e/liter
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Note: Actual emission factors vary by region and energy mix. These are global
              averages for estimation purposes.
            </p>
          </div>

          {/* Calculator Tips */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Calculator Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">1.</span>
                <span>
                  Start with Scope 1 and 2 emissions as these are typically easier to measure
                  and verify.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">2.</span>
                <span>
                  For Scope 3, use spend-based estimates for purchased goods if activity data
                  is unavailable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">3.</span>
                <span>
                  Transport distances should include the full journey (origin to destination).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">4.</span>
                <span>
                  Employee commuting should be annualized (daily distance x working days x
                  number of employees).
                </span>
              </li>
            </ul>
          </div>

          {/* Offset Information */}
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Carbon Offset Guidelines</h3>
            <div className="bg-amber-50 p-4 rounded">
              <h4 className="font-semibold text-amber-800 mb-2">Quality Criteria</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <strong>Additionality:</strong> The project wouldn&apos;t have happened
                  without carbon finance
                </li>
                <li>
                  <strong>Permanence:</strong> Carbon removal is long-lasting (especially for
                  nature-based solutions)
                </li>
                <li>
                  <strong>Verification:</strong> Third-party certification (VCS, Gold Standard,
                  Puro.earth)
                </li>
                <li>
                  <strong>No Double Counting:</strong> Credits aren&apos;t claimed by multiple
                  parties
                </li>
              </ul>
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="text-lg font-bold mb-2">Compliance Standards Reference</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <strong>GHG Protocol:</strong> The global standard for greenhouse gas
                accounting (Scope 1, 2, 3)
              </li>
              <li>
                <strong>ISO 14064:</strong> International standard for GHG inventories and
                verification
              </li>
              <li>
                <strong>Science Based Targets (SBTi):</strong> Framework for setting
                reduction targets aligned with Paris Agreement
              </li>
              <li>
                <strong>CDP:</strong> Global disclosure system for environmental reporting
              </li>
            </ul>
          </div>

          {/* Quick Tips */}
          <div className="bg-cyan-50 p-4 rounded-lg">
            <h3 className="font-bold text-cyan-800 mb-2">Quick Tips</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>* All results are in tonnes of CO2 equivalent (tCO2e)</li>
              <li>
                * Prioritize emission reduction before offsetting - aim for at least 50%
                reduction
              </li>
              <li>
                * Use the scenario comparison to evaluate different reduction strategies
              </li>
              <li>* Export your results for reporting and tracking over time</li>
              <li>
                * Scope 3 typically represents 70-90% of total emissions for most organizations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
