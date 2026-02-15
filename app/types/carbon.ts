export interface Scope1Emissions {
  naturalGas: number; // cubic meters
  diesel: number; // liters
  petrol: number; // liters
  refrigerants: number; // kg
  lpg: number; // kg
}

export interface Scope2Emissions {
  electricity: number; // kWh
  heating: number; // kWh
  cooling: number; // kWh
  steam: number; // kWh
}

export interface Scope3Emissions {
  businessTravel: number; // km
  employeeCommuting: number; // km
  wasteGenerated: number; // tonnes
  purchasedGoods: number; // currency value
  upstreamTransport: number; // tonne-km
  downstreamTransport: number; // tonne-km
}

export interface EmissionFactors {
  naturalGas: number;
  diesel: number;
  petrol: number;
  refrigerants: number;
  lpg: number;
  electricity: number;
  heating: number;
  cooling: number;
  steam: number;
  businessTravel: number;
  employeeCommuting: number;
  wasteGenerated: number;
  purchasedGoods: number;
  upstreamTransport: number;
  downstreamTransport: number;
}

export interface CalculationResult {
  scope1Total: number;
  scope2Total: number;
  scope3Total: number;
  totalEmissions: number;
  breakdown: {
    scope1: Record<string, number>;
    scope2: Record<string, number>;
    scope3: Record<string, number>;
  };
}

export interface OffsetProject {
  name: string;
  type: string;
  pricePerTonne: number;
  location: string;
  certification: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  scope1: Scope1Emissions;
  scope2: Scope2Emissions;
  scope3: Scope3Emissions;
  result?: CalculationResult;
}

export type TabType = 'calculator' | 'offset' | 'comparison' | 'guide';
