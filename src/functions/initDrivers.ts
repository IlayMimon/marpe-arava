import { Driver } from "../types/assignDriversTypes";

export const initDrivers = (numberOfDrivers: number) => {
    const drivers: Driver[] = [];
    
    for (let i = 0; i < numberOfDrivers; i++) {
      drivers.push({
        id: i,
        name: `Driver ${i + 1}`,
        schedule: [],
      });
    }
    
    return drivers;
  };