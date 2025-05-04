import { ReactNode } from 'react';
import getTimeDifference from '../../functions/getTimeDifference';
import { IconUserCircle, IconRoute, IconRoute2, IconClock } from '@tabler/icons-react';
import DriverData from '../../types/DriverOrganizationTypes';

interface IDetail {
  icon: ReactNode;
  text: string;
}

// separated from DriverOrganizationCard.tsx because it's long and repetitive

const driverOrganizationCardDetails = (driverData: DriverData, index: number): IDetail[] => {
  return [
    {
      icon: <IconUserCircle className="driver-organization-card__details__icon" />,
      text: driverData.name || 'נהג ' + (index + 1).toString(),
    },
    {
      icon: <IconRoute className="driver-organization-card__details__icon" />,
      text: driverData.paths.filter((path) => 'pathId' in path).length.toString(),
    },
    {
      icon: <IconRoute2 className="driver-organization-card__details__icon" />,
      text: `${driverData.distance.toString()} ק"מ`,
    },
    {
      icon: <IconClock className="driver-organization-card__details__icon" />,
      text: getTimeDifference(
        driverData.paths
          .filter((path) => 'pathId' in path)
          .map((path) => path.stations.map((station) => station.arrivalTime))
          .flat()
      ),
    },
  ];
};

export default driverOrganizationCardDetails;
