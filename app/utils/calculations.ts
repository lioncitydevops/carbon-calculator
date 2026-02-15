import {
  Scope1Emissions,
  Scope2Emissions,
  Scope3Emissions,
  EmissionFactors,
  CalculationResult,
} from '../types/carbon';

// Default emission factors (kg CO2e per unit)
// Based on GHG Protocol and EPA emission factors
export const defaultEmissionFactors: EmissionFactors = {
  // Scope 1 factors
  naturalGas: 2.0, // kg CO2e per m3
  diesel: 2.68, // kg CO2e per liter
  petrol: 2.31, // kg CO2e per liter
  refrigerants: 1430, // kg CO2e per kg (R-410A average)
  lpg: 2.98, // kg CO2e per kg

  // Scope 2 factors (varies by region, using global average)
  electricity: 0.42, // kg CO2e per kWh (global average)
  heating: 0.23, // kg CO2e per kWh (natural gas heating)
  cooling: 0.45, // kg CO2e per kWh
  steam: 0.19, // kg CO2e per kWh

  // Scope 3 factors
  businessTravel: 0.171, // kg CO2e per km (average car)
  employeeCommuting: 0.14, // kg CO2e per km (mixed transport)
  wasteGenerated: 430, // kg CO2e per tonne (landfill)
  purchasedGoods: 0.0005, // kg CO2e per currency unit (rough estimate)
  upstreamTransport: 0.062, // kg CO2e per tonne-km (road freight)
  downstreamTransport: 0.062, // kg CO2e per tonne-km (road freight)
};

export function calculateScope1(
  emissions: Scope1Emissions,
  factors: EmissionFactors = defaultEmissionFactors
): { total: number; breakdown: Record<string, number> } {
  const breakdown = {
    naturalGas: emissions.naturalGas * factors.naturalGas,
    diesel: emissions.diesel * factors.diesel,
    petrol: emissions.petrol * factors.petrol,
    refrigerants: emissions.refrigerants * factors.refrigerants,
    lpg: emissions.lpg * factors.lpg,
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { total, breakdown };
}

export function calculateScope2(
  emissions: Scope2Emissions,
  factors: EmissionFactors = defaultEmissionFactors
): { total: number; breakdown: Record<string, number> } {
  const breakdown = {
    electricity: emissions.electricity * factors.electricity,
    heating: emissions.heating * factors.heating,
    cooling: emissions.cooling * factors.cooling,
    steam: emissions.steam * factors.steam,
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { total, breakdown };
}

export function calculateScope3(
  emissions: Scope3Emissions,
  factors: EmissionFactors = defaultEmissionFactors
): { total: number; breakdown: Record<string, number> } {
  const breakdown = {
    businessTravel: emissions.businessTravel * factors.businessTravel,
    employeeCommuting: emissions.employeeCommuting * factors.employeeCommuting,
    wasteGenerated: emissions.wasteGenerated * factors.wasteGenerated,
    purchasedGoods: emissions.purchasedGoods * factors.purchasedGoods,
    upstreamTransport: emissions.upstreamTransport * factors.upstreamTransport,
    downstreamTransport: emissions.downstreamTransport * factors.downstreamTransport,
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { total, breakdown };
}

export function calculateTotalEmissions(
  scope1: Scope1Emissions,
  scope2: Scope2Emissions,
  scope3: Scope3Emissions,
  factors: EmissionFactors = defaultEmissionFactors
): CalculationResult {
  const scope1Result = calculateScope1(scope1, factors);
  const scope2Result = calculateScope2(scope2, factors);
  const scope3Result = calculateScope3(scope3, factors);

  return {
    scope1Total: scope1Result.total / 1000, // Convert to tCO2e
    scope2Total: scope2Result.total / 1000,
    scope3Total: scope3Result.total / 1000,
    totalEmissions:
      (scope1Result.total + scope2Result.total + scope3Result.total) / 1000,
    breakdown: {
      scope1: Object.fromEntries(
        Object.entries(scope1Result.breakdown).map(([k, v]) => [k, v / 1000])
      ),
      scope2: Object.fromEntries(
        Object.entries(scope2Result.breakdown).map(([k, v]) => [k, v / 1000])
      ),
      scope3: Object.fromEntries(
        Object.entries(scope3Result.breakdown).map(([k, v]) => [k, v / 1000])
      ),
    },
  };
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function calculateOffsetCost(
  emissions: number,
  pricePerTonne: number
): number {
  return emissions * pricePerTonne;
}

export function calculateReductionPercentage(
  baseline: number,
  current: number
): number {
  if (baseline === 0) return 0;
  return ((baseline - current) / baseline) * 100;
}
