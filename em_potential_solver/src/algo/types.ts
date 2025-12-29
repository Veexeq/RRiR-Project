export type Matrix = number[][];
export type Vector = number[];

export interface GaussPoint {
  xi: number,
  weight: number
};

export interface ChartDatum {
  x: number,
  val: number
};

export type ChartData = ChartDatum[];
