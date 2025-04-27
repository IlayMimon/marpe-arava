
export type ColorType = 'purple' | 'teal' | 'yellow';

export interface StationInfo {
  name: string;
  arrivalTime: string;
  passengers?: number;
  isOrigin?: boolean;
  isDestination?: boolean;
}

export interface TravelItem {
  id: number;
  tripId: string;
  location: string;
  type: string;
  startTime: string;
  endTime: string;
  code: string;
  colorType: ColorType;
  stations: StationInfo[];
  driverId?: number;
}

export interface TravelBarProps {
  title?: string;
  initialItems?: TravelItem[];
}

export interface Driver {
  id: number;
  name: string;
}