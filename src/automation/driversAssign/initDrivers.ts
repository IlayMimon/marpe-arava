import { Driver } from "../types/driversAssignTypes";

export const initDrivers = (numberOfDrivers: number) => {
    const drivers: Driver[] = [];
    
    for (let i = 1; i <= numberOfDrivers; i++) {
      drivers.push({
        id: i,
        name: `Driver ${i}`,
        schedule: [],
      });
    }
    
    return drivers;
  };