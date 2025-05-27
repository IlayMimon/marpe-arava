import { Driver } from "../types/assignDriversTypes";

export const initDrivers = (numberOfDrivers: number) => {
    const drivers: Driver[] = [];
    const driver: Driver = {
      id: 0,
      name: "",
      schedule: [],
    }
    for (let i = 0; i < numberOfDrivers; i++) {
      drivers.push({
        ...driver,
        id: i,
        name: `Driver ${i + 1}`,
      });
    }

    return drivers;
  };