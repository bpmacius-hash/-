export type Dimension = 'Self-Efficacy' | 'Resilience' | 'Hope' | 'Optimism';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  isReverse: boolean;
}

export interface Option {
  label: string;
  value: number; // 1 to 7
}

export interface ScoreData {
  total: number;
  level: 'Low' | 'Medium' | 'High';
  dimensions: {
    [key in Dimension]: number;
  };
}