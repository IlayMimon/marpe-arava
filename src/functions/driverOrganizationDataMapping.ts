import { ColorType, Driver, TravelItem } from "../components/types/travelBar";
import DriverData from "../types/DriverOrganizationTypes";

const driverOrganizationDataMapping = (
  items: TravelItem[],
  drivers: Driver[],
  kilometersPerColor: Record<ColorType, string>
): DriverData[] => {
  return drivers.map((driver) => {
    const driverItems = items.filter((item) => item.driverId === driver.id);

    return {
      paths: driverItems.map((path) => {
        return {
          ...path,
          pathId: parseInt(path.tripId),
          stations: path.stations.map((station) => {
            return { ...station, stationName: station.name };
          }),
        };
      }),
      distance: parseInt(kilometersPerColor[driverItems[0].colorType].match(/\d+/)![0]),
      color: driverItems[0].colorType,
    };
  });
};

export default driverOrganizationDataMapping;
