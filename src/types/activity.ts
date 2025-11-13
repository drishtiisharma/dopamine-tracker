export interface Activity {
  id: string;
  name: string;
  dopamineImpact: number; // -1 to 1 scale
  icon: string;
  color: string;
  duration: number; // in minutes
  isActive: boolean;
}

export interface DopamineDataPoint {
  time: number;
  level: number;
}
