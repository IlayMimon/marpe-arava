import { drivers } from "../components/travel-bar/dummyData";
import DriverData from "../types/DriverOrganizationTypes";
import { ColorType, TravelItem } from "../types/travelBar";

const driverOrganizationDataMapping = (
  items: TravelItem[],
  driverAssignments: Record<ColorType, number | null>,
  kilometersPerColor: Record<ColorType, string>
): DriverData[] => {
  return Object.keys(driverAssignments).map((driverColor) => {
    const driverItems = items.filter((item) => item.colorType === driverColor);

    return {
      name: drivers.find(
        (driver) => driver.id === driverAssignments[driverColor as ColorType]
      )?.name,
      paths: driverItems.map((path) => {
        return {
          ...path,
          pathId: parseInt(path.tripId),
          stations: path.stations.map((station) => {
            return { ...station, stationName: station.name };
          }),
        };
      }),
      distance: parseInt(
        kilometersPerColor[driverItems[0].colorType].match(/\d+/)![0]
      ),
      color: driverItems[0].colorType,
    };
  });
};

export default driverOrganizationDataMapping;
