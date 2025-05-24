export type ColorType = "purple" | "cyan" | "orange";

export interface StationInfo {
  name: string;
  arrivalTime: string;
  passengers?: string[];
  isOrigin?: boolean;
  isDestination?: boolean;
}

export interface TravelItem {
  id: number;
  tripId: string;
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

export interface IDriverDropdownProps {
  color: ColorType;
  isOpen: boolean;
  availableDrivers: Driver[];
  assignDriver: (color: ColorType, driverId: number) => void;
  isDriverAssigned: (driverId: number, currentColor: ColorType) => boolean;
}

export interface DriverFilterButtonProps {
  drivers: Driver[];
  selectedDriver?: Driver;
  placeholder: string;
  kilometers: string;
  color: ColorType;
  isActive: boolean;
  isDriverAssigned: boolean;
  toggleFilter: (color: ColorType) => void;
  assignDriver: (color: ColorType, driverId: number) => void;
  isDriverAssignedFunc: (driverId: number, currentColor: ColorType) => boolean;
}
