import { ColorType } from "./travelBar";

interface DriverData {
  name?: string;
  distance: number;
  paths: (Path | Break)[];
  color: ColorType;
}

export interface Path {
  pathId: number;
  stations: Station[];
}

export interface Break {
  startTime: string;
  endTime: string;
  title: string;
}

export interface Station {
  stationName: string;
  arrivalTime: string;
  participants?: string[];
}

export default DriverData;
