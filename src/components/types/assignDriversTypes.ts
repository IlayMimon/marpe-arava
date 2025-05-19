export type Shuttle = {
    id: number;
    startTime: Date;
    arrivalTime: Date;
    distanceKm: number;
  };
  
  export type Driver = {
    id: number;
    name: string;
    schedule: DriverAssignment[];
  };
  
  export type DriverAssignment = {
    shuttleId: number;
    startTime: Date;
    arrivalTime: Date;
    distanceKm: number;
  };
  
  export type ShuttleAssignment = {
    shuttleId: number;
    driverId: number;
    driverName: string;
  };
  