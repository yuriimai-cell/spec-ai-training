export type Rating = "良い" | "普通" | "要改善";

export type ComparisonInput = {
  ourProductName: string;
  competitorNames: string[]; // 1..3
  industry?: string;
  targetCustomer?: string;
  ourStrengths?: string;
  additionalAxes?: string[];
};

export type Axis = {
  axis: string;
  description?: string;
};

export type ComparisonCell = {
  rating: Rating;
  reason: string;
};

export type ComparisonResult = {
  axes: Axis[];
  products: string[]; // [ourProductName, ...competitors]
  cells: Record<string, Record<string, ComparisonCell>>; // axis -> product -> cell
  notes?: string[];
};

export type TalkResult = {
  summary: string;
  bullets?: string[];
};

